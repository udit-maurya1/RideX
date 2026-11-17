import React from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmRide = ({
  setConfirmRidePanel,
  setVehicleFound,
  selectedVehicle,
  pickup,
  destination
}) => {
  const navigate = useNavigate()

  const vehicle = selectedVehicle || {
    name: 'UberGo',
    image: 'https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw',
    price: '₹193.20'
  }

  const handleConfirm = () => {
    if (setVehicleFound) setVehicleFound(true)
    if (setConfirmRidePanel) setConfirmRidePanel(false)
    navigate('/riding', {
      state: {
        destination,
        pickup,
        price: vehicle.price,
        vehicleImage: vehicle.image,
        vehicleName: vehicle.name
      }
    })
  }

  return (
    <div>
      <h5
        onClick={() => {
          if (setConfirmRidePanel) setConfirmRidePanel(false)
        }}
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img
          className='h-24'
          src={vehicle.image}
          alt={vehicle.name}
        />

        <div className='w-full mt-4'>
          {/* Pickup Location */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill text-xl text-gray-700"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                {pickup || '562/11-A, Kankariya Talab, Bhopal'}
              </p>
            </div>
          </div>

          {/* Destination Location */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-2-fill text-xl text-gray-700"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                {destination || 'Third Wave Coffee, MP Nagar, Bhopal'}
              </p>
            </div>
          </div>

          {/* Fare / Payment */}
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-xl text-gray-700"></i>
            <div>
              <h3 className='text-lg font-medium'>{vehicle.price}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className='w-full mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition'
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide
