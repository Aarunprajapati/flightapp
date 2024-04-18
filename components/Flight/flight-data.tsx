"use client"
import CustomButton from '../CustomButton';
import { useDispatch} from 'react-redux';
import FlightDetailsBtn from './flight-details-btn';
import { Flight, setBookingFlights, setDetailFlight } from '@/redux/reducers/flightsSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Button } from '../ui/button';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

interface FlightDataProps{
  data: Flight[]
  error:string,
  children:string,
  adults:string,
}



const FlightData = ({ data, error,children,adults }: FlightDataProps) => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const handleBookClick = (flightData: any) => {
    dispatch(setBookingFlights(flightData));
  };
  const handleDetailClick = (flightData1: any) => {
    // toast.success("Successfully")
    dispatch(setDetailFlight(flightData1));
  };
  if (error) {
    toast.error("No Such Flight Available");
  }
  return (
    <>
      <div className="mx-3 md:mx-10">
      {error && (
        <h1 className="text-xl font-semibold bg-slate-200 text-black p-4 rounded-md">
          No Flight Found
        </h1>
      )}
      {data?.map((flight, index) => (
        <div key={index} className="border-2 border-gray-200 my-2  lg:p-5">
          <div className="flex flex-col  gap-y-3 md:flex-row lg:gap-2 justify-center  lg:justify-between items-center ">
            <div className="flex gap-2">
              <div className="py-1">
                {/* eslint-disable-next-line @next/next/no-img-element  */}
                <img className="w-8 h-8" src="flight.svg" alt="flight" />
              </div>
              <div className="grid">
                <p className="text-base ">{flight.displayData.airlines[0].airlineName}</p>
                <p className="text-xs">{flight.displayData.airlines[0].flightNumber}</p>
              </div>
            </div>
            <div className="text-lg me-10">{flight.displayData.source.depTime.slice(11, 16)}</div>
            <div className="relative  grid text-xs md:w-1/4lg:ms-8 md:ms-4">
              <p>{flight.displayData.totalDuration}</p>
              <div className="w-20 h-1 bg-neutral-400"></div>
              <p>{flight.displayData.stopInfo}</p>
            </div>
            <div className="text-lg  me-10">{flight.displayData.destination.arrTime.slice(11, 16)}</div>
            <div className="font-bold me-14">₹{flight.fare}</div>
            <div>
              <CustomButton
                href={`/flights/book?id=${flight._id}&adults=${adults}&children=${children}`}
                onClick={() => handleBookClick(flight)}
                className="px-4 w-28 py-2 rounded-md text-md bg-orange-500 text-white"
                label="Book"
              />
            </div>
          </div>
          <FlightDetailsBtn onClick={() => handleDetailClick(flight)} />
        </div>
      ))}
    </div>
    </>
  );
};

export default FlightData;
