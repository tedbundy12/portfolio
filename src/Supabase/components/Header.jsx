import React from "react";
import { useState, useEffect, useRef } from "react";

import logo from "../assets/logo.svg";
import angle from "../assets/angle.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleToggleMenu = () => {
      setMenuOpen((prev) => !prev);
    };

    const burgerMenuElement = burgerMenuRef.current;
    if (burgerMenuElement) {
      burgerMenuElement.addEventListener("click", handleToggleMenu);
    }

    return () => {
      if (burgerMenuElement) {
        burgerMenuElement.removeEventListener("click", handleToggleMenu);
      }
    };
  }, []);

  return (
    <div>
      <nav className="bg-custom-dark text-[#fff] mb-[128px]">
        <div className="mx-auto px-[160px] py-[20px] flex items-center second:px-[20px] third:">
          <div className="flex items-center flex-grow">
            <img src={logo} alt="Supabase" className="mr-[44px]" />
            <div className="flex items-center space-x-6 text-sm text-nav-color font-custom font-normal maxCustom:hidden">
              <a href="#" className="">
                Product
                <img
                  src={angle}
                  alt=""
                  className="ml-2 inline-block mt-[-3px]"
                />
              </a>
              <a href="#" className="">
                Developers
                <img
                  src={angle}
                  alt=""
                  className="ml-2 inline-block mt-[-3px]"
                />
              </a>
              <a href="#" className="">
                Beta
              </a>
              <a href="#" className="">
                Pricing
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-[20px] maxCustom:hidden">
            <button className="bg-button-green text-[#fff] font-custom h-[30px] rounded text-xs py-[7px] px-[11px] font-medium w-[128px]">
              Start your project
            </button>
            <button className="text-[#fff] hover:text-gray-300 text-[13px] font-bold font-custom">
              Sign In
            </button>
          </div>
          <button
            id="burger-menu" ref={burgerMenuRef}
            className="maxCustom:block focus:outline-none hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu" ref={mobileMenuRef}
          className={`absolute right-5 maxCustom:block transition-all duration-100 overflow-hidden ${menuOpen ? '' : 'hidden'}`}

        >
          <a href="#" className="block py-2 hover:bg-gray-800">
            Product
          </a>
          <a href="#" className="block py-2 hover:bg-gray-800">
            Developers
          </a>
          <a href="#" className="block py-2 hover:bg-gray-800">
            Beta
          </a>
          <a href="#" className="block py-2 hover:bg-gray-800">
            Pricing
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Header;
