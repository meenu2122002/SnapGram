import React from 'react'
import Loader from "react-loader-spinner"




const Spinner = ({message}) => {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col text-gray-400'>
     <Loader
     type="Circles"
     color="#00BFFF"
     height={"50px"}
     width="200px"
     className="m-5"


     />
     <p>{message}</p>
    </div>
  )
}

export default Spinner
