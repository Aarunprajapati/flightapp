"use client"
import React, { useContext, useEffect, useState } from 'react'
import CustomButton from '../CustomButton'
import Fligtdetailsbtn from './fligt-details-btn'
import { FlightContext } from '../contextApi'


// flight data component
const Flightdata= () => {
  const { flyData } = useContext(FlightContext)!;
  return (
    <>
      {flyData.map((flight, index) => (
    <div className='border-2 border-gray-200 my-2 p-5 '>
        <div key={index} className='flex gap-2 justify-between items-center'>
          <div className='flex gap-2'>
            <div className='py-1'><img className='w-8 h-8' src="flight.svg" alt="flight" /></div>
            <div className='grid'>
              <p className='text-base'>{flight.displayData.airlines[0].airlineName}</p>
              <p className='text-xs'>{flight.displayData.airlines[0].flightNumber}</p>
            </div>
          </div>
          <div className='text-lg'>{flight.displayData.source.depTime.slice(11, 16)}</div>
          <div className='relative grid text-xs'>
            <p className='ms-4'>{flight.displayData.totalDuration}</p>
            <p className='w-20 h-1 bg-neutral-400'></p>
            <p className='ms-4'>{flight.displayData.stopInfo}</p>
          </div>
          <div className='text-lg'>{flight.displayData.destination.arrTime.slice(11, 16)}</div>
          <div>
            <p className='font-bold'>₹{flight.fare}</p>
          </div>
               

          <div>
            <CustomButton className='px-6 py-2 rounded-md text-md bg-orange-500 text-white' label='Book' />
          </div>
          </div>
         

            <div>
              <Fligtdetailsbtn />
            </div>
        
    </div>
           
      ))}

    </>
  );
}

export default Flightdata
