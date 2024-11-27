import React, { useState } from 'react';
import { IoHome } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { CgPlayList } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { handleSidebar } from './features/SidebarSlice';



function Sidebar() {
    const [activeItem, setActiveItem] = useState("Home");
    const dispatch = useDispatch()
    const menuItems = [
        { name: "Home", path: "/", icon: <IoHome /> },
        { name: "My Videos", path: "/my-videos", icon: <FaVideo /> },
        { name: "Upload Videos", path: "/upload", icon: <IoMdCloudUpload /> },
    ];

    // Function to handle menu click
    const handleMenuClick = (name) => {
        setActiveItem(name);
    };
   

    return (
        <div className='bg-black text-white h-screen overflow-y-auto no-scrollbar z-50 '>
           
            <div className=''>
                {/* Menu Items */}
                <div className="mx-4 py-2 flex flex-col items-start gap-2 justify-star border-b-[1px] border-gray-900">
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
                {/* History */}
                <div className="mx-4 mt-4 flex flex-col items-start gap-2 justify-start">
                    <Link
                        to="/history"
                        onClick={() => handleMenuClick("History")}
                        className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === "History" ? "bg-[#646060]" : "hover:bg-[#666464]"
                            }`}
                    >
                        <LuHistory /> History
                    </Link>
                    <Link
                        to="/palylist"
                        onClick={() => handleMenuClick("Playlist")}
                        className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === "Playlist" ? "bg-[#646060]" : "hover:bg-[#666464]"
                            }`}
                    >
                        <CgPlayList />Save Playlist
                    </Link>
                    <Link
                        to="/history"
                        onClick={() => handleMenuClick("History")}
                        className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === "Watch Later" ? "bg-[#646060]" : "hover:bg-[#666464]"
                            }`}
                    >
                        <LuHistory fill='white' /> Watch Later
                    </Link>
                    <Link
                        to="/history"
                        onClick={() => handleMenuClick("History")}
                        className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === "Watch Later" ? "bg-[#646060]" : "hover:bg-[#666464]"
                            }`}
                    >
                        <BiLike /> Watch Later
                    </Link>
                    <div className='border-b border-gray-900 w-full '></div>
                    <Link
                        to="/subcription"
                        onClick={() => handleMenuClick("History")}
                        className={`flex items-center justify-start gap-3 py-2 px-4 rounded cursor-pointer ${activeItem === "Watch Later" ? "bg-[#646060]" : "hover:bg-[#666464]"
                            }`}
                    >
                        Subscription
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
