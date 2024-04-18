'use client'

import React from 'react'

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
    <div className='relative flex items-center w-full lg:flex'>
        <div className='rounded-md flex w-full md:w-fit'>
            <div className='p-4 md:p-6 lg:px-8 h-auto md:h-[150px] border border-r-1 border-gray-300 hover:bg-blue-100 w-full md:w-[290px]'>
                <span className='text-md md:text-lg lg:text-xl text-gray-900'>{label}</span>
                {value?.cityName && <p className='font-semibold text-lg md:text-xl lg:text-2xl'>{value.cityName}</p>}
                {value?.cityName && <p className='text-xs md:text-sm lg:text-md text-gray-600'>{value.AirPortcode}, {value.AirportName}</p>}
            </div>
        </div>
    </div>
</div>

  )
}

export default HeroContent
