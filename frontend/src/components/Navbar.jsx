import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {IoMdAdd,IoMdSearch} from "react-icons/io"





const Navbar = ({searchTerm,setsearchTerm,user}) => {
    const navigate=useNavigate();
    if(!user)
    return null;
  return (
    <div className='flex items-center w-full gap-2 '>
       <div className='flex justify-start items-center gap-2 shadow-md pt-4 mt-2 w-[90%] pl-2'>
        <IoMdSearch fontSize={21}/>
        <input
        type="text"
        onChange={(e)=>setsearchTerm(e.target.value)}
        value={searchTerm}
        className='p-2 w-full focus:outline-none  bg-white'
        placeholder='Search'
        onFocus={()=>navigate("/search")}
        />
       </div>
       <div className='flex gap-2 justify-center  items-center'>
        <Link to={`/user-profile/${user._id}`} className='hidden md:block'>
        <img src={user.image} alt="user-profile" className='w-14 h-14 rounded-full'/>
        </Link>
        <Link to={`/create-pin`} className='bg-black text-white w-12 h-12 md:w-14 md:h-12 flex justify-center items-center rounded-lg'>
       <IoMdAdd />
        </Link>
       </div>

    </div>
  )
}

export default Navbar
