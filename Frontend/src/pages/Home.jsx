import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const home = () => {
  return (
    <div>
        <div className='h-screen bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)] flex pt-8 justify-between flex-col w-full bg-red-400'>
          <img className='w-16 ml-8' src={logo} alt="" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className='flex intems-center justify-center w-full bg-black text-white py-3 rounded mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default home