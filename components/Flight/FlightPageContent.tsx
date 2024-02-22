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
        value1:"Non-stop",
        time1:"4pm-8pm",
        value2:"1 Stop",
        time2:"8pm-12pm"
    },
]
const FlightPageContent = () => {
  return (
    <div className='w-full mx-auto'>
        <div className=' flex h-20 mx-60 bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300'>
            <SearchForm/>
            {/* <HeaderPage/>
            <div className=' flex items-center'>
            <Input type="text" placeholder="Banglore" />
            <div className='relative top-1 inline-block mx-2 z-[100]'>
                <button type='button' className=' shadow-lg rounded-full  '>
                    <ArrowLeftRight className='text-orange-400 w-8 h-8 p-1'/>
                </button>
            </div>
            <Input type="text" placeholder="Banglore" />
            </div>
            <HeaderPage/>
            <HeaderPage/>            
            <HeaderPage/>
            <CustomButton className='px-6 py-2 rounded-md text-md bg-black text-white' label='Search'/> */}
        </div>
        <main className=' grid grid-cols-12 gap-x-2 gap-y-10 mx-60'>
            <div className=' col-span-3 '>
            <p className='mb-2'>39 of 39 flights</p>
                <FilterSider filter={Filter1}/>
                <FilterSider filter={Filter2}/>
            </div>
            <div className='col-span-9 grid gap-5'>
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
