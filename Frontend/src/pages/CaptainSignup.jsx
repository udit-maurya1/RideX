
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const CaptainSignup = () => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    color: '',
    plate: '',
    capacity: '',
    vehicleType: 'car'
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const captainData = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.color,
        plate: formData.plate,
        capacity: Number(formData.capacity),
        vehicleType: formData.vehicleType
      }
    }

    console.log(captainData)

    // Connect your captain registration API here
  }

  const inputStyle =
    "bg-[#eeeeee] rounded px-4 py-3 w-full text-base outline-none border border-transparent focus:border-black"

  return (
    <div className="min-h-screen flex flex-col justify-between p-7">

      <div className="w-full max-w-md mx-auto">

        {/* Uber Logo */}
        <img
          className="w-20 mb-8"
          src={logo}
          alt="Uber"
        />

        <form onSubmit={handleSubmit}>

          <h2 className="text-2xl font-bold mb-6">
            Become an Uber Captain
          </h2>

          {/* Name */}
          <h3 className="text-lg font-semibold mb-3">
            What's your name?
          </h3>

          <div className="flex gap-3 mb-5">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className={inputStyle}
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Email */}
          <h3 className="text-lg font-semibold mb-3">
            What's your email?
          </h3>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`${inputStyle} mb-5`}
          />

          {/* Password */}
          <h3 className="text-lg font-semibold mb-3">
            Create a password
          </h3>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
            className={`${inputStyle} mb-6`}
          />

          {/* Vehicle Details */}
          <h3 className="text-xl font-bold mb-4">
            Vehicle Information
          </h3>

          {/* Vehicle Color and Plate */}
          <div className="flex gap-3 mb-4">
            <div className="w-1/2">
              <label className="block font-medium mb-2">
                Vehicle Color
              </label>

              <input
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>

            <div className="w-1/2">
              <label className="block font-medium mb-2">
                Vehicle Plate
              </label>

              <input
                type="text"
                name="plate"
                placeholder="UP32AB1234"
                value={formData.plate}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
          </div>

          {/* Vehicle Capacity */}
          <div className="mb-4">
            <label className="block font-medium mb-2">
              Vehicle Capacity
            </label>

            <input
              type="number"
              name="capacity"
              placeholder="Number of passengers"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              required
              className={inputStyle}
            />
          </div>

          {/* Vehicle Type */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Vehicle Type
            </label>

            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
              className={inputStyle}
            >
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
              <option value="car">Car</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition"
          >
            Create Captain Account
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center mt-5 text-sm">
          Already have an account?{' '}
          <Link
            to="/captain-login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>

      {/* User Signup Link */}
      <div className="max-w-md mx-auto w-full mt-10">
        <Link
          to="/signup"
          className="block text-center bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
        >
          Sign up as User
        </Link>
      </div>

    </div>
  )
}

export default CaptainSignup
