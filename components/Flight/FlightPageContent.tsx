import React from 'react'
import HeaderPage from './HeaderPage'
import { ArrowLeftRight } from 'lucide-react'
import NvavbarButton from '../NvavbarButton'
import SeacrhButton from '../CustomButton'
import CustomButton from '../CustomButton'
import { Input } from '@/components/ui/input'
import FilterSider from './FilterSider'
 

const FlightPageContent = () => {
  return (
    <div className='w-full mx-auto'>
        <div className=' flex h-20 mx-60 bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300'>
            <HeaderPage/>
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
            <CustomButton label='Search'/>
        </div>
        <main className=' grid grid-cols-12 gap-x-2 gap-y-10 mx-60'>
            <div className=' col-span-3 p-4 flex flex-col flex-1 bg-red-400'>
                <FilterSider/>
            </div>
            <div className=' col-span-9 p-4 bg-blue-400 '>hello2</div>
        </main>
    
    </div>
  )
}

export default FlightPageContent
