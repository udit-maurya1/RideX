import React from 'react'

const RidePopUp = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride
}) => {
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

  return (
    <div>
      <h5
        onClick={() => {
          if (setRidePopupPanel) setRidePopupPanel(false)
        }}
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold mb-5 text-gray-900'>New Ride Available!</h3>

      {/* User Card */}
      <div className='flex items-center justify-between p-3 bg-yellow-400/90 rounded-2xl mb-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover border-2 border-white shadow'
            src={rideInfo.user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
            alt={userName}
          />
          <div>
            <h4 className='text-lg font-bold text-black'>{userName}</h4>
            <p className='text-xs font-semibold text-gray-800 flex items-center gap-1'>
              <i className="ri-star-fill text-yellow-700"></i> 4.8 Rating
            </p>
          </div>
        </div>
        <div className='text-right bg-white px-3 py-1.5 rounded-xl shadow-sm'>
          <h4 className='text-sm font-bold text-gray-900'>{rideInfo.distance}</h4>
          <p className='text-[10px] text-gray-500 font-semibold uppercase'>Pickup distance</p>
        </div>
      </div>

      {/* Trip Information */}
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

      {/* Action Buttons */}
      <div className='flex items-center justify-between gap-4 mt-6'>
        <button
          onClick={() => {
            if (setRidePopupPanel) setRidePopupPanel(false)
          }}
          className='w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition'
        >
          Ignore
        </button>

        <button
          onClick={() => {
            if (setConfirmRidePopupPanel) setConfirmRidePopupPanel(true)
            if (setRidePopupPanel) setRidePopupPanel(false)
          }}
          className='w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition'
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
