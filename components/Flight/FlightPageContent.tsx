/* eslint-disable react/no-children-prop */
"use client"
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import SearchForm from './SearchForm';
import FlightDate from './Flight-Date';
import FilterSider from '../Filter/FilterSider';
import FilterSlider from '../Filter/FilterSlider';
import FilterSiderAirlines from '../Filter/FilterSiderAirlines';
import Flightdata from './flight-data';
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { Filter1, Filter2, airlines, prices, TripDuration } from '../Filter/constants';
import instance from "@/axiosinstance";
import { Flight } from '@/redux/reducers/flightsSlice';
import { useSearchParams } from 'next/navigation';


const FlightPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const SelectedCity = searchParams.get("selectedcity");
  const DestinationCity = searchParams.get("destinationcity");

  const [location, setLocation] = useState<string>('');
  const [locationR, setLocationR] = useState<string>('');
  const [adults, setAdults] = useState<string>('');
  const [children, setChildren] = useState<string>('');
  const [hasInitialFetch, setHasInitialFetch] = useState(false);
  const [error, setError] = useState<string>('');
  const [filterData, setFilteredData] = useState<Flight[]>([]);
  const [stopInfo, setStopInfo] = useState<string[]>([]); 
  const [depTime, setDepTime] = useState<string[]>([]); 
  const [price, setPrice] = useState<number[]>([]); 

  useEffect(() => {
    const fetchFlights = async () => {
      setFilteredData([]);
      setError('');
      const useLocation = hasInitialFetch && location ? location : SelectedCity;
      const useLocationR = hasInitialFetch && locationR ? locationR : DestinationCity;

      if (useLocation && useLocationR) {
        try {
          const params = new URLSearchParams({
            location: useLocation,
            locationR: useLocationR,
            price: price.join(','),
            stopInfo: stopInfo.join(','),
            depTime: depTime.join(',')
          });
          const { data } = await instance.get(`/matchingData?${params}`);
          console.log(data, "dataapi")
          setFilteredData(data);
          if (!hasInitialFetch) setHasInitialFetch(true); // Mark the initial fetch as complete only if successful.
        } catch (error:any) {
          setError(error.message || 'An error occurred');
        }
      }
    };

    fetchFlights();
  }, [location, locationR, stopInfo, depTime, price, hasInitialFetch, SelectedCity, DestinationCity]);



  return (
    <Provider store={store}>
      <div className='w-full mx-auto'>
        <div className='flex mx-40  bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300 '>
          <SearchForm setLocation={setLocation} setLocationR={setLocationR} setAdults={setAdults} setChildren={setChildren}/>
        </div>
        <main className='grid grid-cols-12 gap-x-2 mx-40 gap-y-10 overflow-hidden '>
          <div className='col-span-3 gap-2 '>
            <div className='h-auto '>
              <p className='mb-2'>Filter Flights</p>
              <FilterSider setStopInfo={setStopInfo} filter={Filter1} />
              <FilterSider setDepTime={setDepTime} filter={Filter2} />
              <FilterSlider value={prices} setPrice={setPrice} />
              <FilterSiderAirlines filter={airlines} />
              {/* <FilterSlider value={TripDuration} /> */}
            </div>
          </div>
          <div className='col-span-9 flex flex-col gap-4 mx-3'>
            <FlightDate />
            {/* <div className='flex gap-[76px] items-center bg-slate-100 h-1 text-sm p-6 '>
              <Label htmlFor="airplane-mode" className='my-1 mx-1'>Smart sort</Label>
              <Switch id="airplane-mode" />
            </div> */}
            <Flightdata data={filterData &&  filterData} adults={adults} children={children} error={error} />
          </div>
        </main>
      </div>
    </Provider>
  );
};

export default FlightPageContent;
