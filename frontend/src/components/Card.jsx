import React, { useContext } from 'react'
import UserContext, { userDataContext } from '../context/UserContext'

const Card = ({image}) => {
   const {
    serverUrl, userData, setUserData, frontendImage, setfrontendImage,
    BackendImage, setBackendImage, selectedImage, setSelectedImage
  } = useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[black] border-2 border-[blue] rounded-2xl
     overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer
     hover:border-4 hover:border-white ${selectedImage == image?" border-4 border-white shadow-2xl shadow-blue-950":null}`} 
     onClick={()=>{
      setSelectedImage(image)
      setBackendImage(null)
      setfrontendImage(null)
      }}>
     <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card