import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import logo from '../assets/logo.png'

const Riding = () => {
  const carMarkerRef = useRef(null)
  const location = useLocation()
  const rideData = location.state || {}

  // Smooth car moving animation on the map route
  useGSAP(() => {
    gsap.to(carMarkerRef.current, {
      x: 140,
      y: 90,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  })

  return (
    <div className='h-screen flex flex-col justify-between relative overflow-hidden'>
      {/* Floating Header Actions */}
      <img className='w-16 absolute left-5 top-5 z-10' src={logo} alt="Uber" />

      <Link
        to='/Home'
        className='fixed right-4 top-4 h-10 w-10 bg-white shadow-lg flex items-center justify-center rounded-full z-20 hover:bg-gray-100 transition'
        title="Go to Home"
      >
        <i className="text-xl font-medium ri-home-5-line text-gray-800"></i>
      </Link>

      {/* Live Status Badge */}
      <div className='fixed top-5 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg'>
        <span className='w-2 h-2 rounded-full bg-green-400 animate-ping'></span>
        <span>Trip in Progress</span>
      </div>

      {/* Top Half: Interactive Map with moving car */}
      <div className='h-1/2 w-full relative overflow-hidden bg-gray-200'>
        <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/G-LkqJvdJWZSp-wRyAgspFfiC3j7gPXQOw0cPRD608Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ja3Jp/ZGVyLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wOC8y/MDIyLXB1cnBsZS1y/b3V0ZS5qcGc"
          alt="Live Map"
        />

        {/* Animated Moving Vehicle Marker */}
        <div
          ref={carMarkerRef}
          className='absolute top-[32%] left-[28%] z-10 flex flex-col items-center pointer-events-none'
        >
          <div className='bg-black text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md mb-1 whitespace-nowrap flex items-center gap-1'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-400'></span>
            You are here
          </div>
          <div className='w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-black animate-pulse'>
            <i className="ri-car-fill text-2xl text-black"></i>
          </div>
        </div>
      </div>

      {/* Bottom Half: Driver & Ride Details */}
      <div className='h-1/2 p-5 bg-white flex flex-col justify-between shadow-2xl rounded-t-3xl -mt-4 z-10'>
        {/* Driver info & Car Preview */}
        <div className='flex items-center justify-between border-b pb-4'>
          <img
            className='h-16'
            src={rideData.vehicleImage || "https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw"}
            alt="Vehicle"
          />
          <div className='text-right'>
            <h2 className='text-lg font-semibold capitalize text-gray-800'>
              {rideData.driverName || 'Sarthak'}
            </h2>
            <h4 className='text-xl font-bold -mt-1 -mb-1 text-black'>
              {rideData.plateNumber || 'MP04 AB 1234'}
            </h4>
            <p className='text-sm text-gray-600 font-medium'>
              {rideData.vehicleModel || 'Maruti Suzuki Alto'}
            </p>
            <div className='flex items-center justify-end gap-1 text-xs text-yellow-600 font-semibold mt-0.5'>
              <i className="ri-star-fill text-yellow-500"></i>
              <span>4.9</span>
            </div>
          </div>
        </div>

        {/* Trip details */}
        <div className='w-full'>
          {/* Destination */}
          <div className='flex items-center gap-4 py-3 border-b'>
            <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
              <i className="ri-map-pin-2-fill text-xl text-black"></i>
            </div>
            <div>
              <h3 className='text-base font-semibold text-gray-800'>Destination</h3>
              <p className='text-sm text-gray-600 -mt-0.5'>
                {rideData.destination || 'Third Wave Coffee, MP Nagar, Bhopal'}
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className='flex items-center gap-4 py-3'>
            <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
              <i className="ri-currency-line text-xl text-black"></i>
            </div>
            <div>
              <h3 className='text-base font-semibold text-gray-800'>
                {rideData.price || '₹193.20'}
              </h3>
              <p className='text-sm text-gray-600 -mt-0.5'>Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Make Payment button */}
        <button
          onClick={() => alert('Payment completed successfully!')}
          className='w-full bg-green-600 hover:bg-green-700 active:scale-[0.99] text-white font-semibold py-3 rounded-xl shadow-md transition'
        >
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding
