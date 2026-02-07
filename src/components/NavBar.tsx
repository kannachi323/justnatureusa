import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { MdLogin, MdLogout } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";
import { LogOut } from "../utils/auth";

export function NavBar() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogOut() {
    await LogOut();
    setIsAuthenticated(false);
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  }

  return (
    <div className="flex flex-row w-full h-full justify-between items-center text-lg gap-10 bg-[#ffffff]">
        <div className="flex justify-center items-center p-5 gap-10">
          <img src="/logo_cursive.png" alt="Logo" className="w-[132px] h-[80px] p-2" />
          <a href="/">Home</a>
          <a href="/gallery">Gallery</a>
          <a href="/shop">Shop</a>
          <a href="/orchid-handbook">The Orchid Handbook</a>
          <a href="/info">Info</a>
        </div>

        {isAuthenticated && user ? (
          <div className="relative p-5" ref={dropdownRef}>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer hover:text-[#cdcac7] transition duration-200 ease-in-out"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <div className="rounded-full bg-[#eaddd2] w-[38px] h-[38px] flex justify-center items-center transition duration-200 ease-in-out">
                <img src="/favicon.ico" alt="profile" className="w-[30px] h-[30px] object-cover" />
              </div>
              <p>{user.username.split('@')[0]}</p>
            </div>

            {dropdownOpen && (
              <div className="absolute right-5 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#e8ddd4] py-1 z-50">
                <a
                  href="/collections"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#4a3f35] hover:bg-[#f8f4f1] transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <IoBookmarkOutline className="text-lg text-[#ccab8f]" />
                  Saved
                </a>
                <a
                  href="/account"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#4a3f35] hover:bg-[#f8f4f1] transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiUser className="text-lg text-[#ccab8f]" />
                  Account
                </a>
                <div className="border-t border-[#e8ddd4] my-1" />
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#c47a6a] hover:bg-[#fdf2f0] transition-colors w-full cursor-pointer"
                >
                  <MdLogout className="text-lg" />
                  Log Out
                </button>
              </div>
            )}
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
