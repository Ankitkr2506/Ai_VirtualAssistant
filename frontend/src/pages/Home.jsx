import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const {userData, serverUrl, setUserData}=useContext(userDataContext)
  const navigate = useNavigate()
  const handleLogOut=async()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/auth/logout`, {},
        {withCredentials:true}
      )
      setUserData(null)
      navigate("/signin")
      
      console.log("rest is history")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] 
    to-[blue] flex justify-center items-center flex-col gap-[15px] relative'>
       <button className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold
        text-[19px] mt-[30px] absolute top-[20px] right-[20px] px-[20px] py-[10px] cursor-pointer' 
        onClick={handleLogOut}>  Log Out 
        </button>
         <button className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold
        text-[19px] mt-[30px] absolute top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer' 
       onClick={()=>navigate("/customize")} > Customize your  Assistant
        </button>
   <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
    <img src={userData?.assistantImage} alt='' className='h-full object-cover'/>

   </div>
   <h1 className='text-white font-bold text-[18px]'>I am {userData?.name}</h1>
    </div>
  )
}

export default Home