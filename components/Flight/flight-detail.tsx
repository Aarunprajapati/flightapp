"use client"
import { RootState } from '@/redux/store';
import { Clock5 } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux';

// flight details component which show in the flight data component
const Flightdetail = () => {
  const flightD = useSelector((state: any) => state.flights.detailFlight);
  const data = [flightD];
 
  
  return (
    <>
      {data?.map((flight, index) => (
        <div className='border-2 border-gray-200' key={index}>
          <div className='flex border-b-2 border-gray-200 p-4'>
            <div className='text-xs flex gap-2'>
              <p className='font-semibold'>
                {flight.displayData.source.airport.cityName} ({flight.displayData.source.airport.airportCode}) → 
                {flight.displayData.destination.airport.cityName} ({flight.displayData.destination.airport.airportCode})
              </p>
              <p>{flight.displayData.source.depTime.slice(11, 16)}</p>
            </div>
          </div>

          <div className='flex gap-6 items-center p-8'>
            <div className='grid -mb-3'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div><img className='w-6 h-6' src="flight.svg" alt="flight" /></div>
              <div>
                <p className='my-2 text-xs'>{flight.displayData.airlines[0].airlineName}</p>
                <p className='text-xs'>{flight.displayData.airlines[0].flightNumber}</p>
                <p className='text-xs'>Economy</p>
              </div>
            </div>

            <div className='grid'>
              <p className='text-lg font-bold'>{flight.displayData.source.depTime.slice(11, 16)}</p>
              <p className='text-xs'>{flight.displayData.source.depTime.slice(0, 10)}</p>
              <p className='my-2 text-xs'>{flight.displayData.source.airport.airportName}, Terminal{flight.displayData.source.airport.terminal}</p>
            </div>

            <div className='grid -mt-5'>
              <Clock5 />
              <p className='text-xs'>{flight.displayData.totalDuration}</p>
            </div>

            <div className='grid'>
              <p className='text-lg font-bold'>{flight.displayData.destination.arrTime.slice(11, 16)}</p>
              <p className='text-xs'>{flight.displayData.destination.arrTime.slice(0, 10)}</p>
              <p className='my-1 text-xs max-w-28'>{flight.displayData.destination.airport.airportName}, Terminal{flight.displayData.destination.airport.terminal}</p>
            </div>

            <div className='text-xs -mt-4'>
              <p>Check-in baggage</p>
              <p className='my-2'>Cabin baggage</p>
            </div>

            <div className='text-xs font-semibold -mt-4'>
              <p>15kg (1 piece) / adult</p>
              <p className='my-2'>7kg / adult</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Flightdetail
