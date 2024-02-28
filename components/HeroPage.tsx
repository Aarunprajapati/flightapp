'use client'
import { cn } from '@/lib/utils'
import { ArrowLeftRight, Plane, Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'
import HeroContent from './HeroContent'
import { Button } from './ui/button'
import HeroContentSecond from './HeroContentSecond'
import axios from 'axios'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const datas = [
  {
    icon: Plane,
    label: "Flights",
    color: "text-blue-500",
    bgColor: "text-blue-900/10",
  },
];
const labels = [
  {
    label: "One way",
  },
  {
    label: "Round trip",
  },
];

const heroLabel = [
  {
    label: "Regular Fares ",
  },
  {
    label: "Armed Forces Fares ",
  },
  {
    label: "Student Fares",
  },
  {
    label: "Senior Citizen Fares",
  },
  {
    label: "Doctors & Nurses Fares",
  },
  {
    label: "Double Seat Fares",
  },
];

interface City {
    cityName: string;
    AirPortcode: string;
    AirportName: string;
  }

const HeroPage = () => {

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  //*   Arrival city select
  const [FromCity, setCity] = useState<City[]>([]);
  console.log(FromCity,"Fromcity") 
  const [selectedCity, setSelectedCity] = useState<City>({
    cityName: 'Delhi',
    AirPortcode: 'DEL',
    AirportName: 'Indira Gandhi Airport',
  });

  //* Destination city select
  const [ToCity, setToCity] = useState<City[]>([]);
  const [destinationcity, setdestinationcity] = useState<City>({
    cityName: 'Mumbai',
    AirPortcode: 'BOM',
    AirportName: 'Mumbai Airport India',
  });
 
  const stateChange = ()=>{
    setSelectedCity({...destinationcity})
    setdestinationcity({...selectedCity})
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/displaydata');
    //   console.log(response.data.sourceAirports)
      const FromData = response.data.source;
      const ToData = response.data.destination; 
      const FromAirlines = FromData?.map((value:any)=>({
        cityName: value.airport.cityName,
        AirPortcode: value.airport.airportCode,
        AirportName: value.airport.airportName
      }))
      const ToAirlines = ToData?.map((value:any)=>({
        cityName: value.airport.cityName,
        AirPortcode: value.airport.airportCode,
        AirportName: value.airport.airportName
      }))
      setCity(FromAirlines);
      setToCity(ToAirlines)
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleCitySelection = (city: City) => {
    console.log(city,"city")
    setSelectedCity(city);
    setOpen(false); // Close the popover after selection
  };
  const handleCityDestinationSelection = (city: City) => {
    console.log(city,"city")
    setdestinationcity(city);
    setOpen1(false); // Close the popover after selection
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='flex items-center flex-col relative w-full bg-white mx-auto px-20 space-y-2 '>
      <div className='relative top-12 w-fit rounded-md flex items-center justify-center p-4 shadow-2xl gap-x-2'>
        {datas?.map((data) => (
          <div key={data.label} className={cn('flex flex-col items-center', data.bgColor)}>
            <Plane className={cn('w-24 lg:w-28 h-14 rounded-md', data.color)} />
            <p className='text-md lg:text-lg font-semibold text-blue-400'>{data.label}</p>
          </div>
        ))}
      </div>
      <div className='relative bottom-5 shadow-2xl w-full'>
        <RadioButton labels={labels} className='mt-10' sidelabel="Book International and Domestic Flights" />
        <div className='flex items-center'>


          {/* From City */}
          <Popover open={open} onOpenChange={setOpen}>
            <div className='flex items-center'>
              <PopoverTrigger asChild>
                <div className='flex items-center'>
                   {/* HeroContent  */}
                   <HeroContent value={selectedCity} label="From" />

                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0  z-50 relative">
                <div className='scroll-container overflow-hidden items-center fixed -top-20 -left-[125px] h-auto w-[230px] bg-white' >
                    <Command >
                            <CommandInput placeholder="Search arrival..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            {FromCity.map((city) => (
                                <CommandGroup>
                                    <div className=' flex items-center  ' onClick={() => handleCitySelection(city)}>
                                        <CommandItem key={city.cityName} value={city.cityName}>
                                            {city.cityName}
                                        </CommandItem>
                                
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedCity.cityName === city.cityName ? "opacity-100" : "opacity-0"
                                                   
                                                )}
                                            />         
                                    </div>
                                    </CommandGroup>
                            ))}
                    </Command>
                </div>
              </PopoverContent>
            </div>
          </Popover>
                                                    
          {/* To City */}
          <Popover open={open1} onOpenChange={setOpen1}>
            <div className='flex items-center'>
              <PopoverTrigger asChild>
                <div className='flex items-center'>
                   {/* HeroContent  */}
                   <HeroContent value={destinationcity} label="To" />

                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0  z-50 relative">
                <div className='scroll-container overflow-hidden items-center fixed -top-20 -left-[125px] h-auto w-[230px] bg-white' >
                    <Command >
                            <CommandInput placeholder="Search arrival..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            {ToCity.map((city) => (
                                <CommandGroup>
                                    <div className=' flex items-center  ' onClick={() => handleCityDestinationSelection(city)}>
                                        <CommandItem key={city.cityName} value={city.cityName}>
                                            {city.cityName}
                                        </CommandItem>
                                
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedCity.cityName === city.cityName ? "opacity-100" : "opacity-0"
                                                   
                                                )}
                                            />         
                                    </div>
                                    </CommandGroup>
                            ))}
                    </Command>
                </div>
              </PopoverContent>
            </div>
          </Popover>
          
          <HeroContentSecond />
        </div>

        <div className='relative bottom-[90px] left-[270px] inline-block'>
          <button type='button' onClick={stateChange} className='rounded-full bg-white shadow-lg z-[100] '>
            <ArrowLeftRight className='text-blue-500 w-full h-full p-2' />
          </button>
        </div>

        <RadioButton labels={heroLabel} title='Select A Fare Type' className='bg-blue-50 w-fit p-2 mx-5 text-xs mb-10' />
      </div>

      <div className='hidden relative bottom-12 w-full md:flex items-center justify-center'>
        <Button className='px-14 rounded-full text-2xl font-semibold py-3 bg-blue-400' size={'lg'}>Search</Button>
      </div>
    </div>
  );
}

export default HeroPage;
