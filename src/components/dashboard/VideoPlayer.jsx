import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllUsers } from '../../features/rajanTubeSlice';

function VideoPlayer() {
    const { id } = useParams();
    const { allVideos, allUsers } = useSelector((state) => state.rajanTube);
    const dispatch = useDispatch();
    const singleVideo = allVideos?.data?.find((video) => video._id === id); 
    const matchingUser = allUsers.find(user => user.id === singleVideo._id);

    if (matchingUser) {
      console.log('Match found:', matchingUser);
    } else {
      console.log('No match found');
    }
    
   
      
   

    useEffect(() => {
        
        if (singleVideo) {
            console.log("Single Video:", singleVideo);
            console.log("All Videos:", allVideos);
            console.log("All Users:", allUsers);

        } else {
            console.log("Video not found");
        }
    }, [id, allUsers, singleVideo, dispatch]);

    return (
        <div className="bg-gray-950 flex justify-center h-screen overflow-y-auto">
            {/* For video player */}
            <div className="w-[60%] p-4">
                {singleVideo ? (
                    <>
                        <video
                            src={singleVideo.videoUrl}
                            controls
                            className="rounded-lg shadow-md border border-gray-900"
                            style={{ width: '640px', height: '360px' }} // Fixed width and height
                        />
                        <h2 className="text-2xl text-gray-100 font-bold">{singleVideo.title}</h2>
                        <div className="flex justify-between">
                            <p></p>
                        </div>
                        <p className="text-gray-100 mt-2">{singleVideo.category}</p>
                        <p className="mt-4">{singleVideo.description}</p>
                        <p className="mt-2 text-gray-100">
                            Views: {singleVideo.views} | Likes: {singleVideo.likes}
                        </p>
                    </>
                ) : (
                    <p className="text-white text-center">
                        Video not found. Please try again later.
                    </p>
                )}
            </div>

            {/* For video details */}
            <div className="w-[40%] p-4 text-white">
                
            </div>
        </div>
    );
}

export default VideoPlayer;
