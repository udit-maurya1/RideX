import React from 'react'
import { useNavigate } from 'react-router-dom'

const FinishRide = ({
  setFinishRidePanel,
  ride
}) => {
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

  const handleCompleteRide = () => {
    alert('Ride completed! Payment collected.')
    if (setFinishRidePanel) setFinishRidePanel(false)
    navigate('/captain-home')
  }

  return (
    <div>
      <h5
        onClick={() => {
          if (setFinishRidePanel) setFinishRidePanel(false)
        }}
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold mb-5 text-gray-900'>Finish this Ride</h3>

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
            <p className='text-xs font-semibold text-gray-800'>Completed Trip</p>
          </div>
        </div>
        <div className='text-right bg-white px-3 py-1.5 rounded-xl shadow-sm'>
          <h4 className='text-sm font-bold text-gray-900'>{rideInfo.distance}</h4>
          <p className='text-[10px] text-gray-500 font-semibold uppercase'>Total Trip</p>
        </div>
      </div>

      {/* Trip Information */}
      <div className='w-full'>
        {/* Destination */}
        <div className='flex items-center gap-4 py-3 border-b'>
          <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0'>
            <i className="ri-map-pin-2-fill text-xl text-black"></i>
          </div>
          <div>
            <h4 className='text-xs uppercase font-bold text-gray-400'>Destination Reached</h4>
            <p className='text-sm font-medium text-gray-800 -mt-0.5'>{rideInfo.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className='flex items-center gap-4 py-3'>
          <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0'>
            <i className="ri-currency-line text-xl text-black"></i>
          </div>
          <div>
            <h4 className='text-xs uppercase font-bold text-gray-400'>Collect Cash</h4>
            <p className='text-xl font-bold text-green-700 -mt-0.5'>{rideInfo.fare}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCompleteRide}
        className='w-full mt-6 bg-green-600 hover:bg-green-700 active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl shadow-lg transition'
      >
        Complete Ride & Collect Cash
      </button>
    </div>
  )
}

export default FinishRide
