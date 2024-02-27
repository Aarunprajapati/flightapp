"use client"
import React from 'react'
import CustomButton from '../CustomButton'
import Fligtdetailsbtn from './fligt-details-btn'

const Flightdata = () => {
  return (
    <div className='  border-2 border-gray-200 p-6'>

      <div className='flex gap-2 justify-between items-center'>

        <div className='flex gap-2 '>
            <div className='py-1'><img className='w-8   h-8' src="flight.svg" alt="flight" /></div>
            <div className='grid '>
            <p className=' text-base'>IndiGo</p>
            <p className=' text-xs'>6E-5235</p>
            </div>
        </div>

        <div className=' text-lg  '>12:45</div>

        <div className=' relative grid text-xs'>
        <p className=' ms-4'>8h 20m</p>
        <p className='w-20  h-1  bg-neutral-400'></p>
        <p className='ms-4'>1 stop </p>
        </div>

        <div className=' text-lg '>21:45 </div>

        <div>
            <p className=' font-bold'>₹6,567</p>
        </div>

          <div className=''> <CustomButton className='px-6  py-2 rounded-md text-md bg-orange-500 text-white' label='Book'/> </div> 

      </div>
     <div className=''>
        <Fligtdetailsbtn/>
       </div>
    </div>
  )
}

export default Flightdata
