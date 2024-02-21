'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const MobileSideBar = () => {
  return (
    <Sheet>
    <SheetTrigger>
        <Button variant='ghost' size='icon' className='lg:hidden items-center flex text-white text-lg rounded-full hover:bg-red-200 transition' >
            <Menu/>
        </Button>
    </SheetTrigger>
    <SheetContent side='left' className='p-0'>
        Hello
    </SheetContent>
</Sheet>
  )
}

export default MobileSideBar
