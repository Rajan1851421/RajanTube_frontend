import React from 'react';
import Sidebar from '../../Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { handleSidebar } from '../../features/SidebarSlice';
import Router from './Router';

function LayOutWrapper() {
    const dispatch = useDispatch();
    const { side } = useSelector((state) => state.sidebar);

    const closeSidebar = () => {
        if (side) {
            dispatch(handleSidebar()); // Close the sidebar
        }
    };

    return (
        <div className="flex flex-row h-screen">
            {/* Sidebar */}
            <div
                className={`fixed md:static z-50 top-0 left-0 h-screen bg-black transition-transform transform ${
                    side ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-[80%] md:w-[20%] overflow-y-auto`}
            >
                {/* Close Button (visible only on mobile) */}
                <div className="block md:hidden flex justify-end p-2">
                    <button
                        onClick={closeSidebar}
                        className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <Sidebar />
            </div>
            {/* Main Area */}
            <div
                className={`w-full ${
                    side ? 'md:w-[80%]' : 'md:w-full'
                } h-screen overflow-y-auto no-scrollbar`}
            >
                <div className="border border-gray-900 shadow-md">
                    <Router />
                </div>
            </div>
        </div>
    );
}

export default LayOutWrapper;
