import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  const captainName = captain?.fullname
    ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}`.trim()
    : 'Harsh Patel'

  return (
    <div>
      {/* Profile & Earnings Summary */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover border-2 border-black'
            src="https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw"
            alt="Captain"
          />
          <div>
            <h4 className='text-lg font-semibold capitalize'>{captainName}</h4>
            <p className='text-xs text-gray-500 font-medium flex items-center gap-1'>
              <span className='w-2 h-2 rounded-full bg-green-500 inline-block'></span>
              Online & Ready
            </p>
          </div>
        </div>
        <div className='text-right'>
          <h4 className='text-xl font-bold text-gray-900'>₹295.20</h4>
          <p className='text-xs text-gray-500 font-medium'>Earned Today</p>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className='flex p-4 mt-6 bg-gray-50 rounded-2xl justify-between items-center text-center shadow-inner'>
        <div className='flex-1 border-r border-gray-200 pr-2'>
          <div className='w-10 h-10 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1'>
            <i className="text-xl ri-timer-2-line"></i>
          </div>
          <h5 className='text-base font-bold text-gray-800'>10.2</h5>
          <p className='text-[10px] text-gray-500 font-semibold uppercase tracking-wider'>Hours Online</p>
        </div>

        <div className='flex-1 border-r border-gray-200 px-2'>
          <div className='w-10 h-10 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-1'>
            <i className="text-xl ri-speed-up-line"></i>
          </div>
          <h5 className='text-base font-bold text-gray-800'>30 KM</h5>
          <p className='text-[10px] text-gray-500 font-semibold uppercase tracking-wider'>Distance</p>
        </div>

        <div className='flex-1 pl-2'>
          <div className='w-10 h-10 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-1'>
            <i className="text-xl ri-booklet-line"></i>
          </div>
          <h5 className='text-base font-bold text-gray-800'>20</h5>
          <p className='text-[10px] text-gray-500 font-semibold uppercase tracking-wider'>Total Jobs</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
