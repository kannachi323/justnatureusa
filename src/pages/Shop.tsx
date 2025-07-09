import { useEffect, useState } from "react";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";



import { GetImage } from "../utils/storage";
import { fetchItems, type BaseItem } from "../utils/db";
import { Loading } from "../components/Loading";
import { SortByDropdown } from "../components/Shop/SortByDropdown";

type ShopItem = BaseItem &{
  numLikes: number;
  numBookmarks: number;
};

export default function Shop() {
  const [shopItems, setShopItems] = useState<ShopItem[]>()

  useEffect(() => {
    async function fetchShopItems() {
      try {
        await fetchItems<ShopItem>("gallery", setShopItems);
   
      } catch (error) {
        console.error("Error fetching shop items:", error);
      }
    }
    fetchShopItems();
  }, [])

  if (!shopItems || shopItems.length <= 0) {
      return (
        <Loading />
      )
    }
    
  return (
    <div className="w-full flex flex-col">

      <div className="relative w-full h-[50vh] flex items-center justify-center">
        <ShopBanner />
      </div>

      

      <div className="w-full flex flex-row mb-5">
       
        <div className="w-1/5 h-screen sticky top-0 overflow-y-auto p-5 pr-0">
          <FilterBar />
        </div>



        <div className="w-4/5 flex flex-col">

          <div className="sticky top-0 w-full p-4 flex justify-end bg-white">
            <SortByDropdown />
          </div>

          <div className="grid grid-cols-3 auto-rows-[480px] gap-5 px-10">
            {shopItems.map((item, idx) => (
              <div
                key={idx}
                className="h-full flex-col items-center bg-[#dfdede]/20"
              >
                <img
                    src={item.src}
                    alt="item"
                    className="w-full h-2/3 object-cover"
                  />
                <h3 className="text-lg font-semibold">{item.id}</h3>
                <p className="text-gray-600">${item.id}</p>
              </div>
            ))}
           
          </div>
  

      </div>

      </div>
      




    </div>
  )
}

export function ShopBanner() {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchBannerImage() {
      try {
        const res = await GetImage("handbook/flower_farm.jpeg");
        if (res) {
          setBannerImage(res);
        }
      } catch (error) {
        console.error("Error fetching banner image:", error);
      }
    }
    fetchBannerImage();
  }, []);

  return (
    <>
      {/* Blurred placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-100 transition-opacity duration-300"
        style={{ backgroundImage: `url(${bannerImage})`, opacity: isLoaded ? 0 : 1 }}
      />

      {/* Real image with fade-in */}
      {bannerImage && (
        <img
          src={bannerImage}
          alt="shop banner"
          className={`
            w-full h-full object-cover transition-opacity duration-700
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl text-center w-full">
        BLOOM WITH CONFIDENCE
      </h1>
    </>
  );
}


export function FilterBar() {
  const [showFilters, setShowFilters] = useState<boolean>(true);


  const arrangementTypes = [
    { name: "Basic" },
    { name: "Advanced" },
    { name: "Premium" },
    { name: "Custom" }
  ];

  const priceFilterItems = [
    { name: "$0 - $50" },
    { name: "$50 - $100" },
    { name: "$100 - $200" },
    { name: "$200+" }
  ]

  const colorFilterItems = [
    { name: "Red" },
    { name: "Orange" },
    { name: "Yellow" },
    { name: "Pink" },
    { name: "Purple" },
    { name: "White" },
  ];

  const orchidCountFilterItems = [
    { name: "1-2 Orchids" },
    { name: "3-5 Orchids" },
    { name: "6+ Orchids" },
  ];


  return (
    <div className="w-full flex flex-col space-y-2">
      <button 
        className="flex items-center justify-center text-xl gap-5 cursor-pointer"
        onClick={() => setShowFilters(!showFilters)} 
      >
          <p>Show Filters</p>
          {showFilters ? <FaToggleOn className="text-2xl"/> : <FaToggleOff className="text-2xl"/>}
          
      </button>
      {showFilters && 
        <ul className="w-full h-full text-lg overflow-y-scroll">
          <li className="relative w-full flex flex-col items-center justify-center rounded-lg p-2">
            <FilterDropdown label={"Arrangement Types"} items={arrangementTypes} />
          </li>
          <li className="relative w-full flex flex-col items-center justify-center rounded-lg p-2">
            <FilterDropdown label={"Shop by Price"} items={priceFilterItems} />
          </li>
          <li className="relative w-full flex flex-col items-center justify-center rounded-lg p-2">
            <FilterDropdown label={"Color"} items={colorFilterItems} />
          </li>

          <li className="relative w-full flex flex-col items-center justify-center rounded-lg p-2">
            <FilterDropdown label={"Orchid Count"} items={orchidCountFilterItems} />
          </li>

          <li className="relative w-full flex flex-col items-center justify-center rounded-lg p-2">
       
          </li>
           
        </ul>
      }

    </div>
  )
}

type FilterItem = {
  name: string;
}

interface FilterDropdownProps {
  label: string;
  items: FilterItem[];
}


function FilterDropdown({label, items}: FilterDropdownProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <>
      <span className="inline-flex items-center justify-between w-full cursor-pointer hover:text-[#e4d7cd] transition-colors duration-300 select-none"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <b>{label}</b>
        <RiArrowDropDownLine className={`text-2xl ml-2 cursor-pointer ${showDropdown ? 'rotate-180' : 'rotate-0'}`} />
      </span>
      {showDropdown && (
        <ul className="w-full">
          <li className="flex flex-col w-full cursor-pointer">
            {items.map((item, index) => (
              <FilterDropdownItem key={index} item={item} />
            ))}
          </li>
        </ul>
      )}
    </>
    
  )
}

function FilterDropdownItem({item}: {item: FilterItem}) {
  return (
    <>
      <label className="flex items-center space-x-2 cursor-pointer mt-3">
        <input
          type="checkbox"
          className="appearance-none w-5 h-5 border border-[#685748] rounded-sm checked:bg-[#685748] checked:border-transparent transition-colors duration-200 flex items-center justify-center"
        />
        <span className="text-[#685748] hover:text-[#e4d7cd]">{item.name}</span>
      </label>
    </>
  )
}



