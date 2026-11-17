import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({
  setConfirmRidePopupPanel,
  setRidePopupPanel,
  ride
}) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const rideInfo = ride || {
    user: {
      fullname: { firstname: 'Harshita', lastname: 'Sharma' },
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    distance: '2.2 KM',
    pickup: '562/11-A, Kankariya Talab, Bhopal',
    destination: 'Third Wave Coffee, MP Nagar, Bhopal',
    fare: '₹193.20'
  }

  const userName = rideInfo.user?.fullname
    ? `${rideInfo.user.fullname.firstname} ${rideInfo.user.fullname.lastname || ''}`.trim()
    : 'Passenger'

  const submitHandler = (e) => {
    e.preventDefault()
    if (!otp || otp.length < 4) {
      alert('Please enter a valid 4-digit OTP from passenger')
      return
    }

    if (setConfirmRidePopupPanel) setConfirmRidePopupPanel(false)
    if (setRidePopupPanel) setRidePopupPanel(false)

    // Navigate to captain riding page with trip state
    navigate('/captain-riding', {
      state: {
        ride: rideInfo,
        otp
      }
    })
  }

  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <h5
          onClick={() => {
            if (setConfirmRidePopupPanel) setConfirmRidePopupPanel(false)
          }}
          className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
        >
          <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-bold mb-5 text-gray-900'>Confirm Ride to Start</h3>

        {/* Passenger Card */}
        <div className='flex items-center justify-between p-3 bg-yellow-400/90 rounded-2xl mb-4 shadow-sm'>
          <div className='flex items-center gap-3'>
            <img
              className='h-12 w-12 rounded-full object-cover border-2 border-white shadow'
              src={rideInfo.user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
              alt={userName}
            />
            <div>
              <h4 className='text-lg font-bold text-black'>{userName}</h4>
              <p className='text-xs font-semibold text-gray-800'>Verified Passenger</p>
            </div>
          </div>
          <div className='text-right bg-white px-3 py-1.5 rounded-xl shadow-sm'>
            <h4 className='text-sm font-bold text-gray-900'>{rideInfo.distance}</h4>
            <p className='text-[10px] text-gray-500 font-semibold uppercase'>Distance</p>
          </div>
        </div>

        {/* Trip details */}
        <div className='w-full'>
          {/* Pickup */}
          <div className='flex items-center gap-4 py-3 border-b'>
            <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0'>
              <i className="ri-map-pin-user-fill text-xl text-black"></i>
            </div>
            <div>
              <h4 className='text-xs uppercase font-bold text-gray-400'>Pickup Location</h4>
              <p className='text-sm font-medium text-gray-800 -mt-0.5'>{rideInfo.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className='flex items-center gap-4 py-3 border-b'>
            <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0'>
              <i className="ri-map-pin-2-fill text-xl text-black"></i>
            </div>
            <div>
              <h4 className='text-xs uppercase font-bold text-gray-400'>Destination</h4>
              <p className='text-sm font-medium text-gray-800 -mt-0.5'>{rideInfo.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className='flex items-center gap-4 py-3'>
            <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0'>
              <i className="ri-currency-line text-xl text-black"></i>
            </div>
            <div>
              <h4 className='text-xs uppercase font-bold text-gray-400'>Fare / Payment</h4>
              <p className='text-base font-bold text-gray-900 -mt-0.5'>{rideInfo.fare} <span className='text-xs font-normal text-gray-500'>(Cash Payment)</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Form & Actions */}
      <div className='mt-6 pt-4 border-t'>
        <form onSubmit={submitHandler}>
          <label className='block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider text-center'>
            Ask Passenger for 4-Digit OTP
          </label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            placeholder="Enter 4-digit OTP (e.g. 1234)"
            maxLength={4}
            className='bg-[#eee] px-4 py-3 text-lg font-mono tracking-widest text-center rounded-xl w-full outline-none border border-gray-300 focus:border-black mb-4'
            required
          />

          <div className='flex items-center justify-between gap-4'>
            <button
              type="button"
              onClick={() => {
                if (setConfirmRidePopupPanel) setConfirmRidePopupPanel(false)
                if (setRidePopupPanel) setRidePopupPanel(false)
              }}
              className='w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition'
            >
              Cancel
            </button>

            <button
              type="submit"
              className='w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition'
            >
              Start Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
