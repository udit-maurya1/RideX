import React from 'react'
import logo from '../assets/logo.png'

import { useState } from 'react'
import { Link } from 'react-router-dom'
const CaptainLogin = () => {
   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
  
  
    const submitHandler =(e)=>{
      e.preventDefault()
      setCaptainData({
        email:email,
        password:password
      })
  setEmail('')
  setPassword('')
  
  }
  return (
   <div className='p-5 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src={logo} alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>what's your email</h3>
        <input className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base'required type="email" value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        name="" id="" placeholder='enter your email'/>
        <h3 className='text-lg font-medium mb-2'>Enter password</h3>
        <input className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        name="" id="" placeholder='password'/>
        <button
        className='bg-[#111] text-white font-semibold mb-2  rounded px-4 py-2  w-full text-lg placeholder:text-base'
        >login</button>
      </form>
        <p className='text-center'>join Uber <Link to='/captain-signup' className='text-blue-600'>Register as captain</Link></p>

      </div>
      <div>
        <Link to='/login'
       className='bg-[#111] flex items-center justify-center text-white font-semibold mb-7  rounded px-4 py-2  w-full text-lg placeholder:text-base'
        >
          Sign in as a User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin