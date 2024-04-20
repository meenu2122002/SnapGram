import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
// import {GoogleLayout} from "react-google-login"
import { userQuery, userCreatedPinsQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { FcGoogle } from 'react-icons/fc'
const ImageUrl = "https://source.unsplash.com/1600x900/?nature,technology,photography,fitness"




const Userprofile = () => {

  const User = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : undefined;


  const [user, setuser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, settext] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate();
  const { userId } = useParams();
  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 '
  const NotactiveBtnStyles = 'bg-white text-black font-bold p-2 rounded-full w-20'


  useEffect(() => {
    const query = userQuery(userId);
    client
      .fetch(query)
      .then((data) => {
        setuser(data[0])
      })

  }, [userId])

  useEffect(() => {
    console.log(text.length)
    if (text === "Created") {
      const CreatedPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(CreatedPinsQuery)
        .then((data) => {
          console.log("created", data)
          setPins(data)
        })
    }
    else {
      const SavedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(SavedPinsQuery)
        .then((data) => {
          console.log("saved", data)
          setPins(data)
        })
    }
  }, [text, userId])



  if (!user) {
    return <Spinner message={"Loading Profile...."} />
  }
  return (
    <div className='w-full '>
      <div className='relative w-full p-4 flex flex-col justify-center items-center'>
        <img
          src={ImageUrl}
          alt="Banner hu bhii m"
          className='w-full h-[370px] 2xl-[570px] shadow-lg' />
        <img
          src={user?.image}
          alt="user-profile photo"
          className='w-20 h-20 rounded-full -mt-10'
        />

        <h1
          className='font-bold text-3xl text-center mt-3'
        >
          {user?.userName}
        </h1>
        {
          userId === (User?.sub) && <>

            <div className='absolute top-0 z-1 right-0 p-6 pt-2'>
              <button className='mt-7 rounded-lg border-1 bg-red-500 opacity:70 hover:opacity-100 hover:shadow-lg p-2 text-white flex gap-2 items-center '
                type="button"
                onClick={() => {
                  localStorage.removeItem('user')
                  navigate('/login')
                }}

              >

                <AiOutlineLogout />Logout
              </button>
            </div>
          </>
        }
        <div className='text-center mt-3'>
          <button
            type="button"
            onClick={(e) => {
              settext('Created');
              setActiveBtn('created')
            }}
            className={activeBtn === 'created' ? activeBtnStyles : NotactiveBtnStyles}

          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              settext('Saved');
              setActiveBtn('saved')
            }}
            className={activeBtn === 'saved' ? activeBtnStyles : NotactiveBtnStyles}

          >
            Saved
          </button>
        </div>
        {
          pins?.length ?<div className='mx-2'>
          <MasonryLayout pins={pins} />


        </div>:<><div
        className='flex justify-center items-center font-bold text-gray-400 w-full text-xl mt-2'
        >
          No Pins Found
          
          
          </div></>
        }
      </div>
    </div>
  )
}

export default Userprofile
