import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";
const Customize2 = () => {
  const { userData, BackendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
  const [name, setName] = useState(userData?.name || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleUpdateAssistant=async ()=>{
    try {
        let formData = new FormData()
        formData.append("name", name)
        if(BackendImage){
          formData.append("assistantImage", BackendImage)
        }else{
            formData.append("imageUrl", selectedImage)
        }
        const result = await axios.post(`${serverUrl}/api/user/update`,
            formData, {withCredentials:true}
        )
        console.log(result.data)
        setUserData(result.data)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] 
    to-[blue] flex justify-center items-center flex-col p-[20px] gap-[20px] ralative'>
        <IoMdArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]'/>
      <h1 className='text-white text-center text-[30px]'>Enter your <span
        className='text-blue-300'>Assistant Name</span></h1>

      <input
        type='text'
        placeholder='Enter Name '
        className='border-2 w-full h-[60px] border-white bg-transparent outline-none
          text-white placeholder-gray px-[20px] py-[10px] rounded-full text-[18px]'
        required
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {name &&
        <button
          className='min-w-[300px] h-[60px] bg-white rounded-full text-black font-semibold
        text-[19px] mt-[30px] cursor-pointer' disabled={loading}
          onClick={() => {
        
            handleUpdateAssistant()
           } }>
          {!loading? "Create your Assistant":"Loading...."}
        </button>
      }
    </div>
  )
}

export default Customize2
