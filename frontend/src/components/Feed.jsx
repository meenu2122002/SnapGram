import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {client} from "../client"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import { searchQuery,feedQuery } from '../utils/data'




const Feed = () => {
  const [loading, setloading] = useState(false)
  const {categoryId}=useParams()
  const [pins, setPins] = useState([])
  useEffect(() => {
  setloading(true)
    if(categoryId){
      const query = searchQuery(categoryId.charAt(0).toUpperCase()+categoryId.slice(1))
      
      client.fetch(query).then(data => {
        console.log("SEARCHQUERY",data)
        setPins(data)
        setloading(false)
      })
    }
    else{
     
      client.fetch(feedQuery).then(data => {
        console.log("FeedQUERY",data)
        setPins(data)
        setloading(false)
      })
    }
  
    
  }, [categoryId])
  
  if(loading)
  return <Spinner message="We are Adding New ideas to your Pins"/>
  return (
    <div>
    {
      (pins.length)?<MasonryLayout pins={pins}/>:<>
      <h2 className='text-black text-4xl  mt-6 font-bold bg-secondaryColor h-[80vh] pt-2 w-full rounded-t-lg flex flex-col justify-center items-center'>No Pins Available</h2>
      </>
    }
    </div>
  )
}

export default Feed
