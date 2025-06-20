import React, { useState, useContext } from 'react';
import frontImage from '../assets/frontimage.jpg';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email, password
      }, {
        withCredentials: true
      });

      console.log("✅ Signin Success:", result.data);
      setUserData(result.data);
      setLoading(false);

      if (result.data.assistantImage && result.data.assistantName) {
        navigate("/");
      } else {
        navigate("/customize");
      }

    } catch (error) {
      console.error("❌ Signin Failed:", error);
      setUserData(null);
      setLoading(false);
      setErr(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center"
      style={{
        backgroundImage: `url(${frontImage})`,
        backgroundPosition: 'center',
      }}
    >
      <form className='w-full h-[600px] max-w-[500px] bg-black/30 backdrop-blur
      shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'
        onSubmit={handleSignIn}
      >
        <h1 className='text-white text-[30px] font-semibold mb-[30px] px-[20px]'>
          SignIn to <span className='text-gray-900'>Virtual Assistant</span>
        </h1>

        <input
          type='email'
          placeholder='Enter your Email'
          className='border-2 w-full h-[60px] border-white bg-transparent outline-none
          text-white placeholder-gray px-[20px] py-[10px] rounded-full text-[18px]'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={loading}
        />

        <div className='border-2 w-full h-[60px] border-white bg-transparent 
        text-white placeholder-gray rounded-full text-[18px] relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            className='w-full outline-none h-full rounded-full placeholder-gray px-[20px] py-[10px] bg-transparent'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={loading}
          />
          {!showPassword ? (
            <IoMdEye
              className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer'
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoMdEyeOff
              className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer'
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {err && <p className='text-red-500 text-[20px]'>*{err}</p>}

        <button
          className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold
        text-[19px] mt-[30px] cursor-pointer'
          disabled={loading}
        >
          {loading ? "loading.." : "SignIn"}
        </button>

        <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate("/signup")}>
          Want to create a new account? <span className='text-blue-900'>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
