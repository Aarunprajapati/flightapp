"use client"
import CustomButton from '../CustomButton';
import { useDispatch} from 'react-redux';
import FlightDetailsBtn from './flight-details-btn';
import { Flight, setBookingFlights, setDetailFlight } from '@/redux/reducers/flightsSlice';
interface FlightDataProps{
  data: Flight[]
}

const FlightData = ({data}:FlightDataProps) => {
  const dispatch = useDispatch()

  const handleBookClick = (flightData:any) => {
    dispatch(setBookingFlights(flightData))
  };
  const handleDetailClick = (flightData1:any) => {
    dispatch(setDetailFlight(flightData1))
  };

  return (
    <>
      {data?.map((flight, index) => (
        <div key={index} className="border-2 border-gray-200 my-2 p-5">
          <div className=' flex gap-2 justify-between items-center'>
            <div className="flex gap-2">
              <div className="py-1">
                <img className="w-8 h-8" src="flight.svg" alt="flight" />
              </div>
              <div className="grid">
                <p className="text-base">{flight.displayData.airlines[0].airlineName}</p>
                <p className="text-xs">{flight.displayData.airlines[0].flightNumber}</p>
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
                href="/flights/book"
                onClick={()=> handleBookClick(flight)}
                className="px-6 py-2 rounded-md text-md bg-orange-500 text-white"
                label="Book"
              />
            </div>

          </div>
          <FlightDetailsBtn onClick={()=> handleDetailClick(flight)} />
        </div>
      ))}
    </>
  );
};

export default FlightData;
