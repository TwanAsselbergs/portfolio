import React, { useState } from "react";
import logo from "./img/logo.jpeg";
import "./style.css";
import { FaBars, FaLinkedin, FaGithub, FaFilePdf } from "react-icons/fa";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="lg:w-[95%] z-[99] px-4 lg:px-0 relative flex justify-between items-center mx-auto py-4 lg:py-6 ">
      <div className="relative group">
        <img
          src={logo}
          className="h-[55px] w-[55px] lg:h-[70px] lg:w-[70px] cursor-pointer rounded-full object-cover ml-4 lg:ml-0"
          alt="Twan"
        />
        <div className="absolute left-2.5 mt-2 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1.5 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
            <ul className="py-1">
              <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                <a
                  href="https://www.linkedin.com/in/twanasselbergs/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </li>
              <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                <a
                  href="https://github.com/TwanAsselbergs"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaGithub className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul
        className={`hidden lg:flex text-[#c4cfde] justify-start text-[19px] gap-2 items-center font-bold`}>
        <li className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#home">Home</a>
        </li>
        <li className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#features">Features</a>
        </li>
        <li className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#portfolio">Portfolio</a>
        </li>
        <li className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#resume">Resume</a>
        </li>
        <li className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#contact">Contact</a>
        </li>
        <div
          className="relative group"
          onMouseEnter={handleDropdownToggle}
          onMouseLeave={handleDropdownToggle}>
          <li className="text-[#c4cfde] rounded-md px-4 cursor-pointer duration-700">
            <p
              className={`transition-colors duration-700 ease-in-out ${
                dropdownOpen ? "text-[#2e3136]" : ""
              }`}>
              CV
            </p>
          </li>
          <div
            className="absolute mt-1.5 bg-white rounded-md opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            style={{ left: "0.3rem" }}>
            <div className="relative group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-1.5 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white group-hover:pointer-events-auto group-hover:opacity-100"></div>
              <ul className="py-1">
                <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <a
                    href="cv/Twan Asselbergs CV.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaFilePdf className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ul>
      {/* Mobile Device */}
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-500 ${
          toggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleToggle}></div>
      <ul
        className={`fixed top-0 right-0 w-64 h-full text-[#c4cfde] text-[19px] font-bold bg-[#212428] z-50 transition-all duration-500 ease-in-out ${
          toggle ? "right-0" : "right-[-100%]"
        } flex flex-col text-[13px] gap-6 items-center pt-10 border-l border-[#2e3136]`}>
        <li
          onClick={handleToggle}
          className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md mt-8">
          <a href="#home">Home</a>
        </li>
        <li
          onClick={handleToggle}
          className="cursor-pointer duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#features">Features</a>
        </li>
        <li
          onClick={handleToggle}
          className="cursor-pointer  duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#portfolio">Portfolio</a>
        </li>
        <li
          onClick={handleToggle}
          className="cursor-pointer  duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#resume">Resume</a>
        </li>
        <li
          onClick={handleToggle}
          className="cursor-pointer  duration-200 hover:bg-[#2e3136] p-2 pr-4 pl-4 rounded-md">
          <a href="#contact">Contact</a>
        </li>
        <li
          onClick={handleToggle}
          className="text-[#c4cfde] rounded-md px-4 cursor-pointer duration-700">
          <a
            href="cv/Twan Asselbergs CV.pdf"
            download
            rel="noopener noreferrer">
            CV
          </a>
        </li>
      </ul>
      <FaBars
        onClick={handleToggle}
        className="lg:hidden text-[#c4cfde] text-[25px] cursor-pointer block mr-4 lg:mr-0"
      />
    </div>
  );
};

export default Navbar;