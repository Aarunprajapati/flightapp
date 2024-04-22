/* eslint-disable @next/next/no-img-element */
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
      <div className="border-2 border-gray-200 mb-4 md:mb-6" key={index}>
        <div className="flex border-b-2 border-gray-200 p-4 md:p-6">
          <div className="text-xs flex flex-col md:flex-row gap-2 md:items-center">
            <p className="font-semibold">
              {flight.displayData.source.airport.cityName} ({flight.displayData.source.airport.airportCode}) → 
              {flight.displayData.destination.airport.cityName} ({flight.displayData.destination.airport.airportCode})
            </p>
            <p>{flight.displayData.source.depTime.slice(11, 16)}</p>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row gap-6 md:items-center p-4 md:p-8">
          <div className="flex gap-2 items-center">
            <img className="w-6 h-6" src="flight.svg" alt="flight" />
            <div>
              <p className="my-2 text-xs">{flight.displayData.airlines[0].airlineName}</p>
              <p className="text-xs">{flight.displayData.airlines[0].flightNumber}</p>
              <p className="text-xs">Economy</p>
            </div>
          </div>
  
          <div className="grid">
            <p className="text-lg font-bold">{flight.displayData.source.depTime.slice(11, 16)}</p>
            <p className="text-xs">{flight.displayData.source.depTime.slice(0, 10)}</p>
            <p className="my-2 text-xs">{flight.displayData.source.airport.airportName}, Terminal{flight.displayData.source.airport.terminal}</p>
          </div>
  
          <div className="grid items-center">
            <Clock5 />
            <p className="text-xs">{flight.displayData.totalDuration}</p>
          </div>
  
          <div className="grid">
            <p className="text-lg font-bold">{flight.displayData.destination.arrTime.slice(11, 16)}</p>
            <p className="text-xs">{flight.displayData.destination.arrTime.slice(0, 10)}</p>
            <p className="my-1 text-xs max-w-[7rem]">{flight.displayData.destination.airport.airportName}, Terminal{flight.displayData.destination.airport.terminal}</p>
          </div>
  
          <div className="text-xs">
            <p>Check-in baggage</p>
            <p className="my-2">Cabin baggage</p>
          </div>
  
          <div className="text-xs font-semibold">
            <p>15kg (1 piece) / adult</p>
            <p className="my-2">7kg / adult</p>
          </div>
        </div>
      </div>
    ))}
  </>
  );
};
export default Flightdetail
