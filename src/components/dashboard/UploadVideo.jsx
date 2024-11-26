import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Login from '../Login';

function VideoUpload() {
    const [token, setToken] = useState(null);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [discription, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [video, setVideo] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!localStorage.getItem('L_token')) {
        return <Login />;
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('L_token');
        setToken(storedToken);
    }, []);

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error('Invalid token');
            return;
        }
        if (!video || !thumbnailUrl) {
            toast.error('Please choose a video and thumbnail');
            return;
        }

        setLoading(true);
        const uploadData = new FormData();
        uploadData.append('title', title);
        uploadData.append('tags', tags);
        uploadData.append('discription', discription);
        uploadData.append('category', category);
        uploadData.append('video', video);
        uploadData.append('thumbnailUrl', thumbnailUrl);

        try {
            const response = await axios.post(
                'https://rajantube-1.onrender.com/video/upload',
                uploadData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setLoading(false);
            if (response) {
                toast.success('Video uploaded successfully!');
                setTitle('');
                setTags('');
                setDescription('');
                setCategory('');
                setVideo(null);
                setThumbnailUrl(null);
            } else {
                toast.error('Upload failed.');
            }
        } catch (err) {
            setLoading(false);
            toast.error('An error occurred while uploading the video.');
        }
    };

    return (
        <div className="w-full h-auto p-8 bg-gray-900 flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-11/12 md:w-1/2 p-6 rounded-md space-y-4"
                encType="multipart/form-data"
            >
                <h3 className="text-white text-xl font-bold mb-4">Upload Video</h3>
                {/* Title */}
                <div>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Video Title"
                        required
                        className="w-full px-3 py-2 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <textarea
                        name="discription"
                        value={discription}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Video Description"
                        required
                        className="w-full px-3 py-2 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Technology">Technology</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Tags */}
                <div>
                    <input
                        required
                        type="text"
                        name="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Tags (comma-separated)"
                        className="w-full px-3 py-2 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Video File */}
                <div>
                    <input
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        required
                        className="w-full px-3 py-2 rounded-md bg-gray-50 text-gray-900 outline-none"
                    />
                </div>

                {/* Thumbnail File */}
                <div>
                    <input
                        type="file"
                        name="thumbnailUrl"
                        accept="image/*"
                        onChange={(e) => setThumbnailUrl(e.target.files[0])}
                        required
                        className="w-full px-3 py-2 rounded-md bg-gray-50 text-gray-900 outline-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 font-bold rounded-md transition ${loading
                            ? 'bg-gray-500 text-gray-300'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                >
                    {loading ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>
        </div>
    );
}

export default VideoUpload;
