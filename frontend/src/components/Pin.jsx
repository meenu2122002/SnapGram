import React, { useEffect, useRef } from 'react'
import { urlFor, client } from '../client'
import { useNavigate, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from "react-icons/md"
import { AiTwotoneDelete } from "react-icons/ai"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"
import { useState } from 'react'
import { fetchUser } from '../utils/fetchUser'
console.log("jhsdjkw",uuidv4())
const Pin = ({ pin }) => {
  const navigate = useNavigate()
  const [posthovered, setPosthovered] = useState(false)
  const [savingpost, setSavingpost] = useState(false);
  const user = fetchUser();
  let alreadySaved = (pin?.save?.filter((item) => {
    return (item.userId == user?.sub)
  }))?.length
  // console.log("already", alreadySaved)

console.log(alreadySaved,"alreadysaved")


  const savePin = (id) => {
    setSavingpost(true)
    client
      .patch(id)
      .setIfMissing({ save: [] })
      .insert('after', 'save[-1]', [
        {
          _key: uuidv4(),
          userId: user?.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.sub
          }
        }
      ])
      .commit().then(() => {
        window.location.reload();
        
        setSavingpost(false)
        
        console.log("saved", pin?.save)
      })

  }
const deletePin=(id)=>{
  client.
  delete(id)
  .then(()=>{
    window.location.reload();
  })
 
}

  return (
    <div className='m-2 '>
      <div
        onMouseEnter={() => setPosthovered(true)}
        onMouseLeave={() => setPosthovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className='relative cursor-zoom-in shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out w-auto flex flex-col'
      >
        <img src={pin?.image && urlFor(pin?.image)?.width(250)?.url()} alt="" className='rounded-md w-full' />
        {
          posthovered &&
          <div
            className='absolute top-0 w-full  h-full flex flex-col justify-between p-2 pl-1 z-50 mt-2 '
            style={{ height: "100%" }}

          >
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <a href={`${pin.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />

                </a>
              </div>

              {
                alreadySaved ?
                  <button
                    type="button"
                    className='bg-green-500'
                  >{pin?.save?.length}Saved</button>
                  : <button
                    type="button"
                    className='bg-red-500  font-bold text-white hover:shadow-md px-2 py-1 rounded-md opacity-70 hover:opacity-100'
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(pin._id)
                    }}
                  >  {pin?.save?.length}   {savingpost ? 'Saving' : 'Save'}</button>
              }
            </div>
<div className='flex justify-between items-baseline w-full gap-1'>
{
  pin.destination && <>
  <a 
  href={pin?.destination}
  target="_blank"
  rel="norefferer"
  className=' bg-white text-black hover:shadow-md hover:opacity-90 opacity-100 flex gap-2 items-center py-1 px-3 text-sm rounded-full font-extrabold mb-2 justify-start '
  
  
  >
<BsFillArrowUpRightCircleFill/>
<span className='whitespace-nowrap'>{pin?.destination?.length>20 ?pin.destination.slice(8,20) :pin.destination.slice(8)}</span>
  </a>
  {
  (pin.postedBy?._id==user?.sub)?<>
  <button
  type="button"
  className='bg-white  font-bold text-black p-1 hover:shadow-md mr-1 rounded-full opacity-80 hover:opacity-100 '
  onClick={(e) => {
    e.stopPropagation();
    deletePin(pin._id)
  }}
  ><AiTwotoneDelete/></button>
  
  
  </>:""
  }
  </>
}
</div>
          </div>


        }
      </div>
<Link to={`/user-profile/${pin?.postedBy?._id}`} className='flex justify-start items-center gap-2 mt-2'>
<img 
src={pin?.postedBy?.image} 
alt="user-profile"
className='w-8 h-8 rounded-full object-cover'
/>
<p className='font-semibold capitalize'>{pin?.postedBy?.userName}</p>
</Link>
    </div>

  );

}

export default Pin
