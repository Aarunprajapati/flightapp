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
 
const Filter1=[
    {
        label:"Stop",
        value1:"Non-stop",
        value2:"1 Stop"
    },
]
const Filter2=[
    {
        label:"Departure time",
        value1:"Evening",
        time1:"4pm-8pm",
        value2:"Night",
        time2:"8pm-12pm"
    },
]
const airlines=[
    {
        label:"Airlines",
        value1:"Show multiple airlines",
        price1:"285$",
        value2:"Air india",
        price2:"285$",
        value3:"Air India express",
        price3:"285$",
        value4:"Indigo",
        price4:"285$",
        value5:"Vistara",
        price5:"285$",
        value6:"Spice jet",
        price6:"285$",
    }
]
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
                        <FilterSiderAirlines filter={airlines}/> 
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
