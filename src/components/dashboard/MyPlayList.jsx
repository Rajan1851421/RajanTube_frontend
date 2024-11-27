import React from 'react';
import { useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function MyPlayList() {
  // Accessing the playlist data from Redux store
  const { playlist } = useSelector((state) => state.playlist);
  const navigate = useNavigate()
  console.log(playlist);

 
    const handleVideoClick = (id) => {
      console.log(id)
      navigate(`/video-play/${id}`);
    }
  

  return (
    <>

      <div className='bg-black text-white h-screen p-2'>
        <h1 className='my-2 text-gray-400 text-md md:text-2xl font-bold'>Our Playlists</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {playlist.length > 0 ? (
            playlist.map((video) => (
              <div
                key={video._id}
                className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-gray-600 mt-2">{video.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500 flex justify-center items-center gap-2"><FaEye/> {video.views}</span>
                    <button
                      // href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                      onClick={() => handleVideoClick(video._id)}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className='p-2'>
                <p className="">Your playlist is empty.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPlayList;
