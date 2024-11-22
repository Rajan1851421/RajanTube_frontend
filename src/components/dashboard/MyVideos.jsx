import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideo, ownAllVideos } from '../../features/rajanTubeSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UpdateVideo from './UpadateVideo'; 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



function MyVideos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ownerVideo } = useSelector((state) => state.rajanTube);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('L_token')) {
      navigate('/login');
    } else {
      navigate('/my-videos');
    }
    dispatch(ownAllVideos());
  }, [dispatch, navigate,ownerVideo]);

  const handleEdit = (id) => {
    console.log("Edit", id)
    setSelectedVideoId(id);
    setIsModalOpen(true); // Open the modal when Edit button is clicked
  };

  const handleDelete = (id) => {
    dispatch(deleteVideo(id));
    toast.success('Video deleted successfully');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId(null); // Reset the video ID when closing the modal
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white">
        <h1 className="text-white text-lg font-bold text-center pt-4">
          {`Manage Our Videos ${localStorage.getItem('channelName')}`}
        </h1>

        {/* Table for displaying videos */}
        <div className="overflow-x-auto mt-8 ">
          <table className="w-full bg-gray-950 text-white table-auto ">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Likes</th>
                <th className="px-4 py-2 text-left">Dis Likes</th>
                <th className="px-4 py-2 text-left">Views</th>
                <th className="px-4 py-2 text-left">Video</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody >
              {ownerVideo.videos &&
                ownerVideo.videos.map((ele, index) => (
                  <tr key={ele._id} className="border-t border-gray-700 hover:bg-gray-900 transition-all ">
                    <td className="px-4 py-2">{ele.title}</td>
                    <td className="px-4 py-2">{ele.category}</td>
                    <td className="px-4 py-2">{ele.discription}</td>
                    <td className="px-4 py-2">{ele.likes}</td>
                    <td className="px-4 py-2">{ele.dislike}</td>
                    <td className="px-4 py-2">{ele.views}</td>
                    <td className="px-4 py-2">
                      <img
                        src={ele.thumbnailUrl}
                        controls
                        className="h-16 w-16 object-cover"
                      />
                    </td>

                    <td className='flex  itmes-center justify-center h-full pt-6'>
                      <button
                        onClick={() => handleEdit(ele._id)}
                        className=" flex justify-center items-center px-2 py-1 rounded border border-blue-500 text-blue-500 mx-1 hover:bg-blue-500 hover:text-white"
                      >
                       <FaEdit/> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ele._id)}
                        className=" flex justify-center items-center px-2 py-1 rounded border border-red-500 text-red-500 mx-1 hover:bg-red-500 hover:text-white"
                      >
                       <MdDelete/> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modal for editing video */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-gray-800 p-6 rounded-md w-11/12 sm:w-1/2"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >

              <UpdateVideo videoId={selectedVideoId} closeModal={closeModal} />
              
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyVideos;
