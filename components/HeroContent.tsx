'use client'

import React from 'react'
import { PopoverContent } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'

interface HeroContentProps {
    cityName?:string,
    AirPortcode?:string,
    AirportName?:string
    
}
interface HeroContent{
    value?:HeroContentProps
    label:string

} 

const HeroContent = ({value,label}: HeroContent) => {

  return (
    <div>
       <div className=' relative md:flex items-center w-full hidden' >
                <div className='rounded-md flex w-fit'>
                    <div className=' p-6 px-8 h-[150px] border border-r-1 border-gray-300 hover:bg-blue-100 w-[290px]'>
                        <span className='text-lg text-gray-900'>{label}</span>
                        {value?.cityName && <p className='font-bold text-xl lg:text-2xl '>{value.cityName}</p>}
                        { value?.cityName && <p className=' text-sm lg:text-md text-black'>{value.AirPortcode},{value.AirportName}</p>}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default HeroContent
