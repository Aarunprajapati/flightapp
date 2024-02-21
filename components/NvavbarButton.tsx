'use client'
import { Plane } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
interface ButtonProps{
  label: string
  href?: string
}

const NvavbarButton = ({label,href}:ButtonProps) => {
  return (
    <div className=' flex items-center gap-x-2 hover:shadow-xl  transition cursor-pointer bg-white rounded-md'>
             
                <Button className='flex items-center p-2 ' variant={'outline'}>
                  {label}                
                </Button>          
                     
    </div>
  )
}

export default NvavbarButton
