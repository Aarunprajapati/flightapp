"use client"
import CustomButton from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';

import FlightDetailsBtn from './flight-details-btn';
import { useState, useEffect } from 'react';
import instance from "@/axiosinstance";
import { string } from 'zod';
import { RootState } from '@/redux/store';
import { Flight, setBookingFlights } from '@/redux/reducers/flightsSlice';
interface FlightDataProps{
  data: Flight[]
  error:string
}

const FlightData = ({ data, error }: FlightDataProps) => {
  const dispatch = useDispatch();
  const handleBookClick = (flightData: any) => {
    dispatch(setBookingFlights(flightData));
  };

  return (
    <>
    <div className='mx-10 '>
      {error && (<h1 className=' text-xl font-semibold bg-slate-200 text-black p-4 rounded-md'> No Flight Found</h1>)}
      {data?.map((flight, index) => (
        <div key={index} className="border-2 border-gray-200 my-2 p-5">
          <div className=" flex gap-2 justify-between items-center">
            <div className="flex gap-2">
              <div className="py-1">
                <img className="w-8 h-8" src="flight.svg" alt="flight" />
              </div>
              <div className="grid">
                <p className="text-base">
                  {flight.displayData.airlines[0].airlineName}
                </p>
                <p className="text-xs">
                  {flight.displayData.airlines[0].flightNumber}
                </p>
              </div>
            </div>
            <div className="text-lg">
              {flight.displayData.source.depTime.slice(11, 16)}
            </div>
            <div className="relative grid text-xs">
              <p className="ms-4">{flight.displayData.totalDuration}</p>
              <div className="w-20 h-1 bg-neutral-400"></div>
              <p className="ms-4">{flight.displayData.stopInfo}</p>
            </div>
            <div className="text-lg">
              {flight.displayData.destination.arrTime.slice(11, 16)}
            </div>
            <div>
              <p className="font-bold">₹{flight.fare}</p>
            </div>
            <div>
              <CustomButton
                href={`/flights/book?id=${flight._id}`}
                onClick={() => handleBookClick(flight)}
                className="px-6 py-2 rounded-md text-md bg-orange-500 text-white"
                label="Book"
              />
            </div>
          </div>
          <FlightDetailsBtn />
        </div>
      ))}

    </div>
    </>
  );
};

export default FlightData;
