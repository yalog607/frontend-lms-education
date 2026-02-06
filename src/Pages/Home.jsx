import React, {  } from 'react'
import Sidebar from "../Components/Sidebar"

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen gap-0 justify-between'>
      <Sidebar />
      <div className='flex grow bg-base-200 p-4'>
        <h1>Yeu nhi</h1>
      </div>
    </div>
  )
}

export default Home