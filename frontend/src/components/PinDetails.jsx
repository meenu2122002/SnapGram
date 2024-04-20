import React from 'react'
import { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid"
import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data"
import Spinner from './Spinner'

const PinDetails = ({ user }) => {
  const [pins, setPins] = useState(null)
  const [pindetails, setpindetails] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()


  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          setpindetails(data[0]);
          if (data[0]) {
            query = pinDetailMorePinQuery(data[0])
            client.fetch(query).
              then((res) => {
                setPins(res)
              })
          }
        })
    }
  }
  const addComment=(e)=>{
    if(comment){
      e.target.style.backgroundColor="green";
      setAddingComment(true)
      client.patch(pinId)
      .setIfMissing({comments:[]})
      .insert('after','comments[-1]',[
        {
          comment,
          _key:uuidv4(),
          postedBy:{
            _type:'posted',
            _ref:user?._id

          }
        }
      ])
      .commit()
      .then(()=>{
        fetchPinDetails();
        setComment('');
        setAddingComment(false)
      })
    }
  }
  useEffect(() => {
    fetchPinDetails();
  }, [])

  if (!pindetails)
    return <Spinner message={"Loading pin-Details"} />

  return (
    <>
    
    <div className='flex flex-col  m-auto bg-white' style={{ borderRadius: "32px", maxWidth: "1500px" }}>

      <div className='flex justify-center items-center md:items-start flex-initial'>

        <img
          src={pindetails?.image && urlFor(pindetails.image).url()}
          alt=""
          className='rounded-t-3xl rounded-b-lg'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex justify-between items-center'>
          <a href={`${pindetails.image?.asset?.url}?dl=`}
            download
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-2xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
          >
            <MdDownloadForOffline />

          </a>
          <a
            href={pindetails?.destination}
            target='_blank'
            rel="norefferer"
          >{pindetails?.destination}</a>

        </div>
        <div>
          <h1 className='text-4xl  font-bold mt-3 break-words'>
            {pindetails?.title}
          </h1>
          <h1 className='mt-3'>
            {pindetails?.about}
          </h1>
        </div>
        <Link to={`/user-profile/${pindetails?.postedBy?._id}`} className='flex justify-start items-center gap-2 mt-4'>
          <img
            src={pindetails?.postedBy?.image}
            alt="user-profile"
            className='w-8 h-8 rounded-full object-cover'
          />
          <p className='font-semibold capitalize'>{pindetails?.postedBy?.userName}</p>
        </Link>
        <h2 className='text-2xl mt-5'>Comments</h2>
        <div className='max-h-370 overflow-y-auto pt-5'>
          {
            pindetails?.comments?.map((comment, i) => {
              return <>
                <div className='flex gap-2 w-full '>
                  <img
                    src={comment?.postedBy?.image}
                    alt="user-profile"
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                  <div className='flex flex-col w-full border-2 border-gray-400 border-solid p-2 justify-center rounded-t-lg' >
                    <p className='font-bold bg-secondaryColor w-full rounded-lg p-2 '>{comment?.postedBy?.userName}</p>
                    <p className='mt-2'>{comment.comment}</p>
                  </div>
                </div>
              </>
            })
          }
        </div>
        <div className='flex flex-wrap mt-6 gap-3'>
        <Link to={`/user-profile/${pindetails?.postedBy?._id}`} className='flex justify-start  gap-2 mt-4'>
          <img
            src={pindetails?.postedBy?.image}
            alt="user-profile"
            className='w-10 h-10 rounded-full object-cover'
          />
         
        </Link>
        <textarea
        type="text"
        className='flex-1 border-gray-100 outline-none border-2 rounded-2xl focus:border-gray-300 p-1'
        placeholder='Add a comment'
        onChange={(e)=>{
          setComment(e.target.value)
        }}
        
        />

        </div>
        <div className='flex justify-end items-center mt-4'>
        <button
        type="button"
        className='py-2 px-3 rounded-full bg-red-500 text-white '
        onClick={(e)=>{
        addComment();
        }}
        >
{addingComment ? 'Posting the comment' :"Post"}

</button>
        </div>
     
      </div>
    </div>
    {console.log(pins)}
    { 
      (pins?.length>0) ?<>
      <h2 className='text-center font-bold text-2xl mt-8'>More like this</h2>
<MasonryLayout pins={pins}/>

      </>:<Spinner message={"Loading More like this" } />
    }
    </>




  )
}

export default PinDetails
