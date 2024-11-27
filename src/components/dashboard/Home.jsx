import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, getAllUsers } from "../../features/rajanTubeSlice";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

function Home() {
  const [currentVideo, setCurrentVideo] = useState(null); // Track the currently playing video
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for the selected category
  const dispatch = useDispatch();
  const [liked, setLiked] = useState("");
  const { allVideos, loading } = useSelector((state) => state.rajanTube);
  const navigate = useNavigate();

  const searchList = [
    { name: "Education" },
    { name: "Entertainment" },
    { name: "Music" },
    { name: "Sports" },
    { name: "Technology" },
    { name: "Others" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllVideos());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleVideoClick = (id) => {
    navigate(`/video-play/${id}`);
  };

  const handleLike = (id) => {
    if (!localStorage.getItem("L_token")) {
      navigate("/login");
      return;
    }

    setLiked("");
    axios
      .put(
        `https://rajantube-1.onrender.com/video/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("L_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLiked(response.data.message);
        setIsConfettiActive(true);

        // Update the liked video count in the local state
        dispatch(getAllVideos()); // Refresh the list of videos to reflect the updated like count

        setTimeout(() => {
          setIsConfettiActive(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error liking video:", error);
      });
  };

  const handleDislike = (id) => {
    if (!localStorage.getItem("L_token")) {
      navigate("/login");
      return;
    }

    axios
      .put(
        `https://rajantube-1.onrender.com/video/dislike/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("L_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLiked(response.data.message);
        toast.success(response.data.message);
        dispatch(getAllVideos());
      })
      .catch((error) => {
        console.error("Error disliking video:", error);
      });
  };

  // Filter videos based on selected category
  const filteredVideos =
    selectedCategory && allVideos?.data
      ? allVideos.data.filter((video) => video.category === selectedCategory)
      : allVideos?.data;

  return (
    <div className="bg-black min-h-screen w-full">
      {isConfettiActive && <Confetti />}
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
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      ) : (
        <>
          <div className="w-full bg-gray-800 rounded-md sticky top-0 z-30">
            <div>
              <ul className="py-2 flex justify-between text-white items-center gap-3 mx-2">
                <button
                  className={`p-1 border rounded-md text-xs ${
                    selectedCategory === "" ? "bg-gray-600" : ""
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  All
                </button>
                {searchList.map((item, index) => (
                  <button
                    key={index}
                    className={`p-1 border rounded-md text-xs ${
                      selectedCategory === item.name ? "bg-gray-600" : ""
                    }`}
                    onClick={() => setSelectedCategory(item.name)}
                  >
                    {item.name}
                  </button>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 mt-2">
            {filteredVideos && filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div
                  key={video._id}
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  {/* Video Thumbnail */}
                  <div className="relative">
                    {currentVideo === video._id ? (
                      <video
                        id={video._id}
                        src={video.videoUrl}
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                        className="w-full h-48 object-cover cursor-pointer"
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
                      {Math.floor(Math.random() * 59)
                        .toString()
                        .padStart(2, "0")}
                    </p>
                  </div>
                  {/* Video Info */}
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white text-md font-semibold truncate">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {video.category}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <div className="flex gap-2">
                        <p className="text-gray-500 text-xs">{video.views} views</p>
                        <div className="bg-gray-700 flex px-2 py-1 rounded-xl">
                          <p className="text-gray-500 text-xs flex flex-row items-center gap-2 border-r-2 px-2">
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
                              onClick={() => handleDislike(video._id)}
                              fill="red"
                              size={15}
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
        </>
      )}
    </div>
  );
}

export default Home;
