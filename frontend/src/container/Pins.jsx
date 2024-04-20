import React from 'react'
import { useState } from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import { Navbar,Feed,Search,CreatePin,PinDetails } from '../components'
const Pins = ({user}) => {
  const [searchTerm, setsearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
     <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm} user={user}/>
<div className='h-full'>
  <Routes>

<Route path="/" element={<Feed/>}/>
<Route path="/category/:categoryId" element={<Feed/>}/>
<Route path="/pin-detail/:pinId" element={<PinDetails user={user}/>}/>
<Route path="/create-pin" element={<CreatePin user={user}/>}/>
<Route path="/search" element={<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>}/>
  </Routes>
</div>
    </div>
  )
}

export default Pins
