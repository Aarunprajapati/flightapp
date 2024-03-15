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

const FlightPageContent: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [locationR, setLocationR] = useState<string>('');
  const [searchData, setSearchData] = useState<Flight[]>([]);
  const [filterData, setFilteredData] = useState<Flight[]>([]);
  const [stopInfo, setStopInfo] = useState<string[]>([]);
  const [depTime, setDepTime] = useState<string[]>([]);
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    const fetchFlights = async () => {
      if (location && locationR) {
        try {
          const params = new URLSearchParams({
            location,
            locationR,
            stopInfo: stopInfo.join(','),
            depTime: depTime.join(',')
          });
          const { data } = await instance.get(`/matchingData?${params}`);
          setFilteredData(data);
        } catch (error) {
          console.error('Failed to fetch flights:', error);
        }
      }
    };

    fetchFlights();
  }, [location, locationR, stopInfo, depTime]);

  return (
    <Provider store={store}>
      <div className='w-full mx-auto'>
        <div className='flex h-20 mx-60 bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300'>
          <SearchForm setLocation={setLocation} setLocationR={setLocationR} />
        </div>
        <main className='grid grid-cols-12 gap-x-2 mx-52 gap-y-10 overflow-hidden '>
          <div className='col-span-3'>
            <div className='h-auto '>
              <p className='mb-2'>Filter Flights</p>
              <FilterSider setStopInfo={setStopInfo} filter={Filter1} />
              <FilterSider setDepTime={setDepTime} filter={Filter2} />
              <FilterSlider value={prices} />
              <FilterSiderAirlines filter={airlines} />
              <FilterSlider value={TripDuration} />
            </div>
          </div>
          <div className='col-span-9 flex flex-col gap-4'>
            <FlightDate />
            {/* <div className='flex gap-[76px] items-center bg-slate-100 h-1 text-sm p-6 '>
              <Label htmlFor="airplane-mode" className='my-1 mx-1'>Smart sort</Label>
              <Switch id="airplane-mode" />
            </div> */}
            <Flightdata data={filterData.length > 0 ? filterData : searchData} />
          </div>
        </main>
      </div>
    </Provider>
  );
};

export default FlightPageContent;
