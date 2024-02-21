import React from 'react'
import HeaderPage from './Flight/HeaderPage'
import { Input } from '@/components/ui/input'
import { ArrowLeftRight } from 'lucide-react'

const Garbaj = () => {
  return (
    <div>
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
    </div>
  )
}

export default Garbaj
