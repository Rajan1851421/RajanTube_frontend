import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideo, ownAllVideos } from '../../features/rajanTubeSlice';
import { toast } from 'react-toastify';

function MyVideos() {
  const dispatch = useDispatch();
  const { ownerVideo } = useSelector((state) => state.rajanTube);

  useEffect(() => {
    if (!localStorage.getItem('L_token')) {
      toast.error("Please Login")
    }
    dispatch(ownAllVideos());
    console.log("Own", ownerVideo);
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log("Edit ID:", id);
    // Perform edit operation here, e.g., navigate to an edit page
  };

  const handleDelete = (id) => {
    console.log("Delete ID:", id);
    dispatch(deleteVideo(id))
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-white text-lg font-bold text-center pt-4">
          {`Manage Our Videos ${localStorage.getItem('channelName')}`}
        </h1>

        {/* Table for displaying videos */}
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full bg-black text-white table-auto">
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
            <tbody>
              {ownerVideo.videos &&
                ownerVideo.videos.map((ele, index) => (
                  <tr key={ele._id} className="border-t border-gray-700">
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
                      ></img>
                    </td>

                    <td>
                      <button
                        onClick={() => handleEdit(ele._id)}
                        className="px-2 py-1 rounded border border-blue-500 text-blue-500 mx-1 hover:bg-blue-500 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ele._id)}
                        className="px-2 py-1 rounded border border-red-500 text-red-500 mx-1 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyVideos;
