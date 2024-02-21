'use client'
import { ArrowLeftRight } from 'lucide-react'
import React from 'react'
interface HeroContentProps {
    title?: string,
    subtitle?: string,
    
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
                        <h1 className='font-bold text-xl lg:text-2xl '>{value?.title}</h1>
                        <p className=' text-sm lg:text-md text-black'>{value?.subtitle}</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default HeroContent
