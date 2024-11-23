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
        <>
            <div className="flex flex-row h-screen">
                {/* Sidebar */}
                {side && (
                    <div
                        className="  w-[80%] bg-gray-100 md:w-[20%] overflow-y-auto h-screen"
                        // onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside it
                    >
                        <Sidebar />
                    </div>
                )}
                {/* Main Area */}
                <div
                    className={`w-full ${side ? 'md:w-[80%]' : 'md:w-full'} h-screen overflow-y-auto no-scrollbar `}
                    onClick={closeSidebar} // Close sidebar when clicking outside
                >
                    <div className='border border-gray-900 shadow-md'>
                        <Router />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LayOutWrapper;
