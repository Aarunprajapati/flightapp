import React from 'react'

const HeroContentSecond = () => {
  return (
    <div>
           <div className='rounded-md flex h-[150px]'>
                    <div className=' p-6 space-y-1 border border-r-1 border-gray-300 hover:bg-blue-100 '>
                        <span className='text-sm text-zinc-800'>Departure</span>
                        <div className=' text-3xl font-semibold'>18 <span className='text-lg font-normal'>Feb'24</span></div>
                        <span className='text-sm '>Friday</span>
                    </div>
                    <div className='  p-6 border border-r-1 border-gray-300 hover:bg-blue-100'>
                    <span className='text-sm text-zinc-800'>Return</span>
                        <div className=' text-3xl font-semibold'>18 <span className='text-lg font-normal'>Feb'24</span></div>
                        <span className='text-sm '>Friday</span>
                    </div>
                    <div className='  p-6 border border-r-1 border-gray-300 hover:bg-blue-100 '>
                    <span className='text-sm text-zinc-800'>Travellers & Class</span>
                        <div className=' text-3xl font-semibold'>1 <span className='text-lg font-normal'>Traveller</span></div>
                        <span className='text-sm '>Economy/Premium Economy</span>
                    </div>
                </div>
    </div>
  )
}

export default HeroContentSecond
