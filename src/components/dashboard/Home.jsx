import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, getAllUsers } from "../../features/rajanTubeSlice";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";;
import Confetti from "react-confetti";

function Home() {
  const [currentVideo, setCurrentVideo] = useState(null); // Track the currently hovered video
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [videoDurations, setVideoDurations] = useState({});
  const [filteredVideos, setFilteredVideos] = useState([]);
  const dispatch = useDispatch();
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
    dispatch(getAllVideos()).then((res) => {
      if (res.payload?.data) {
        setFilteredVideos(res.payload.data);
      }
    });
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleVideoClick = (id) => {
    navigate(`/video-play/${id}`);
  };

  const handleLoadedMetadata = (videoId, duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [videoId]: `${minutes}:${seconds}`,
    }));
  };

  const filteredVideosList =
    selectedCategory && filteredVideos
      ? filteredVideos.filter((video) => video.category === selectedCategory)
      : filteredVideos;

  return (
    <div className="bg-black min-h-screen w-full">
      {isConfettiActive && <Confetti />}
      {loading ? (
        <div className="flex justify-center items-center h-full absolute inset-0 bg-opacity-50 bg-black text-white text-2xl">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="w-full bg-gray-800 rounded-md sticky top-0 z-30">
            <ul className="py-2 flex justify-between text-white items-center gap-3 mx-2">
              <button
                className={`p-1 border rounded-md text-xs ${selectedCategory === "" ? "bg-gray-600" : ""
                  }`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
              {searchList.map((item, index) => (
                <button
                  key={index}
                  className={`p-1 border rounded-md text-xs ${selectedCategory === item.name ? "bg-gray-600" : ""
                    }`}
                  onClick={() => setSelectedCategory(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 mt-2">
            {filteredVideosList && filteredVideosList.length > 0 ? (
              filteredVideosList.map((video) => (
                <div
                  key={video._id}
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <video
                      id={video._id}
                      src={video.videoUrl}
                      onClick={() => handleVideoClick(video._id)}
                      className="w-full h-48 object-cover cursor-pointer"
                      onMouseEnter={(e) => {
                        setCurrentVideo(video._id);
                        e.target.play(); // Start playing the video
                        e.target.controls = true; // Enable sound controls
                      }}
                      onMouseLeave={(e) => {
                        setCurrentVideo(null);
                        e.target.pause(); // Pause the video
                        e.target.controls = false; // Disable sound controls
                      }}
                      onLoadedMetadata={(e) =>
                        handleLoadedMetadata(video._id, e.target.duration)
                      }
                      controls={false} // Initial state (no controls)
                    />
                    <p className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {videoDurations[video._id]}
                    </p>
                  </div>
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
                      <p className="text-gray-500 text-xs">
                        {moment(video.createdAt).fromNow()}
                      </p>
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
