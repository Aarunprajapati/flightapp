"use client";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import FlightDetailsBtn from "./flight-details-btn";
import {
  Flight,
  setBookingFlights,
  setDetailFlight,
} from "../../redux/reducers/flightsSlice";
import toast from "react-hot-toast";
import { useTheme, useMediaQuery } from "@mui/material";
import { ScrollArea } from "../ui/scroll-area";
import { useSearchParams } from "next/navigation";

interface FlightDataProps {
  data: Flight[];
  error: string;
  children: string;
  adults: string;
  select:string;
}

const FlightData = ({ data, error, children, adults, select }: FlightDataProps) => {
  const searchParams = useSearchParams();
  const SelectedRoutes = searchParams?.get("select");
  const useRoutes =  select ? select : SelectedRoutes;
   // eslint-disable-next-line no-console
   console.log(useRoutes,"select from flight data useRoutes ")
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

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
    <div className="mx-3 md:mx-10">
      {error && (
        <h1 className="text-xl font-semibold bg-slate-200 text-black p-4 rounded-md">
          No Flight Found
        </h1>
      )}

      {isSmallDevice ? (
        <ScrollArea className="h-screen w-full rounded-md ">
          <div>
            {data?.map((flight, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 my-2  lg:p-5"
              >
                <div className=" w-full flex-col flex p-4 gap-y-3 md:flex-row lg:gap-2 justify-center  lg:justify-between items-center ">
                  <div className="flex gap-2 items-center">
                    <div className="py-1">
                      {/*  eslint-disable-next-line @next/next/no-img-element  */}
                      <img className="w-8 h-8" src="flight.svg" alt="flight" />
                    </div>

                    <div className="grid">
                      <p className="text-base ">
                        {flight.displayData.airlines[0].airlineName}
                      </p>
                      <p className="text-xs">
                        {flight.displayData.airlines[0].flightNumber}
                      </p>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between space-y-5 space-x-5 mx-5">
                    <div className="text-lg me-2 mt-5 ">
                      {flight.displayData.source.depTime.slice(11, 16)}
                    </div>
                    <div className="relative items-center  grid text-xs md:w-1/4lg:ms-8 md:ms-4">
                      <p>{flight.displayData.totalDuration}</p>
                      <div className="w-20 h-1 bg-neutral-400"></div>
                      <p>{flight.displayData.stopInfo}</p>
                    </div>
                    <div className="text-lg ms-10">
                      {flight.displayData.destination.arrTime.slice(11, 16)}
                    </div>
                  </div>
                  <div className=" flex items-center justify-between space-y-5">
                    <div className="font-bold me-14 mt-4">₹{flight.fare}</div>
                    <div>
                      <CustomButton
                        href={`/flights/book?id=${flight._id}&adults=${adults}&children=${children}`}
                        onClick={() => handleBookClick(flight)}
                        className="px-4 w-28 py-2 rounded-md text-md bg-orange-500 text-white"
                        label="Book"
                      />
                    </div>
                  </div>
                </div>
                <div className=" mx-4">
                  <FlightDetailsBtn onClick={() => handleDetailClick(flight)} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea className=" h-96 w-full rounded-md ">
          <div>
            {data?.map((flight, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 my-2 lg:mx-10  lg:p-5"
              >
                <div className=" w-full md:flex-row  inline-flex p-4 lg:flex-row  lg:gap-2 justify-between  lg:justify-between items-center ">
                  <div className="flex gap-2 items-center">
                    <div className="py-1">
                      {/*  eslint-disable-next-line @next/next/no-img-element  */}
                      <img className="w-8 h-8" src="flight.svg" alt="flight" />
                    </div>
                    <div className="grid">
                      <p className="text-base ">
                        {flight.displayData.airlines[0].airlineName}
                      </p>
                      <p className="text-xs">
                        {flight.displayData.airlines[0].flightNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg md:mx-10">
                    {flight.displayData.source.depTime.slice(11, 16)}
                  </div>
                  <div className="relative  grid text-xs md:w-1/4lg:ms-8 md:ms-4">
                    <p>{flight.displayData.totalDuration}</p>
                    <div className="w-20 h-1 bg-neutral-400"></div>
                    <p>{flight.displayData.stopInfo}</p>
                  </div>
                  <div className="text-lg  md:mx-5">
                    {flight.displayData.destination.arrTime.slice(11, 16)}
                  </div>
                  <div className="font-bold md:mx-5">₹{flight.fare}</div>
                  <div>
                    <CustomButton
                      href={`/flights/book?id=${flight._id}&adults=${adults}&children=${children}`}
                      onClick={() => handleBookClick(flight)}
                      className="px-4 w-28 py-2 rounded-md text-md bg-orange-500 text-white"
                      label="Book"
                    />
                  </div>
                </div>
                <div className=" mx-4">
                  <FlightDetailsBtn onClick={() => handleDetailClick(flight)} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
      )}
    </div>
  );
};

export default FlightData;
