import React from "react";
import { FaYoutube, FaMicrophone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleSidebar } from "./features/SidebarSlice";
import { RiLiveFill } from "react-icons/ri";



function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const toggleSidebar = () => {
        dispatch(handleSidebar())
    };


    const handleSignOut = () => {
        localStorage.removeItem("L_token");
        localStorage.removeItem('channelName')
        localStorage.removeItem('userId')
        localStorage.removeItem('logoUrl')
        navigate('/')
        window.location.reload()
    };
    return (
        <>
            <div className='bg-black sticky top-0 z-50'>
                <div className="w-full flex  justify-between items-center py-2 px-4 bg-[#070707] ">
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
                        <button className="text-3xl text-white flex justify-center items-center gap-2 p-1  ">
                            <RiLiveFill className="mx-2" />
                        </button>
                        {localStorage.getItem("L_token") ? (
                            <Link
                                onClick={handleSignOut}
                                className="border text-white rounded-3xl md:px-3 px-1 text-xs py-1"
                            >
                                Sign Out
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="border text-white rounded-3xl text-xs px-3 py-1"
                            >
                                Sign In
                            </Link>
                        )}
                        {localStorage.getItem("L_token") && (
                            <img
                                className="h-10 w-10 rounded-full"
                                src={localStorage.getItem("logoUrl")}
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar