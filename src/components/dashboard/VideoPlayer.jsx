import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getAllUsers,
    addToHistory,
    viewAPIcall,
    getAllVideos,
    subscribeAPIcall,
    UnsubscribeAPIcall,
    likeVideoApi,
    dislikeVideoApi,
    setStatus
} from '../../features/rajanTubeSlice';
import { addToPlaylist } from '../../features/playListSlice';
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';
import moment from "moment";
import Subscription from './Subscription'
import { FaEllipsisV } from 'react-icons/fa';
import Confetti from "react-confetti";
import AddComment from './AddComment';



function VideoPlayer() {
    const { id } = useParams();
    const { allVideos, allUsers, loading, status } = useSelector((state) => state.rajanTube);
    const [singleVideo, setSingleVide] = useState([])
    const dispatch = useDispatch();
    const [liked, setLiked] = useState('');
    const [subsLogo, setSubsLogo] = useState([]);
    const [subs, setSubs] = useState(false)
    const [isConfettiActive, setIsConfettiActive] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);



    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const addToPlaylists = (id) => {
        const playListVideo = allVideos?.data?.find((video) => video._id === id);
        // console.log(id)
        // console.log(playListVideo)
        if (playListVideo) {
            // console.log("Adding to playlist:", playListVideo);
            dispatch(addToPlaylist(playListVideo))
        } else {
            console.error("Video not found");
        }
    };




    useEffect(() => {
        dispatch(setStatus(''))
        console.log(allVideos)
        const singleVideo = allVideos?.data?.find((video) => video._id === id);
        setSingleVide(singleVideo)
        dispatch(getAllUsers());
        dispatch(getAllVideos())
        const subscribedUsers = allUsers.filter((user) =>
            user.subcribedChannels.includes(localStorage.getItem('userId'))
        );
        const logoUrls = subscribedUsers.map((user) => user);
        setSubsLogo(logoUrls);

    }, [dispatch, liked]);


    const handleLike = (id) => {
        if (!localStorage.getItem('L_token')) {
            alert("please login")        }      
        axios.put(`https://rajantube-1.onrender.com/video/like/${id}`)
        .then(response=>{
            console.log(response)
            // toast.success(response.data.message)
            dispatch(getAllVideos)
        })
        .catch(error=>{
            toast.error("you are Already Liked ")
        })

    };

    const handledisLike = (id) => {
        if (!localStorage.getItem('L_token')) {
            alert("please login")
        }        
        axios.put(`https://rajantube-1.onrender.com/video/dislike/${id}`)
        .then(response=>{
            // console.log(response)
            toast.success(response.data.message)
            dispatch(getAllVideos)
        })
        .catch(error=>{
            toast.error("you are Already dis like ")
        })
        
    };

    const handlePlay = (id) => {
        dispatch(addToHistory(singleVideo._id));
        setTimeout(() => {
            dispatch(viewAPIcall(id))
        }, 5000)
    };
    const handlePlayVideo = (id) => {
        const clickedVideo = allVideos?.data?.find((video) => video._id === id);
        if (clickedVideo) {
            setSingleVide(clickedVideo); 
            setTimeout(() => {
                dispatch(viewAPIcall(id))
            }, 5000)
        } else {
            console.error("Video not found!");
        }
    };
    const handleSubscribe = (id) => {
        if (!localStorage.getItem('L_token')) {
            alert("please login")
        }

        dispatch(subscribeAPIcall(id))
        if (typeof status === "string" && status.trim() !== "") {
            setIsConfettiActive(true);
            dispatch(getAllVideos)
            dispatch(getAllUsers)
            setTimeout(() => {
                setIsConfettiActive(false);
            }, 5000);

        }


        console.log("Subscribe:", id)
    }
    const handleUnSubscribe = (id) => {          
        const matchedUser = allUsers.find((user) => user._id === id);
        if (matchedUser) {           
            setSubs(true)
            window.location.reload()
        } else {
            console.log("User not found!");
        }        
    };


    return (
        <>
            {isConfettiActive && <Confetti />}

            <div className="bg-gray-950 flex md:flex-row flex-col justify-center h-screen overflow-y-auto no-scrollbar">
                {/* Video Player and Details Section */}

                <div className="w-full md:w-[60%] p-4 flex flex-col h-screen overflow-y-auto no-scrollbar">
                    {singleVideo ? (
                        <>
                            {/* Video Player */}
                            <video
                                src={singleVideo.videoUrl}
                                controls
                                autoPlay
                                className="rounded-lg shadow-md border w-full border-gray-900"
                                style={{ height: '420px' }} /* Adjusted for smaller screens */
                                onPlay={() => handlePlay(singleVideo._id)} // Trigger action on play
                            />
                            <h2 className="text-lg md:text-2xl text-gray-100 font-bold mt-3">
                                {singleVideo.title}
                            </h2>
                            {/* Actions Section */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-2">
                                <p className="text-gray-400">{singleVideo.category}</p>

                                <div className="flex flex-wrap gap-2 md:gap-2">
                                    <button className="rounded-2xl bg-gray-900 px-3 py-1 text-white">
                                        Join
                                    </button>

                                    {
                                        subs ? (
                                            <button
                                                onClick={() => handleUnSubscribe(singleVideo.user_id)}
                                                className="rounded-3xl bg-gray-200 px-3 py-1 text-gray-600">
                                                Un Subscribe
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleSubscribe(singleVideo.user_id)}
                                                className="rounded-3xl bg-gray-200 px-3 py-1 text-gray-600">
                                                Subscribe
                                            </button>
                                        )
                                    }

                                    <div className="bg-gray-900 flex px-3 py-2 rounded-2xl">
                                        <p className="text-gray-500 flex gap-2 items-center border-r-2 pr-3">
                                            {singleVideo.likes}
                                            <FaThumbsUp
                                                onClick={() => handleLike(singleVideo._id)}
                                                style={{ fill: "yellow" }}
                                                size={15}
                                                className="cursor-pointer"
                                            />
                                        </p>
                                        <p className="text-gray-500 flex gap-2 items-center pl-3">
                                            <FaThumbsDown
                                                onClick={() => handledisLike(singleVideo._id)}
                                                fill="red"
                                                size={15}
                                                className="cursor-pointer"
                                            />
                                        </p>
                                    </div>

                                    <button className="rounded-2xl flex justify-center items-center gap-2 bg-gray-700 px-3 py-1 text-gray-200">
                                        <FaShare /> Share
                                    </button>

                                    <div className="relative inline-block">
                                        {/* Three-dot Icon */}
                                        <button
                                            onClick={handleToggleDialog}
                                            className="text-gray-600 hover:text-gray-800 p-2 rounded-full">
                                            <FaEllipsisV size={20} />
                                        </button>

                                        {/* Dialog */}
                                        {isDialogOpen && (
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                                                onClick={handleCloseDialog}
                                            >
                                                <ul className="p-2 space-y-2 text-sm text-gray-700">
                                                    <li
                                                        onClick={() => { addToPlaylists(singleVideo._id) }}
                                                        className="hover:bg-gray-100 px-2 py-1 cursor-pointer rounded">
                                                        Add to Playlist
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className='my-1'>
                                <AddComment />
                            </div>
                            <div className="bg-gray-800 text-gray-300 p-4 rounded-md mt-4">
                                <div className="flex flex-wrap justify-start gap-3 items-center mb-2">
                                    <span className="text-sm">Views: {singleVideo.views}</span>
                                    <span className="text-sm">{moment(singleVideo.createdAt).fromNow()}</span>
                                </div>
                                <p>{singleVideo.description || "No description available."}</p>
                            </div>
                            {/* Liked By Users Section */}
                            <h3 className="flex text-md md:text-lg text-gray-100 mt-6 gap-2 justify-start items-center">
                                Our Subscriber :
                                <span className="flex justify-center items-center w-8 h-8 border rounded-full text-gray-400 bg-gray-950">
                                    <Subscription />
                                </span>
                            </h3>

                            {subsLogo?.length > 0 ? (
                                <ul>
                                    {subsLogo.map(
                                        (user, index) =>
                                            user && (
                                                <li
                                                    key={index}
                                                    className="flex flex-col md:flex-row items-center gap-3 mt-3 bg-gray-700 p-2 rounded-md"
                                                >
                                                    <img
                                                        src={user.logoUrl}

                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <span className="text-gray-100">{user.channelName}</span>
                                                </li>
                                            )
                                    )}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No users have liked this video yet.</p>
                            )}
                        </>
                    ) : (
                        <p className="text-white text-center">Video not found. Please try again later.</p>
                    )}
                </div>

                {/* Recommended Videos Section */}
                <div className=" justify-center md:w-[40%] p-4 text-white h-screen overflow-y-auto no-scrollbar">
                    <h3 className="text-lg md:text-xl font-bold mb-4">Recommended Videos</h3>
                    <div className="space-y-4">
                        {allVideos?.data?.map((ele, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-3 rounded-lg flex flex-col md:flex-row items-start gap-3"
                            >
                                <video
                                    src={ele.videoUrl}
                                    alt={ele.title}
                                    className="w-1/2 h-20 md:w-32 md:h-20 rounded-md object-cover"
                                    onClick={() => handlePlayVideo(ele._id)}
                                />
                                <div className="flex-1">
                                    <p className="text-md font-semibold text-gray-50 truncate">{ele.title}</p>
                                    <p className="text-sm text-gray-500 font-semibold">{ele.category}</p>
                                    <div className="mt-1">
                                        <p className="text-xs text-gray-400">{moment(ele.createdAt).fromNow()}</p>
                                        <p className="text-xs text-gray-400">{`${ele.views} views`}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoPlayer;
