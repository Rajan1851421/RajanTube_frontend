import React, { useState } from "react";
import { FaYoutube, FaMicrophone } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import History from "./History";
import { LuHistory } from "react-icons/lu";



function Dashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar hidden by default
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleMenuClick = (item) => {
    setActiveItem(item);
    setSidebarVisible(false); // Close the sidebar after clicking a menu item
  };

  const handleSignOut = () => {
    localStorage.removeItem("L_token");
    window.location.href = "/dashboard/login";
  };

  const menuItems = [
    { name: "Home", path: "/dashboard/home", icon: <IoHome /> },
    { name: "My Videos", path: "/dashboard/my-videos", icon: <FaVideo /> },
    { name: "Upload Videos", path: "/dashboard/upload", icon: <IoMdCloudUpload /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a]">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center py-2 px-4 bg-[#070707] sticky top-0 z-50">
        <div className="flex items-center w-[25%]">
          <button
            className="bg-[#443d37] text-white p-1 h-6 w-8 flex justify-center items-center md:h-10 md:w-10 border rounded-full"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <FaYoutube className="hidden md:block text-4xl mx-4 text-red-500" />
          <h2 className="text-md md:text-xl text-white flex font-semibold px-2 md:px-4">
            {localStorage.getItem("L_token")
              ? localStorage.getItem("channelName")
              : "RajanTube"}{" "}
            <sup className="text-xs">IN</sup>
          </h2>
        </div>
        <div className="w-[20%] md:w-[40%] relative">
          <input
            placeholder="Search"
            className="rounded-3xl px-10 bg-[#2D2A28] border-[1px] py-[6px] w-full text-white placeholder-gray-400"
            type="search"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
        <button className="bg-[#443d37] text-white flex justify-center items-center gap-2 p-1 h-10 w-10 border rounded-full">
          <FaMicrophone className="mx-2" />
        </button>
        <div className="flex gap-2 justify-end items-center w-[25%]">
          {localStorage.getItem("L_token") ? (
            <Link
              onClick={handleSignOut}
              className="border text-white rounded-3xl md:px-3 px-1 text-xs py-1"
            >
              Sign Out
            </Link>
          ) : (
            <Link
              to="/dashboard/login"
              className="border text-white rounded-3xl text-xs px-3 py-1"
            >
              Sign In
            </Link>
          )}
          {localStorage.getItem("L_token") && (
            <img
              className="md:h-10 md:w-10 h-7 w-10 rounded-full"
              src={localStorage.getItem("logoUrl")}
              alt=""
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        {isSidebarVisible &&
          <>
            <div
              className={`fixed z-40 h-full bg-[#070707] text-white w-[80%] md:w-1/5 transform ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300`}
            >
              <div className="flex flex-col justify-center w-full space-y-4 py-2 items-center mt-4 border-b-[1px] border-gray-600 ">
                {menuItems.map(({ name, path, icon }) => (
                  <Link
                    key={name}
                    to={path}
                    onClick={() => handleMenuClick(name)}
                    className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === name ? "bg-[#646060]" : "hover:bg-[#666464]"
                      }`}
                  >
                    <span className="text-xl">{icon}</span>
                    <span>{name}</span>
                  </Link>
                ))}
              </div>
              <div className="mx-4 mt-4 flex justify-center">
                <Link
                  to='/dashboard/history'
                  onClick={() => handleMenuClick(name)}
                  className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === name ? "bg-[#646060]" : "hover:bg-[#666464]"
                    }`}> <LuHistory /> History</Link>
              </div>
            </div>

          </>
        }

        {/* Main Content */}
        <div
          className="flex-1 overflow-y-auto bg-[#F3F4F6]"
          onClick={() => isSidebarVisible && setSidebarVisible(false)}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
