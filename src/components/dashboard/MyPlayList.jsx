import React from 'react';
import { useSelector } from 'react-redux';

function MyPlayList() {
  // Accessing the playlist data from Redux store
  const { playlist } = useSelector((state) => state.playlist);
  console.log(playlist);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <span className="text-sm text-gray-500">Views: {video.views}</span>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Watch Now
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your playlist is empty.</p>
      )}
    </div>
  );
}

export default MyPlayList;
