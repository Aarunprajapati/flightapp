"use client"
import React from 'react'
import HeaderPage from './HeaderPage'
import { ArrowLeftRight } from 'lucide-react'
import NvavbarButton from '../NvavbarButton'
import SeacrhButton from '../CustomButton'
import CustomButton from '../CustomButton'
import { Input } from '@/components/ui/input'
import FilterSider from './FilterSider'
import Flightdata from './flight-data'
import { cn } from '@/lib/utils'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import SearchForm from './SearchForm'
import FlightDate from './Flight-Date'

import Flightdetail from './flight-detail'
import FilterSiderAirlines from './FilterSiderAirlines'
import FilterSlider from './FilterSlider'
 import { Filter1, Filter2, airlines, prices, TripDuration} from './constants'

const FlightPageContent = () => {
  return (
    <div className='w-full mx-auto'>
        <div className=' flex h-20 mx-60 bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300'>
            <SearchForm/>
        </div>
        <main className='grid grid-cols-12 gap-x-2 mx-60 gap-y-10 overflow-hidden '>
            <div className=' col-span-3'>
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

                <div> <Flightdata/></div>
               
            </div>
        </main>
 
    
    </div>
  )
}

export default FlightPageContent
