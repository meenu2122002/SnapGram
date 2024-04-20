import React from 'react'
import { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'
import {BsArrowRepeat} from "react-icons/bs"



const CreatePin = ({user}) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(null)
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)
const navigate=useNavigate();







const uploadImage=(e)=>{
  const {type,name}=(e.target.files)[0];
  console.log(typeof(e.target.files[0]))
  if(type==="image/png" || type==="image/gif" || type==="image/svg" || type==="image/jpeg" || type==="image/tiff"){
    setWrongImageType(false);
    setLoading(true)
    client.assets
    .upload("image",e.target.files[0],{contentType:type,filename:name,})
    .then((document)=>{
setLoading(false)
setImageAsset(document)
setWrongImageType(false)
    }).catch(err=>{
      console.log("Image Upload Error",err)
    })
  }
  else{
    setWrongImageType(true)
  }
}

const savePin=()=>{
if(title && about && destination && imageAsset?._id && category ){
  const doc={
    _type:'pin',
    title,
    about,
    destination,
    category,
    image:{
      _type:'image',
      asset:{
        _type:'reference',
        _ref:imageAsset?._id
      }
    },
    userId:user?._id,
    postedBy:{
      _type:'postedBy',
      _ref:user?._id
    }

  }
  client.create(doc)
  .then(()=>{
    navigate('/')
  })
}

else{
  setFields(true)
  setTimeout(() => {
    setFields(false)
  }, 2000);
}
}

  return (
    <div className='flex flex-col justify-center items-center mt-2 lg:h-4/5' >
    {
      fields && <p className='text-red-600 my-5 text-xl transition-all duration-150 ease-in'>Please Fill All the Fields.</p>
    }
    <div className=' bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
<div className='bg-secondaryColor p-3 w-full flex-col lg:flex-row'>
<div className='relative flex justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-[420px]'>

  {loading && <Spinner/>}
  {wrongImageType && 
  <>
  <div className='flex flex-col justify-center items-center gap-3'>
  <p className='text-xl font-bold'>Wrong Image Type</p>
  <BsArrowRepeat/>
  </div>
 

  </>
  }
{!imageAsset ?
  <>
  <label >

  <div className='flex flex-col gap-3 h-full justify-center items-center'>
    <div className='flex flex-col justify-center items-center'>
      <p className='font-bold text-2xl'><AiOutlineCloudUpload/></p>
      <p className='cursor-pointer'>Click to upload</p>
    </div>
   <p className='text-gray-400'>
    Use high-quality JPG,SVG,PNG,GIF,TIFF
   </p>

  </div>
  
     <div className='absolute top-0 h-full flex flex-col justify-center items-center bg-transparent'>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
                </div>
  </label>
 
  
  </>:<>
  <div className='relative h-full w-full'>
<img src={imageAsset.url} alt="uploaded-pic" className='h-full w-full'/>
<button
type="button"
className='absolute bottom-3 right-3 p-3 cursor-pointer hover:shadow-md transition-all outline-none duration-500 ease-in text-xl bg-white rounded-full opacity-75 hover:opacity-100'
onClick={()=>setImageAsset(null)}
>
<MdDelete/>
</button>
  </div>
  
  </>}

</div>
</div>
<div className='flex flex-col gap-6 w-full'>
  <input 
  type="text"
  value={title}
  placeholder='Add your title here'
  className='outline-none text-xl sm:text-2xl p-2 border-b-2 border-gray-100  '
  onChange={(e)=>{
    setTitle(e.target.value)
  }}
   />
   {
    user && <>
    <div className='flex justify-start items-center gap-2'>
      <img 
      src={user.image} alt="user-profile image"
      className='rounded-full h-10 w-10' 
      />
      <p  className='font-bold text-xl'>{user.userName}</p>
    </div>
    </>
   }
   <input 
  type="text"
  value={about}
  placeholder='Description'
  className='outline-none p-2 border-b-2 border-gray-100 text-xl sm:text-2xl  '
  onChange={(e)=>{
    setAbout(e.target.value)
  }}
   />
   
   <input 
  type="text"
  value={destination}
  placeholder='Add a destination link'
  className='outline-none p-2 border-b-2 border-gray-100 text-xl sm:text-2xl  '
  onChange={(e)=>{
    setDestination(e.target.value)
  }}
   />
   <div className='flex flex-col'>
<p className='font-bold sm:text-xl'>Choose Pin Category</p>
<select
 onChange={(e)=>setCategory(e.target.value)}
 className='outline-none border-b-2 border-gray-100 text-base p-2 rounded-md cursor-pointer'
 >
 <option value="other" className='bg-white'>Select category</option>
{
categories.map((category,i)=>{
  return <>
  <option className='text-base bg-white outline-none border-0 text-black capitalize' value={category.name}>{category.name}</option>
  </>
})
}

</select>
   </div>
   <div>
    <button
    type="button"
    onClick={()=>{
savePin();
    }
     
    }
    className="bg-red-500 text-white font-bold rounded-full p-2 w-28 outline-none" 
    >
Save Pin
    </button>
   </div>
</div>
    </div>
    </div>
  )
}

export default CreatePin
