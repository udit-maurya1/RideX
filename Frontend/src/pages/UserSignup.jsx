import logo from '../assets/logo.png'
import React, { useState ,useContext  } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
    const { user, setUser } = useContext(UserDataContext)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname
      },
      email: formData.email,
      password: formData.password,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201 || response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/Home')
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }

    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-7">

      {/* Uber Logo */}
      <div>
        <img
          className="w-20 mb-8"
          src={logo}
          alt="Uber"
        />

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>

          <h3 className="text-2xl font-semibold mb-5">
            Create your account
          </h3>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              First Name
            </label>

            <input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="bg-[#eeeeee] rounded px-4 py-3 border w-full text-lg placeholder:text-base outline-none focus:border-black"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Last Name
            </label>

            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="bg-[#eeeeee] rounded px-4 py-3 border w-full text-lg placeholder:text-base outline-none focus:border-black"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#eeeeee] rounded px-4 py-3 border w-full text-lg placeholder:text-base outline-none focus:border-black"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-full text-lg placeholder:text-base outline-none focus:border-black"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="bg-black text-white font-semibold rounded px-4 py-3 w-full text-lg hover:bg-gray-800 transition"
          >
            Create Account
          </button>

        </form>

        {/* Captain Signup Link */}
        <p className="text-center mt-5 text-sm">
          Want to become a captain?{' '}
          <Link
            to="/captain-signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register as Captain
          </Link>
        </p>

      </div>

      {/* Login Link */}
      <div className="mt-8">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

    </div>
  )
}

export default UserSignup
