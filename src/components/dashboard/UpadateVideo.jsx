import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateVideo({ videoId, closeModal }) {
    const [videoDetails, setVideoDetails] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [thumbnailUrl, setThumbnail] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the video details to pre-fill the form
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`https://rajantube-1.onrender.com/video/${videoId}`);
                console.log("Update", response)
                setVideoDetails(response.data.data);
                setTitle(response.data.data.title);
                setCategory(response.data.data.category);
                setDescription(response.data.data.discription);
                setTags(response.data.data.tags);
            } catch (err) {
                toast.error('Failed to fetch video details');
            }
        };

        fetchVideoDetails();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('title', title);
            uploadData.append('tags', tags);
            uploadData.append('discription', description);
            uploadData.append('category', category);
            uploadData.append('thumbnailUrl', thumbnailUrl); // Ensure this is a file

            const updatedVideo = await axios.put(
                `https://rajantube-1.onrender.com/video/${videoId}`,
                uploadData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('L_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("Video Updated:", updatedVideo);
            toast.success('Video updated successfully');
            closeModal(); // Close modal after update
        } catch (err) {
            // Log the error response from server
            console.error("Error response:", err.response);
            toast.error('Failed to update video');
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-white">Edit Video</h3>

            <div>
                <label className="block text-white">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                />
            </div>

            <div>
                <label className="block text-white">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                />
            </div>

            <div>
                <label className="block text-white">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                ></textarea>
            </div>

            <div>
                <label className="block text-white">Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                />
            </div>
            <div>
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}  // Use correct setter function
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                />
            </div>


            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded bg-gray-600 text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-600'} text-white`}
                >
                    {loading ? 'Saving...' : 'Update Video'}
                </button>
            </div>
        </form>
    );
}

export default UpdateVideo;
