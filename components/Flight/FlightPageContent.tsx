/* eslint-disable react/no-children-prop */
"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import SearchForm from "./SearchForm";
import FlightDate from "./Flight-Date";
import FilterSider from "../Filter/FilterSider";
import FilterSlider from "../Filter/FilterSlider";
import FilterSiderAirlines from "../Filter/FilterSiderAirlines";
import Flightdata from "./flight-data";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Filter1,
  Filter2,
  airlines,
  prices,
  TripDuration,
} from "../Filter/constants";
import instance from "@/axiosinstance";
import { Flight } from '@/redux/reducers/flightsSlice';
import { useSearchParams } from 'next/navigation';
import { AlignJustify } from 'lucide-react';


const FlightPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const SelectedCity = searchParams.get("selectedcity");
  const DestinationCity = searchParams.get("destinationcity");

  const [location, setLocation] = useState<string>("");
  const [locationR, setLocationR] = useState<string>("");
  const [adults, setAdults] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [hasInitialFetch, setHasInitialFetch] = useState(false);
  const [error, setError] = useState<string>("");
  const [filterData, setFilteredData] = useState<Flight[]>([]);
  const [stopInfo, setStopInfo] = useState<string[]>([]); 
  const [depTime, setDepTime] = useState<string[]>([]); 
  const [price, setPrice] = useState<number[]>([]); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchFlights = async () => {
      setFilteredData([]);
      setError("");
      const useLocation = hasInitialFetch && location ? location : SelectedCity;
      const useLocationR =
        hasInitialFetch && locationR ? locationR : DestinationCity;

      if (useLocation && useLocationR) {
        try {
          const params = new URLSearchParams({
            location: useLocation,
            locationR: useLocationR,
            price: price.join(","),
            stopInfo: stopInfo.join(","),
            depTime: depTime.join(","),
          });
          const { data } = await instance.get(`/matchingData?${params}`);

          setFilteredData(data);
          if (!hasInitialFetch) setHasInitialFetch(true); // Mark the initial fetch as complete only if successful.
        } catch (error: any) {
          setError(error.message || "An error occurred");
        }
      }
    };

    fetchFlights();
  }, [
    location,
    locationR,
    stopInfo,
    depTime,
    price,
    hasInitialFetch,
    SelectedCity,
    DestinationCity,
  ]);

  return (
    <Provider store={store}>
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-4 lg:mb-10 border-b-2 lg:px-36 border-gray-300 lg:mx-12">
          <button className="block lg:hidden" onClick={toggleForm}>
            <AlignJustify className="w-6 h-6" />
          </button>
          <div className={`lg:flex ${isFormOpen ? "" : "hidden"}`}>
            <SearchForm
              setLocation={setLocation}
              setLocationR={setLocationR}
              setAdults={setAdults}
              setChildren={setChildren}
            />
          </div>
        </div>
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-x-2 gap-y-10 mx-3 lg:mx-40 overflow-hidden">
          <div className="lg:col-span-3  lg:col-2 gap-2 mt-5">
            <div className="h-auto">
              <p className="mb-2">Filter Flights</p>
              <FilterSider setStopInfo={setStopInfo} filter={Filter1} />
              <FilterSider setDepTime={setDepTime} filter={Filter2} />
              <FilterSlider value={prices} setPrice={setPrice} />
              <FilterSiderAirlines filter={airlines} />
            </div>
          </div>
          <div className="lg:col-span-9 md:col-span-10 flex flex-col gap-4">
            <FlightDate />
            <Flightdata
              data={filterData && filterData}
              adults={adults}
              children={children}
              error={error}
            />
          </div>
        </main>
      </div>
    </Provider>
  );
};

export default FlightPageContent;
