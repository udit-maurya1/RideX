import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // Animate location search panel
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  // Animate vehicle selection panel
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  // Animate confirm ride panel
  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      {/* Uber Logo */}
      <img className='w-20 absolute left-5 top-5 z-10' src={logo} alt="Uber" />

      {/* Map background */}
      <div className='h-screen w-screen'>
        <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/G-LkqJvdJWZSp-wRyAgspFfiC3j7gPXQOw0cPRD608Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ja3Jp/ZGVyLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wOC8y/MDIyLXB1cnBsZS1y/b3V0ZS5qcGc"
          alt="Map"
        />
      </div>

      {/* Location / Search Panel container */}
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
            className='absolute opacity-0 top-6 right-6 text-2xl cursor-pointer'
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>
            Find a trip
          </h4>
          <form onSubmit={submitHandler} className='relative'>
            <div className="line absolute h-16 w-1 top-[42%] left-5 bg-gray-800 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 outline-none'
              type="text"
              placeholder='Add a pickup location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 outline-none'
              type="text"
              placeholder='Add your destination'
            />
          </form>
        </div>

        <div ref={panelRef} className='bg-white h-0 overflow-hidden'>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* Vehicle selection panel */}
      <div
        ref={vehiclePanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-lg'
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          selectVehicle={setSelectedVehicle}
        />
      </div>

      {/* Confirm Ride panel */}
      <div
        ref={confirmRidePanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 shadow-lg'
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          selectedVehicle={selectedVehicle}
          pickup={pickup}
          destination={destination}
        />
      </div>
    </div>
  )
}

export default Home
