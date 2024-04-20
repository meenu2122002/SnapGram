import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Link, Route, Routes } from 'react-router-dom'
import { Sidebar, UserProfile } from '../components'
import { client } from '../client'
import logo from "../assets/logo.png"
import Pins from './Pins'
import query, { userQuery } from "../utils/data"





const Home = () => {
  const navigate = useNavigate()

  const initialState = {}
  const [user, setuser] = useState(null)
  const scrollref = useRef(null)
  const [toggleSidebar, setTogglesidebar] = useState(false)


  const userinfo = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : undefined;


  useEffect(() => {
    console.log(userinfo, "sub")
    if (!userinfo) {
      navigate("/login")
    }
    const query = userQuery(userinfo?.sub)
    console.log("query", query);
    client.fetch(query).then(data => {
      console.log(data)
      setuser(data[0])
    })



  }, [])

  useEffect(() => {
    scrollref.current.scrollTo(0, 0)
  }, [])





  return (
    <div className='md:flex'>
      <div className='md:flex hidden  z-10'>
        <Sidebar user={user && user} />

      </div>
      <div className='flex md:hidden  justify-between p-2 shadow-md items-center w-full'>

        <HiMenu className=' cursor-pointer' fontSize={"100px"} onClick={() => { setTogglesidebar(true) }} />
        <Link to="/">

          <img src={logo} className='w-28' />

        </Link>
        <Link to={`/user-profile/${user?._id}`}>

          <img src={user?.image} className='w-28' />

        </Link>
        {
          toggleSidebar && <>
            <div className='fixed w-4/5 bg-white h-screen overflow-auto shadow-md animate-slide-in z-20 top-0 left-0' >
              <div className='absolute w-full flex justify-end text-black'>
                <AiFillCloseCircle fontSize={"40px"} onClick={() => setTogglesidebar(false)} />

              </div>
              <Sidebar user={user && user} setTogglesidebar={setTogglesidebar} toggleSidebar={toggleSidebar} />
            </div>



          </>
        }
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollref}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>

    </div>
  )
}

export default Home
