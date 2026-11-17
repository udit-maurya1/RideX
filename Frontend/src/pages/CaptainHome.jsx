import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import logo from '../assets/logo.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [currentRide, setCurrentRide] = useState(null)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  // GSAP animation for Ride Request Popup
  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  // GSAP animation for Confirm Ride (OTP) Popup
  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  const handleSimulateRequest = () => {
    setCurrentRide({
      user: {
        fullname: { firstname: 'Harshita', lastname: 'Sharma' },
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },
      distance: '2.2 KM',
      pickup: '562/11-A, Kankariya Talab, Bhopal',
      destination: 'Third Wave Coffee, MP Nagar, Bhopal',
      fare: '₹193.20'
    })
    setRidePopupPanel(true)
  }

  return (
    <div className='h-screen relative overflow-hidden flex flex-col justify-between'>
      {/* Top Floating Header */}
      <img className='w-16 absolute left-5 top-5 z-10' src={logo} alt="Uber" />

      <div className='fixed right-4 top-4 z-10 flex items-center gap-2'>
        <button
          onClick={handleSimulateRequest}
          className='bg-black/80 hover:bg-black text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 transition'
          title="Simulate incoming ride request"
        >
          <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></span>
          <span>Test Ride Request</span>
        </button>

        <Link
          to='/captain-login'
          onClick={() => localStorage.removeItem('token')}
          className='h-10 w-10 bg-white shadow-lg flex items-center justify-center rounded-full hover:bg-gray-100 transition'
          title="Logout"
        >
          <i className="text-xl font-medium ri-logout-box-r-line text-gray-800"></i>
        </Link>
      </div>

      {/* Top 60%: Map Background */}
      <div className='h-3/5 w-full relative'>
        <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/G-LkqJvdJWZSp-wRyAgspFfiC3j7gPXQOw0cPRD608Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ja3Jp/ZGVyLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wOC8y/MDIyLXB1cnBsZS1y/b3V0ZS5qcGc"
          alt="Captain Map"
        />
      </div>

      {/* Bottom 40%: Captain Profile & Stats */}
      <div className='h-2/5 p-6 bg-white shadow-2xl rounded-t-3xl -mt-6 z-10 flex flex-col justify-between'>
        <CaptainDetails />
      </div>

      {/* Ride Request PopUp */}
      <div
        ref={ridePopupPanelRef}
        className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-4 py-8 pt-10 shadow-2xl rounded-t-3xl'
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          ride={currentRide}
        />
      </div>

      {/* Confirm Ride / OTP PopUp */}
      <div
        ref={confirmRidePopupPanelRef}
        className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-4 py-8 pt-10 shadow-2xl rounded-t-3xl h-screen'
      >
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
          ride={currentRide}
        />
      </div>
    </div>
  )
}

export default CaptainHome
