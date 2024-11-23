import React from "react";
import { useSelector } from "react-redux";

function Subscription() {
  // Access the state from Redux
  const allVideos = useSelector((state) => state.rajanTube?.allVideos);

  // Log to verify the data
  console.log("All Videos:", allVideos);

  return (
    <div>
      <h1>Subscription</h1>
      {/* Render videos if available */}
      {allVideos && allVideos.length > 0 ? (
        <ul>
          {allVideos.map((video) => (
            <li key={video.id}>{video.title}</li> // Adjust based on your video structure
          ))}
        </ul>
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
}

export default Subscription;
