"use client"
import React, { useState } from 'react'
import FilterSider from './FilterSider'
import Flightdata from './flight-data'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import SearchForm from './SearchForm'
import FlightDate from './Flight-Date'
import FilterSiderAirlines from './FilterSiderAirlines'
import FilterSlider from './FilterSlider'
import { Filter1, Filter2, airlines, prices, TripDuration} from './constants'
import { FlightProvider } from '../contextApi'

//  this is the parent component in which all the componets are together
const FlightPageContent = () => {
// flyData is the state to handle the states of the flight data after searhing the flight


  return (
    <FlightProvider>
    <div className='w-full mx-auto'>
        {/* this is the search component which  is used to search the flights  */}
        <div className=' flex h-20 mx-60 bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300'>
            <SearchForm  />
            {/* updateFlyData={setFlyData} */}
        </div>

        <main className='grid grid-cols-12 gap-x-2 mx-60 gap-y-10 overflow-hidden '>
            <div className=' col-span-3'>
                {/* this is  the side filter  */}
                <div className='h-auto'>
                    <p className='mb-2'>39 of 39 flights</p>
                        <FilterSider filter={Filter1}/> 
                        <FilterSider filter={Filter2}/> 
                        <FilterSlider value={prices}/>
                        <FilterSiderAirlines filter={airlines}/>
                        <FilterSlider value={TripDuration} /> 
                </div>
            </div>
            <div className='col-span-9 flex flex-col gap-4 '>
                <div className=' max-w-6xl ml-14'>
                    <FlightDate/>

                </div>
                <div className='flex gap-[76px]  items-center bg-slate-100  h-1 text-sm p-6  '>
                    <p>Airlines</p>
                    <p>Departure</p>
                    <p> Duration</p>
                    <p> Arrival</p>
                    <p> Price</p>
                    <div>
                    <div className="flex ">
                    <Label htmlFor="airplane-mode" className='my-1 mx-1 '>Smart sort</Label>
                    <Switch id="airplane-mode" />
                    </div>
                    </div>
                </div>
               {/* this shows the flight data   */}
                <div> <Flightdata /></div>
                {/* flyData={flyData} */}
            </div>
        </main>
 
    
    </div>
    </FlightProvider>
  )
}

export default FlightPageContent
