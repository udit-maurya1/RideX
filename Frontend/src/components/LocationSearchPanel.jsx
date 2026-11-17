import React from 'react'

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
  const locations = [
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "34A, Near Sharma's chai, Malviya Nagar, Bhopal",
    "12C, Near Verma's bakery, MP Nagar, Bhopal",
    "56D, Near Singh's gym, Arera Colony, Bhopal"
  ]

  const handleLocationClick = () => {
    if (setVehiclePanel) setVehiclePanel(true)
    if (setPanelOpen) setPanelOpen(false)
  }

  return (
    <div>
      {locations.map((elem, idx) => (
        <div
          key={idx}
          onClick={handleLocationClick}
          className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50 transition'
        >
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
