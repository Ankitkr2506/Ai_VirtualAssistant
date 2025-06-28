import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "https://ai-virtual-assistant-gilt.vercel.app"
  const [userData, setUserData] = useState(null)
  const [frontendImage, setfrontendImage]=useState(null)
    const [BackendImage, setBackendImage]=useState(null)
    const [selectedImage, setSelectedImage]=useState(null)
  const handleCurrentUser=async () =>{
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`,
        {withCredentials:true}
      )
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGeminiResponse=async(command)=>{
 try {
   const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,
    {command},{withCredentials:true}
   )
   return result.data
 } catch (error) {
  console.log(error)
 }
  }

  useEffect(()=>{
    handleCurrentUser()
  }, [])
  const value = {
    serverUrl, userData, setUserData, frontendImage, setfrontendImage,
    BackendImage, setBackendImage, selectedImage, setSelectedImage, getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
