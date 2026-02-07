import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { MdLogin, MdLogout } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoBookmarkOutline, IoClose } from "react-icons/io5";
import { FiUser, FiMenu } from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";
import { LogOut } from "../utils/auth";

export function NavBar() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  async function handleLogOut() {
    await LogOut();
    setIsAuthenticated(false);
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/shop", label: "Shop" },
    { href: "/orchid-handbook", label: "The Orchid Handbook" },
    { href: "/info", label: "Info" },
  ];

  return (
    <>
      <div className="flex flex-row w-full h-full justify-between items-center text-lg bg-white">
        {/* Logo and Desktop Nav */}
        <div className="flex justify-center items-center p-3 md:p-5 gap-6 lg:gap-10">
          <a href="/">
            <img src="/logo_cursive.png" alt="Logo" className="w-[100px] h-[60px] md:w-[132px] md:h-[80px] p-2 object-contain" />
          </a>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#ccab8f] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex">
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
              <a
                className="py-1 px-3 flex flex-row justify-center items-center bg-[#eaddd2] hover:bg-[#f2ebe5] border-2 border-[#eaddd2] rounded-md transition duration-300 ease-in-out"
                href="/login"
              >
                Log In
                <MdLogin className="ml-1 text-xl" />
              </a>
              <a
                className="py-1 px-3 flex flex-row justify-center items-center bg-[#dbbfa7] hover:bg-[#f2ebe5] border-2 border-[#dbbfa7] rounded-md transition duration-300 ease-in-out"
                href="/signup"
              >
                Sign Up
                <HiOutlinePencilAlt className="ml-1 text-xl" />
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-4 text-2xl text-[#4a3f35] hover:text-[#ccab8f] transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-[#e8ddd4]">
          <span className="text-lg font-semibold text-[#4a3f35]">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-2xl text-[#4a3f35] hover:text-[#ccab8f] transition-colors"
            aria-label="Close menu"
          >
            <IoClose />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 px-2 text-[#4a3f35] hover:text-[#ccab8f] hover:bg-[#f8f4f1] rounded-md transition-colors text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Auth Section */}
        <div className="border-t border-[#e8ddd4] p-4 mt-auto">
          {isAuthenticated && user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-2 py-2 mb-2">
                <div className="rounded-full bg-[#eaddd2] w-[38px] h-[38px] flex justify-center items-center">
                  <img src="/favicon.ico" alt="profile" className="w-[30px] h-[30px] object-cover" />
                </div>
                <span className="text-[#4a3f35] font-medium">{user.username.split('@')[0]}</span>
              </div>
              <a
                href="/collections"
                className="flex items-center gap-3 px-2 py-3 text-[#4a3f35] hover:bg-[#f8f4f1] rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <IoBookmarkOutline className="text-xl text-[#ccab8f]" />
                Saved Collections
              </a>
              <a
                href="/account"
                className="flex items-center gap-3 px-2 py-3 text-[#4a3f35] hover:bg-[#f8f4f1] rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiUser className="text-xl text-[#ccab8f]" />
                Account
              </a>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 px-2 py-3 text-[#c47a6a] hover:bg-[#fdf2f0] rounded-md transition-colors w-full mt-2"
              >
                <MdLogout className="text-xl" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <a
                className="py-2.5 px-4 flex justify-center items-center bg-[#eaddd2] hover:bg-[#f2ebe5] rounded-md transition duration-300 ease-in-out text-[#4a3f35]"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
                <MdLogin className="ml-2 text-xl" />
              </a>
              <a
                className="py-2.5 px-4 flex justify-center items-center bg-[#dbbfa7] hover:bg-[#f2ebe5] rounded-md transition duration-300 ease-in-out text-[#4a3f35]"
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
                <HiOutlinePencilAlt className="ml-2 text-xl" />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
