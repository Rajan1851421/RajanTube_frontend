import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'https://rajantube-1.onrender.com/user/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );      
      console.log(response)
      localStorage.setItem("L_token",response.data.token)   
      localStorage.setItem("userId",response.data.user.id)
      localStorage.setItem("channelName",response.data.user.channelName)
      localStorage.setItem("logoUrl",response.data.user.logoUrl)
      toast.success(response.data.message)   
      navigate('/dashboard/my-videos');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message )
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen shadow-md bg-gray-900 flex flex-col justify-center items-center py-4">
      {/* Logo and Title */}
      <div className="flex flex-row justify-center items-center space-x-4 mb-6">
        <FaYoutube className="text-[#DC2626]" size={32} />
        <h2 className="font-bold text-white text-2xl">RajanTube </h2>
      </div>

      {/* Login Form */}
      <form
        className="w-11/12 md:w-1/2 h-auto p-8 rounded-md border space-y-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-white text-xl font-bold mb-4">Login to Your Channel</h3>

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

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 mt-4 text-white font-bold rounded-md transition ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-[#DC2626] hover:bg-[#b91c1c]'
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <Link to="/dashboard/signup" className=' w-full  flex justify-center items-center text-xs mt-1 text-white' >Create Your Account ?</Link>
      </form>
    </div>
  );
}

export default Login;
