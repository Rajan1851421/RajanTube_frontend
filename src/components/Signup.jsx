import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
    const [name, setName] = useState('');
    const [channelName, setChannelName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [logo, setLogo] = useState(null);
    const [imageurl, setImageUrl] = useState(null);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const fileHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('channelName', channelName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('logo', logo);

        try {
            const response = await axios.post(
                'https://rajantube-1.onrender.com/user/signup',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Response:', response.data);            
            setLoading(false)
            toast.success(response.data.meassge)
            navigate('/')
        } catch (error) {
            setLoading(false)            
            toast.error(error.response.data.message)
            
        }
    };

    return (
        <>
            <div className="w-full h-screen shadow-md bg-gray-900 flex flex-col justify-center items-center py-4">
                {/* Logo and Title */}
                <div className="flex flex-row justify-center items-center space-x-4 mb-6">
                    <FaYoutube className="text-[#DC2626]" size={32} />
                    <h2 className="font-bold text-white text-2xl">RajanTube</h2>
                </div>

                {/* Signup Form */}
                <form
                    className="w-11/12 md:w-1/2 h-auto p-8 rounded-md bg-black space-y-4"
                    onSubmit={handleSubmit}
                >
                    <h3 className="text-white text-xl font-bold mb-4">Regeister User</h3>

                    {/* Channel Name */}
                    <div>
                        <input
                            required
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            type="text"
                            placeholder="Enter your channel name"
                            className="w-full px-2 py-3 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-[#DC2626]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-2 py-3 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-[#DC2626]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-2 py-3 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-[#DC2626]"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <input
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-2 py-3 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-[#DC2626]"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div className="flex items-center gap-4">
                        <input
                            required
                            onChange={fileHandler}
                            type="file"
                            className="w-full px-2 py-3 rounded-md bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-[#DC2626]"
                        />
                        {imageurl && (
                            <img
                                className="h-16 w-16 rounded-full object-cover"
                                src={imageurl}
                                alt="Uploaded logo preview"
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-[#DC2626] text-white font-bold rounded-md hover:bg-[#b91c1c] transition"
                    >
                        {loading ? 'Creating...': 'Create Channel'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Signup;
