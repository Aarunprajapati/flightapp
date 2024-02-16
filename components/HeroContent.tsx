'use client'
import React from 'react'

const HeroContent = () => {
  return (
    <div>
       <div className='w-full p-6 md:flex items-center h-56 border border-b-2 hidden ' >
                <div className='rounded-md flex w-fit'>
                    <div className=' p-6 border border-r-1 border-gray-300 hover:bg-blue-100'>
                        <span className='text-lg text-gray-900'>From</span>
                        <h1 className='font-bold text-2xl '>Delhi</h1>
                        <p className=' text-lg text-black'>DEl, Delhi Airport India</p>
                    </div>
                    <div className=' p-6 border border-r-1 border-gray-300 hover:bg-blue-100 '>
                    <span className='text-lg text-gray-900'>To</span>
                        <h1 className='font-bold text-2xl '>Mumbai</h1>
                        <p className=' text-lg text-black'>DEl, Mumbai Airport India</p>
                    </div>
                </div>
                <div className='rounded-md flex'>
                    <div className=' p-6 space-y-1 border border-r-1 border-gray-300 hover:bg-blue-100 '>
                        <span className='text-sm text-zinc-800'>Departure</span>
                        <div className=' text-3xl font-semibold'>16 <span className='text-lg font-normal'>Feb'24</span></div>
                        <span className='text-sm '>Friday</span>
                    </div>
                    <div className='  p-6 border border-r-1 border-gray-300 hover:bg-blue-100'>
                    <span className='text-sm text-zinc-800'>Return</span>
                        <div className=' text-3xl font-semibold'>18 <span className='text-lg font-normal'>Feb'24</span></div>
                        <span className='text-sm '>sunday</span>
                    </div>
                    <div className='  p-6 border border-r-1 border-gray-300 hover:bg-blue-100 '>
                    <span className='text-sm text-zinc-800'>Travellers & Class</span>
                        <div className=' text-3xl font-semibold'>1 <span className='text-lg font-normal'>Traveller</span></div>
                        <span className='text-sm '>Economy/Premium Economy</span>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default HeroContent
