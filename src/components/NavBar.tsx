import { MdLogin } from "react-icons/md"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";


export function NavBar() {
  const isAuthenticated = true;
  return (
    <div className="flex flex-row w-full h-full justify-between text-xl gap-10 bg-[#ffffff]">
        <div className="flex justify-center items-center p-5 gap-10">
          <img src="/logo_cursive.png" alt="Logo" className="w-[132px] h-[80px] p-2" />
          <a href="/">Home</a>
          <a href="/gallery">Gallery</a>
          <a href="/about">Orchid Handbook</a>
          <a href="/contact">Contact</a>
        
        
        </div>
  
          
        {isAuthenticated ? (
          <>
            <CgProfile className="text-2xl cursor-pointer hover:text-[#ccab8f] transition duration-300 ease-in-out" />
          
          
          </>

        ) : (
          <div className="flex flex-row justify-center items-center gap-5">
            <a className="py-1 px-2 flex flex-row justify-center items-center bg-[#eaddd2] hover:bg-[#f2ebe5] border-2 rounded-md 
              transition duration-300 ease-in-out"
              href="/login"
            >
                Log In
                <MdLogin className="ml-1 text-xl"/>
            </a>
            <a className="py-1 px-2 flex flex-row justify-center items-center bg-[#dbbfa7] hover:bg-[#f2ebe5] border-2 rounded-md
                transition duration-300 ease-in-out"
                href="/signup"
            >
                Sign Up
                <HiOutlinePencilAlt className="ml-1 text-xl"/>

            </a>
      
          </div>



        )}
        
       
       
    </div>
  )
}
