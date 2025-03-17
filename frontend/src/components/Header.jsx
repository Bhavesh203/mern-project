import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import Auth_Popover from "./Auth_Popover";
import { CartContext } from "../pages/context/CartContext";
import { GiDolphin } from "react-icons/gi";


const Header = () => {
  const { cart } = useContext(CartContext);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For the popover
  const searchBoxRef = useRef(null);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for popover
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // Close the popover
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSearchBox(false);
      }
    };

    if (showSearchBox) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBox]);

  const open = Boolean(anchorEl); // Determine if the popover is open
  const id = open ? "user-popover" : undefined;

  return (
    <div>
      <header className="pb-6 bg-white lg:pb-0">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to="/" title="" className="flex items-center gap-2">
                <GiDolphin className="text-4xl text-theme-color" />
                <span className="w-auto h-8 lg:h-10 inline-block text-theme-color font-extrabold text-3xl">
                  Dolphin
                </span>
              </Link>
            </div>

            <div className="flex gap-3 items-center">
              <Link to={"/cart"} className="relative">
                <FiShoppingBag className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-[14px] leading-[10px] p-1 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button onClick={handlePopoverClick}>
                <FaRegUser className="text-2xl" />
              </button>
              <button onClick={toggleSearchBox} className="text-2xl">
                <LuSearch />
              </button>
            </div>
          </nav>

          {showSearchBox && (
            <div
              className="search-box"
              ref={searchBoxRef} // Attach ref to the search box
            >
              <input
                type="text"
                placeholder="Search here..."
                className="w-full border rounded-sm my-2 p-2"
              />
            </div>
          )}
        </div>
        <nav className="bg-black p-3">
          <div className="container justify-center bg-black  hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10 m-auto">
            <Link
              to="/"
              className="text-base font-medium text-white transition-all duration-200 hover:text-theme-color focus:text-theme-color"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-base font-medium text-white transition-all duration-200 hover:text-theme-color focus:text-theme-color"
            >
              Features
            </a>
            <Link
              to="/category"
              className="text-base font-medium text-white transition-all duration-200 hover:text-theme-color focus:text-theme-color"
            >
              Shop
            </Link>
            <a
              href="#"
              className="text-base font-medium text-white transition-all duration-200 hover:text-theme-color focus:text-theme-color"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-base font-medium text-white transition-all duration-200 hover:text-theme-color focus:text-theme-color"
            >
              Contact Us
            </a>
          </div>
        </nav>
      </header>

      {/* Auth Popover */}
      <Auth_Popover id={id} open={open} anchorEl={anchorEl} onClose={handlePopoverClose} />
    </div>
  );
};

export default Header;
