import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllUsers, addToHistory } from '../../features/rajanTubeSlice'; // Import addToHistory
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';
import moment from "moment";

function VideoPlayer() {
    const { id } = useParams();
    const { allVideos, allUsers } = useSelector((state) => state.rajanTube);
    const [singleVideo,setSingleVide] = useState([])
    const dispatch = useDispatch();
    const [liked, setLiked] = useState('');
    

    const likedByUsers = singleVideo?.likedby?.map((userId) =>
        allUsers?.find((user) => user._id === userId)
    );

    useEffect(() => {
        const singleVideo = allVideos?.data?.find((video) => video._id === id);
        setSingleVide(singleVideo)
        dispatch(getAllUsers());
    }, [dispatch, liked]);

    const handleLike = (id) => {
        if (!localStorage.getItem('L_token')) {
            navigate('/login');
        }
        setLiked('');
        axios
            .put(
                `https://rajantube-1.onrender.com/video/like/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('L_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                setLiked(response.data.message);
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.error("Error liking video:", error);
            });
    };

    const handledisLike = (id) => {
        if (!localStorage.getItem('L_token')) {
            navigate('/login');
        }
        axios
            .put(
                `https://rajantube-1.onrender.com/video/dislike/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('L_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                setLiked(response.data.message);
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.error("Error disliking video:", error);
            });
    };

    const handlePlay = () => {       
        dispatch(addToHistory(singleVideo._id));
    };
    const handlePlayVideo = (id) => {
        const clickedVideo = allVideos?.data?.find((video) => video._id === id);
        if (clickedVideo) {
            setSingleVide(clickedVideo); // Update the current video
            console.log("Loaded video:", clickedVideo);
        } else {
            console.error("Video not found!");
        }
    };

    return (
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
                            style={{ height: '300px' }} /* Adjusted for smaller screens */
                            onPlay={handlePlay} // Trigger action on play
                        />
                        <h2 className="text-lg md:text-2xl text-gray-100 font-bold mt-3">
                            {singleVideo.title}
                        </h2>
                        {/* Actions Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
                            <p className="text-gray-400">{singleVideo.category}</p>
                            <div className="flex flex-wrap gap-2 md:gap-4">
                                <button className="rounded-2xl bg-gray-900 px-3 py-1 text-white">Join</button>
                                <button className="rounded-2xl bg-gray-200 px-3 py-1 text-gray-600">Subscribe</button>
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
                            </div>
                        </div>
                        {/* Description Section */}
                        <div className="bg-gray-800 text-gray-300 p-4 rounded-md mt-4">
                            <div className="flex flex-wrap justify-start gap-3 items-center mb-2">
                                <span className="text-sm">Views: {singleVideo.views}</span>
                                <span className="text-sm">{moment(singleVideo.createdAt).fromNow()}</span>
                            </div>
                            <p>{singleVideo.description || "No description available."}</p>
                        </div>
                        {/* Liked By Users Section */}
                        <h3 className="text-md md:text-lg text-gray-100 mt-6">Liked By:</h3>
                        {likedByUsers?.length > 0 ? (
                            <ul>
                                {likedByUsers.map(
                                    (user, index) =>
                                        user && (
                                            <li
                                                key={index}
                                                className="flex flex-col md:flex-row items-center gap-3 mt-3 bg-gray-700 p-2 rounded-md"
                                            >
                                                <img
                                                    src={user.logoUrl}
                                                    alt={user.channelName}
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
            <div className="w-full md:w-[40%] p-4 text-white h-screen overflow-y-auto no-scrollbar">
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
                                className="w-full md:w-32 md:h-20 rounded-md object-cover"
                                onClick={()=>handlePlayVideo(ele._id)}
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
    );
}

export default VideoPlayer;
