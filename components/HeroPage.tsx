'use client'
import { cn } from '@/lib/utils'
import { ArrowLeftRight, Frown, Plane, Radio } from 'lucide-react'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import RadioButton from './RadioButton'
import HeroContent from './HeroContent'
import { Button } from './ui/button'
import HeroContentSecond from './HeroContentSecond'




const datas=[
    {
        icon: Plane,
        label:"Flights",
        color:"text-blue-500",
        bgColor:"text-blue-900/10",
    },
]
const labels=[
    {         
        label:"One way",
    },
    {   
        
        label:"Round trip",
    },
  
]

const heroLabel=[
    {
        label:"Regular Fares ",
    },
    {
        label:"Armed Forces Fares ",
    },
    {
        label:"Student Fares",
    },
    {
        label:"Senior Citizen Fares",
    },
    {
        label:"Doctors & Nurses Fares",
    },
    {
        label:"Double Seat Fares",
    },

]
const HeroPage = () => {
    const [From, setFrom] = useState<{title:string, subtitle:string }>({
        title:"Mumbai",
        subtitle:"BOM, Bombay Airport India mumbai jsdjasjdlkasdjalksj"
    })
    const [To, setTo] = useState<{title:string, subtitle:string }>({
        title:"Delhi",
        subtitle:"DEL, Delhi Airport India"
    });

    const statechnage = ()=>{
        setFrom({...To})
        setTo({...From})
        
    }
  return (
    <div className='flex items-center flex-col relative  w-full bg-white mx-auto px-20 space-y-2'>
        <div className=' relative top-12 w-fit rounded-md flex items-center justify-center p-4 shadow-2xl gap-x-2' >
            {datas?.map((data)=>(
                <div key={data.label} className={cn('flex flex-col items-center', data.bgColor)}>
                    <Plane className={cn('w-24 lg:w-28 h-14 rounded-md', data.color)}/>
                    <p className=' text-md lg:text-lg font-semibold text-blue-400'>{data.label}</p>
                </div>         
            ))}
        </div>
        <div className='relative bottom-5 shadow-2xl w-full '> 
            <RadioButton labels={labels}  className='mt-10' sidelabel="Book International and Domestic Flights" />
           <div className=' flex items-center'>
                <HeroContent 
                value={To} label={'From'}
                />
            <HeroContent value={From} label={'To'}/>
            <HeroContentSecond/>
           </div>
            <div className=' relative bottom-[90px] left-[270px] inline-block'>
            <button type='button' onClick={statechnage} className='rounded-full bg-white shadow-lg z-[100] '>
                <ArrowLeftRight className='text-blue-500 w-full h-full p-2'/>
                 </button>
            </div>
            
            <RadioButton labels={heroLabel} title='Select A Fare Type' className='bg-blue-50 w-fit p-2 mx-5 text-xs mb-10 '/>
        </div>
        <div className='hidden relative bottom-12 w-full md:flex items-center justify-center'>
          <Button className=' px-14 rounded-full text-2xl font-semibold py-3 bg-blue-400' size={'lg'}>Search</Button>
        </div>
    </div>
  )
}
export default HeroPage
