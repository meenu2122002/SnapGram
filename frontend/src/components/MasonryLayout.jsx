import React from 'react'
import Masonry from "react-masonry-css";
import Pin from "./Pin"


const BreakpointOptions={
  default:4,
  3000:6,
  2000:5,
  1200:3,
  1000:2,
  500:1
}
const MasonryLayout = ({pins}) => {
  console.log("pins",pins)
  return (
    <div>
     <Masonry className='flex animate-slide-fwd' breakpointCols={BreakpointOptions}>
{
  pins?.map((pin,i)=>{
    return <>
    <Pin key={i} pin={pin} className="w-max"/>
    </>
  })
}

     </Masonry>

    </div>
  )
}

export default MasonryLayout
