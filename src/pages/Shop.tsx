import { useEffect, useState } from "react";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";


import { GetImage } from "../utils/storage";
import { fetchItems, type BaseItem } from "../utils/db";
import { Loading } from "../components/Loading";

type ShopItem = BaseItem &{
  numLikes: number;
  numBookmarks: number;
};

export default function Shop() {
  const [showFilters, setShowFilters] = useState<boolean>(true);
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

  if (!shopItems || shopItems.length === 0) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )
    }
    
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full h-1/3 flex items-center justify-center">
        <ShopBanner />
      </div>

      <div className="relative w-full h-2/3 flex flex-row">
        <div className="w-1/5 flex flex-col p-5">
          <FilterBar showFilters={showFilters}/>
        </div>

        <div className="w-4/5 h-full flex flex-col">

          <div className="sticky top-0 w-full p-1 flex bg-white">
            <button 
              className="flex items-center justify-center hover:text-[#e4d7cd] transition-colors duration-300"
              onClick={() => setShowFilters(!showFilters)} 
            >
              {showFilters ? <FaToggleOn /> : <FaToggleOff />}
              <p>Show filters</p>
            </button>
          </div>

          <div className="grid grid-cols-3 auto-rows-[50%] gap-5 p-5">
            {shopItems.map((item, idx) => (
              <div
                key={idx}
                className="h-full flex flex-col items-center bg-[#dfdede]/20"
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
        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-100 transition-opacity duration-700"
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


export function FilterBar({showFilters}: {showFilters: boolean}) {


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

  const fullfillmentOptions = [
    { name: "Pickup" },
    { name: "Delivery" },
  ]


  return (
    <div className="sticky top-0 w-full flex flex-col">
      

      <ul className="border-b-2 border-b-[#685748] w-full text-lg flex flex-col items-center justify-center">
        {fullfillmentOptions.map((item, index) => (
            <li key={index} className="flex w-full items-center justify-between p-2 cursor-pointer">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="appearance-none w-5 h-5 border border-[#685748] rounded-sm checked:bg-[#685748] checked:border-transparent transition-colors duration-200 flex items-center justify-center"
                />
                <span className="text-[#685748] hover:text-[#e4d7cd]">{item.name}</span>
              </label>
            </li>
          ))}
        </ul>

      {showFilters && 
        <ul className="w-full text-lg p-4 overflow-y-scroll">
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
      <span className="inline-flex items-center justify-between w-full cursor-pointer p-2 hover:text-[#e4d7cd] transition-colors duration-300">
        <b>{label}</b>
        <RiArrowDropDownLine className={`text-2xl ml-2 cursor-pointer ${showDropdown ? 'rotate-180' : 'rotate-0'}`} onClick={() => setShowDropdown(!showDropdown)} />
      </span>
      {showDropdown && (
        <ul className="w-full">
          {items.map((item, index) => (
            <li key={index} className="flex w-full items-center justify-between p-2 cursor-pointer">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="appearance-none w-5 h-5 border border-[#685748] rounded-sm checked:bg-[#685748] checked:border-transparent transition-colors duration-200 flex items-center justify-center"
                />
                <span className="text-[#685748] hover:text-[#e4d7cd]">{item.name}</span>
              </label>
            </li>
          ))}
        </ul>



      )}
    
      


    </>
    
  )
}