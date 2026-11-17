import React from 'react'

const VehiclePanel = ({
  setVehiclePanel,
  setConfirmRidePanel,
  selectVehicle,
  setVehicleType
}) => {
  const vehicleList = [
    {
      type: 'car',
      name: 'UberGo',
      image: 'https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw',
      capacity: 4,
      time: '2 mins away',
      desc: 'Affordable, compact rides',
      price: '₹193.20'
    },
    {
      type: 'moto',
      name: 'Moto',
      image: 'https://imgs.search.brave.com/xmYtO-4rEFGcxoEyB7VpAIPgQ0toFLQqQZgHhA32TfY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jbi1n/ZW8xLnViZXIuY29t/L2ltYWdlLXByb2Mv/Y3JvcC9yZXNpemVj/cm9wL3VkYW0vZm9y/bWF0PWF1dG8vd2lk/dGg9NTUyL2hlaWdo/dD0zNjgvc3JjYjY0/PWFIUjBjSE02THk5/MFlpMXpkR0YwYVdN/dWRXSmxjaTVqYjIw/dmNISnZaQzkxWkdG/dExXRnpjMlYwY3k5/bFpqQTVOVGhpWkMx/a05ETXdMVFExWldZ/dFltVTJZaTB6WW1a/aVkySm1NRFl5WmpZ/dWNHNW4',
      capacity: 1,
      time: '3 mins away',
      desc: 'Affordable motorcycle rides',
      price: '₹65.17'
    },
    {
      type: 'auto',
      name: 'UberAuto',
      image: 'https://imgs.search.brave.com/B75tLu8wg9zh8BDC1E6wCZUfkVU0HTJmBuymc-GCDzQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9hdXRvLWlj/b24tc3ZnLWRvd25s/b2FkLXBuZy00NDk0/OTc5LnBuZz9mPXdl/YnAmdz0xMjg',
      capacity: 3,
      time: '3 mins away',
      desc: 'Affordable auto rides',
      price: '₹118.86'
    }
  ]

  const handleSelect = (vehicle) => {
    if (selectVehicle) selectVehicle(vehicle)
    if (setVehicleType) setVehicleType(vehicle)
    if (setConfirmRidePanel) setConfirmRidePanel(true)
    if (setVehiclePanel) setVehiclePanel(false)
  }

  return (
    <div>
      <h5
        onClick={() => {
          if (setVehiclePanel) setVehiclePanel(false)
        }}
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

      {vehicleList.map((vehicle, idx) => (
        <div
          key={idx}
          onClick={() => handleSelect(vehicle)}
          className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer hover:bg-gray-50 transition'
        >
          <img
            className='h-10'
            src={vehicle.image}
            alt={vehicle.name}
          />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>
              {vehicle.name}{' '}
              <span className='text-sm text-gray-700 ml-1'>
                <i className="ri-user-3-fill"></i> {vehicle.capacity}
              </span>
            </h4>
            <h5 className='font-medium text-sm text-gray-700'>{vehicle.time}</h5>
            <p className='font-normal text-xs text-gray-500'>{vehicle.desc}</p>
          </div>
          <h2 className='text-lg font-semibold'>{vehicle.price}</h2>
        </div>
      ))}
    </div>
  )
}

export default VehiclePanel
