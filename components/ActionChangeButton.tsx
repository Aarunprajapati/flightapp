import { ArrowLeftRight } from 'lucide-react'
import React from 'react'



const ActionChangeButton = () => {
  return (
    <button className='rounded-full bg-white shadow-lg z-[100]'>
        <ArrowLeftRight className='text-blue-500 w-full h-full p-2'/>
    </button>
  )
}

export default ActionChangeButton
