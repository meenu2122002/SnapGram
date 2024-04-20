import React from 'react'
import { useState,useEffect } from 'react'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import { feedQuery,searchQuery } from '../utils/data'
import Spinner from './Spinner'
const Search = ({searchTerm}) => {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState('false')
  useEffect(() => {
    if(searchTerm.length){
setLoading(true);
const query=searchQuery(searchTerm.toLowerCase())
client.fetch(query)
.then((data)=>{
  setPins(data);
  setLoading(false)
})
    }
    else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data);
        setLoading(false)
      })
    }
  }, [searchTerm])
  
  return (
   <>
   
   {
    loading && <Spinner message={"Searching for Pins"}/>
   }
   {
    (pins?.length) ? <>
    
    <MasonryLayout pins={pins}/></>:""
   }
   {
    pins?.length===0 && (searchTerm.length!=0) && (!loading) && <>
    <h2 className='text-black text-4xl  mt-6 font-bold bg-secondaryColor h-[80vh] pt-2 w-full rounded-t-lg flex flex-col justify-center items-center'>No Pins Available</h2>
    </>
   }
   </>
  )
}

export default Search
