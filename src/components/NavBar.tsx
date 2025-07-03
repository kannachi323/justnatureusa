import { MdLogin } from "react-icons/md"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";


export function NavBar() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="flex flex-row w-full h-full justify-between items-center text-lg gap-10 bg-[#ffffff]">
        <div className="flex justify-center items-center p-5 gap-10">
          <img src="/logo_cursive.png" alt="Logo" className="w-[132px] h-[80px] p-2" />
          <a href="/">Home</a>
          <a href="/gallery">Gallery</a>
          <a href="/orchid-handbook">Orchid Handbook</a>
          <a href="/contact">Contact</a>
        
        
        </div>
  
          
        {isAuthenticated && user ? (
          <div className="h-1/2 flex flex-row justify-center items-center gap-2 cursor-pointer p-5 hover:text-[#cdcac7] transition duration-200 ease-in-out">
            <div className="rounded-full bg-[#eaddd2] w-[38px] h-[38px] flex justify-center items-center cursor-pointer transition duration-200 ease-in-out">
              <img src="/favicon.ico" alt="profile" className="w-[30px] h-[30px] object-cover" />
            </div>
            <p className="cursor-pointer">{user.username.split('@')[0]}</p>
          </div>

        ) : (
          <div className="flex flex-row justify-center items-center gap-5 p-5">
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
