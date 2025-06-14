import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from '../assets/image1.webp'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/image4.jpg'
import image5 from '../assets/image5.avif'
import image6 from '../assets/image6.jpg'
import frontimage from '../assets/frontimage.jpg'
import { MdOutlineUploadFile } from "react-icons/md";
const Customize = () => {
  const [frontendImage, setfrontendImage]=useState(null)
  const [BackendImage, setBackendImage]=useState(null)
  const inputImage=useRef()
  return (
    
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] 
    to-[blue] flex justify-center items-center flex-col p-[20px] gap-[20px]'>
       <h1 className='text-white text-center text-[30px]'>Select your <span
       className='text-blue-300'>Assistant Image</span></h1>
      <div className='w-[90%] max-w-[900px] flex justify-center
      items-center flex-wrap gap-[20px]'>
       
      <Card image={image1}/>
      <Card image={image2}/>
      <Card image={image3}/>
      <Card image={image4}/>
      <Card image={frontimage}/>
      <Card image={image5}/>
      <Card image={image6}/>
          <div className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[black] border-2 border-[blue] rounded-2xl
     overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer
     hover:border-4 hover:border-white flex items-center justify-center' onClick={
      ()=>inputImage.current.click()
     }>
    <MdOutlineUploadFile className='text-white w-[25px] h-[25px]'/>
    </div>
    <input type="file" accept='image/*' ref={inputImage} hidden/>
      </div>
      <button className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold
        text-[19px] mt-[30px]'>Next</button>
    </div>
  )
}

export default Customize