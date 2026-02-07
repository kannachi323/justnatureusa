import { useState } from "react";
import { FaSort } from "react-icons/fa";



type SortByItem = {
    name: string;
}

export function SortByDropdown() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const sortByItems: SortByItem[] = [
    { name: "Featured" },
    { name: "Newest" },
    { name: "Price: Low-High" },
    { name: "Price: High-Low" },
  ]
  
  return (
    <div className="relative">
      <button 
        className="flex justify-center items-center hover:text-[#e4d7cd] transition-colors duration-300 text-xl cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaSort className="text-xl mr-2" />
        <p>Sort By</p>
      </button>
      {showDropdown && (
        <ul className="absolute top-full right-0 w-[150%] bg-white p-2">
          <li className="flex flex-col w-full cursor-pointer">
            {sortByItems.map((item, index) => (
              <SortByDropdownItem key={index} item={item} />
            ))}
          </li>
        </ul>
      )}
    </div>
    
  )
}

function SortByDropdownItem({item} : {item: SortByItem}) {
    return (
      <>
        <label className="flex justify-end items-center space-x-2 cursor-pointer mt-3">
          <span className="text-[#685748] hover:text-[#e4d7cd]">{item.name}</span>
        </label>
      </>
    )

}