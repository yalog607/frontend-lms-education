import React, {  } from 'react'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const {logout, isLoggingOut} = useAuth();

  const handleLogOut = () => {
    logout();
  }

  if (isLoggingOut) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-6'>
      <p className='font-bold text-3xl text-pink-500'>Yêu bé Nhiiiiiiiiiiiiiiiiiiii 💝💖</p>
      <p className='font-bold text-2xl text-rose-500'>Vợ iu ngủ ngonnnn</p>
      <button onClick={handleLogOut} className='btn btn-accent font-md text-md text-white'>Logout</button>
    </div>
  )
}

export default Home