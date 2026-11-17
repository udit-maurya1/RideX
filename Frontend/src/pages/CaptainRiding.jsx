import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import logo from '../assets/logo.png'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const carMarkerRef = useRef(null)

  const location = useLocation()
  const tripData = location.state?.ride || {
    user: {
      fullname: { firstname: 'Harshita', lastname: 'Sharma' },
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    distance: '4 KM',
    pickup: '562/11-A, Kankariya Talab, Bhopal',
    destination: 'Third Wave Coffee, MP Nagar, Bhopal',
    fare: '₹193.20'
  }

  // Smooth car animation on map
  useGSAP(() => {
    gsap.to(carMarkerRef.current, {
      x: 150,
      y: 90,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  })

  // GSAP animation for Finish Ride panel
  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen relative overflow-hidden flex flex-col justify-between'>
      {/* Floating Header Actions */}
      <img className='w-16 absolute left-5 top-5 z-10' src={logo} alt="Uber" />

      <Link
        to='/captain-home'
        className='fixed right-4 top-4 h-10 w-10 bg-white shadow-lg flex items-center justify-center rounded-full z-20 hover:bg-gray-100 transition'
        title="Captain Dashboard"
      >
        <i className="text-xl font-medium ri-home-5-line text-gray-800"></i>
      </Link>

      {/* Live Status Badge */}
      <div className='fixed top-5 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg'>
        <span className='w-2 h-2 rounded-full bg-green-400 animate-ping'></span>
        <span>Navigating to Destination</span>
      </div>

      {/* Map View */}
      <div className='h-4/5 w-full relative overflow-hidden bg-gray-200'>
        <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/G-LkqJvdJWZSp-wRyAgspFfiC3j7gPXQOw0cPRD608Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ja3Jp/ZGVyLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wOC8y/MDIyLXB1cnBsZS1y/b3V0ZS5qcGc"
          alt="Navigation Map"
        />

        {/* Animated Moving Vehicle Marker */}
        <div
          ref={carMarkerRef}
          className='absolute top-[35%] left-[25%] z-10 flex flex-col items-center pointer-events-none'
        >
          <div className='bg-black text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md mb-1 whitespace-nowrap flex items-center gap-1'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-400'></span>
            Driving with Passenger
          </div>
          <div className='w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-black animate-pulse'>
            <i className="ri-car-fill text-2xl text-black"></i>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        onClick={() => setFinishRidePanel(true)}
        className='h-1/5 p-6 bg-yellow-400 flex items-center justify-between shadow-2xl relative cursor-pointer'
      >
        <h5 className='p-1 text-center w-[90%] absolute top-0 text-gray-700'>
          <i className="text-2xl ri-arrow-up-wide-line"></i>
        </h5>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-black text-white flex items-center justify-center'>
            <i className="ri-map-pin-2-fill text-2xl"></i>
          </div>
          <div>
            <h4 className='text-xl font-bold text-black'>4 KM away</h4>
            <p className='text-xs font-semibold text-gray-800 -mt-0.5'>Tap to complete ride</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setFinishRidePanel(true)
          }}
          className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition'
        >
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Sliding Panel */}
      <div
        ref={finishRidePanelRef}
        className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-4 py-8 pt-10 shadow-2xl rounded-t-3xl'
      >
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          ride={tripData}
        />
      </div>
    </div>
  )
}

export default CaptainRiding
