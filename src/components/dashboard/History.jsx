import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory } from "../../features/rajanTubeSlice";

function History() {
    const { history, allVideos } = useSelector((state) => state.rajanTube);
    const [matchedVideos, setMatchedVideos] = useState([]);
    const [isPlaying, setIsPlaying] = useState(null);
    const videoRefs = useRef({});
    const [currentVideo, setCurrentVideo] = useState(null); // Track the currently playing video

    useEffect(() => {
        if (history.length > 0 && allVideos.data) {
            // Filter allVideos to show only the ones that are in history
            const matched = allVideos.data.filter((video) =>
                history.includes(video._id) // Match video ID in the history array
            );
            setMatchedVideos(matched);
        }
    }, [history, allVideos]);

    const handleVideoClick = (videoId) => {
        // Pause the previously playing video
        console.log("id", videoId);
        if (currentVideo && currentVideo !== videoId) {
            const prevVideo = document.getElementById(currentVideo);
            if (prevVideo) prevVideo.pause();
        }
        setCurrentVideo(videoId); // Update the currently playing video
        dispatch(addToHistory(videoId)); // Optionally add to history again when clicked
    };

    return (
        <div className="bg-black min-h-screen w-full p-4">
            <h1 className='text-gray-100 my-4 text-xl border-b border-gray-900 pb-2 '>Recent Hostory </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {matchedVideos.length > 0 ? (
                    matchedVideos.map((video) => (
                        <div key={video._id} className="rounded-lg shadow-md overflow-hidden">
                            {/* Video Thumbnail */}
                            <div className="relative">
                                {currentVideo === video._id ? (
                                    <video
                                        id={video._id}
                                        src={video.videoUrl}
                                        className="w-full h-48 object-cover cursor-pointer"
                                        onClick={(e) => {
                                            const videoElement = e.target;
                                            if (videoElement.paused) {
                                                videoElement.play(); // Play the video
                                            } else {
                                                videoElement.pause(); // Pause the video
                                            }
                                        }}
                                        autoPlay
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="w-full h-48 object-cover cursor-pointer"
                                        onClick={() => handleVideoClick(video._id)} // Show video on click
                                    />
                                )}
                                <p className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    {Math.floor(Math.random() * 10) + 1}:
                                    {Math.floor(Math.random() * 59).toString().padStart(2, "0")}
                                </p>
                            </div>
                            {/* Video Info */}
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-white text-md font-semibold truncate">
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs mt-1">{video.category}</p>
                                </div>
                                <div className="flex gap-2 justify-between items-center">
                                    <div className="flex gap-2">
                                        <p className="text-gray-500 text-xs">{video.views} views</p>
                                        <div className="bg-gray-700 flex px-2 py-1 rounded-xl">
                                            <p className="text-gray-500 text-xs flex flex-row items-center gap-2 border-r-2 px-2">
                                                {video.likes}
                                                <FaThumbsUp fill="yellow" size={15} className="cursor-pointer" />
                                            </p>
                                            <p className="text-gray-500 text-xs flex flex-row items-center gap-2 px-2">
                                                <FaThumbsDown fill="red" size={15} className="cursor-pointer" />
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">
                                            {moment(video.updatedAt).fromNow()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">
                        No videos available. Please try again later.
                    </p>
                )}
            </div>
        </div>
    );
}

export default History;
