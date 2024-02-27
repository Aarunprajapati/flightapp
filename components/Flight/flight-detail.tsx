"use client"
import { Clock5 } from 'lucide-react'
import React from 'react'

const Flightdetail = () => {
  return (
    <div  className='  border-2 border-gray-200  '>
       <div className='flex border-b-2 border-gray-200 p-4'>
        <div className='text-xs flex gap-2'>
            <p className=' font-semibold'>Jaipur → Goa </p>
            <p> Thu, 29 Feb</p>
        </div>
        <div>

        </div>
       </div>


       <div className='flex  gap-6 items-center p-8'>

        <div className='grid -mb-3 '>
            <div className=''><img className='w-6 h-6' src="flight.svg" alt="flight" /></div>
            <div className=''>
            <p className='my-2 text-xs'>IndiGo</p>
            <p className=' text-xs'>6E-5235</p>
            <p className=' text-xs'>Economy</p> 
            </div>
        </div>

        <div className='grid '> 
            <p className='text-lg font-bold'>JAI 12:45</p>
            <p className=' text-xs'>Thu, 29 Feb 2024</p>
            <p className='my-2 text-xs'>Sanganeer,Terminal2</p> 
        </div>

        <div className='grid -mt-5' >
          <Clock5/>
          <p className=' text-xs'>1:45</p>
        </div>

        <div className='grid '> 
            <p className='text-lg font-bold'>BOM 14:30</p>
            <p className='text-xs'>Thu, 29 Feb 2024</p>
            <p className='my-1 text-xs max-w-28'>Chatrapati Shivaji Airport,Terminal1</p> 
        </div>

        <div className=' text-xs -mt-4 '>
            <p className=' '>Check-in baggage</p>
            <p className='my-2 '>Cabin baggage</p>
        </div>

        <div className=' text-xs font-semibold -mt-4 '>
            <p className=''>15kg(1 piece) / adult</p>
            <p className='my-2 '>7kg / adult</p>
        </div>

         
      </div>


    </div>
  )
}

export default Flightdetail
