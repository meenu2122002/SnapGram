import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {RiHomeFill} from "react-icons/ri"
import {IoIosArrowForward} from "react-icons/io"
import logo from "../assets/logo.png"
import { categories } from '../utils/data'

const Sidebar = ({user,setTogglesidebar,toggleSidebar}) => {
  const handlecloseSidebar=()=>{
    if(setTogglesidebar)
    setTogglesidebar(false)
  console.log(toggleSidebar)
  }
const ActiveLink="flex items-center  gap-3 bordr-r-2 border-black font-extrabold transition-all duration-200 ease-out-in capitalize text-lg";
const NotActiveLink=" flex items-center  gap-3 hover:text-black hover:shadow-lg text-lg capitalize";


  return (
  <div className='h-screen flex flex-col justify-between'>


    <div className='m-8 mt-0  sm:text-2xl md:text-xl  overflow-y-scroll flex flex-col justify-between'>
     <Link to="/" onClick={handlecloseSidebar} className='flex justify-center items-center mt-5 mr-2'>
     <img src={logo}/>
     
     </Link>
     <div className='flex flex-col gap-5 py-5'>
<NavLink
to="/"
className={({isActive})=>{
  return (isActive?ActiveLink:NotActiveLink);
}}
>
<RiHomeFill/>
Home

</NavLink>
<h3 className='text-xl'>Discover categories</h3>
{
  categories.slice(0,categories.length-1).map((category,i)=>{
    return <>
    
    <NavLink
    to={`/category/${category.name}`}
    className={({isActive})=>isActive?ActiveLink:NotActiveLink}
    onClick={handlecloseSidebar}
    key={i}
    >
      <img
       src={category.image} 
      alt="categories" 
      className='w-8 h-8 rounded-full shadow-sm'/>
{category.name}


    </NavLink>
    </>
  })
}
     </div>

    </div>
    {
  user && <>
  <Link to={`/user-profile/${user._id}`} 
  className='flex gap-2 items-center bg-white shadow-lg rounded-lg ml-6'
  onClick={handlecloseSidebar}
  
  >
  <img src={user.image} className='w-10 h-10 rounded-full'/>
  <p>{user.userName}</p>
  </Link>
  
  </>
}
   
  </div>
    
    


  )
}

export default Sidebar
