import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllVideos } from "../../features/rajanTubeSlice";
import { addToHistory } from "../../features/rajanTubeSlice";
import { Vortex } from 'react-loader-spinner'
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [currentVideo, setCurrentVideo] = useState(null); // Track the currently playing video
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const [liked, setLiked] = useState('')
  const { allVideos } = useSelector((state) => state.rajanTube);
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllVideos());
    dispatch(getAllUsers())

    // Simulate API call delay and set loading to false once data is fetched
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data is fetched
    }, 2000); // You can adjust the timeout as per the API response time

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [dispatch, liked]);

  // const handleVideoClick = (videoId) => {
  //   console.log("id", videoId);
  //   dispatch(addToHistory(videoId));
  //   if (currentVideo && currentVideo !== videoId) {
  //     const prevVideo = document.getElementById(currentVideo);
  //     if (prevVideo) prevVideo.pause();
  //   }
  //   setCurrentVideo(videoId);
  //   dispatch(addToHistory(videoId));
  // };

  const handleVideoClick=(id)=>{
    navigate(`/video-play/${id}`);
  }

  const handleLike = (id) => {
    if(!localStorage.getItem('L_token')){
      navigate('/login')
    }
    setLiked("")    
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
        console.log(response);
        setLiked(response.data.message)
        toast.success(response.data.message)
      })
      .catch((error) => {
        console.error("Error liking video:", error);
      });

    
  };

  const handledisLike =(id)=>{
    if(!localStorage.getItem('L_token')){
      navigate('/login')
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
        setLiked(response.data.message)
        toast.success(response.data.message)
      })
      .catch((error) => {
        console.error("Error liking video:", error);
      });

   
  }


  return (
    <div className="bg-black min-h-screen w-full">
      {/* Loading text */}
      {loading ? (
        <div className="flex justify-center items-center h-full absolute inset-0 bg-opacity-50 bg-black text-white text-2xl">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {allVideos?.data && allVideos.data.length > 0 ? (
            allVideos.data.map((video) => (
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
                        <p className="text-gray-500 text-xs flex flex-row items-center gap-2 border-r-2 px-2 ">
                          {video.likes}
                          <FaThumbsUp
                            onClick={() => handleLike(video._id)}
                            style={{ fill: "yellow" }}
                            size={15}
                            className="cursor-pointer"
                          />
                        </p>
                        <p className="text-gray-500 text-xs flex flex-row items-center gap-2 px-2 ">
                          <FaThumbsDown
                            onClick={() => handledisLike(video._id)}
                            fill="red" size={15}
                            className="cursor-pointer"
                          />
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">
                        {moment(video.createdAt).fromNow()}
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
      )}
    </div>
  );
}

export default Home;
