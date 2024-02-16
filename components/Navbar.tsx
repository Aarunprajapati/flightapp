'use client'

import Image from 'next/image'
import React from 'react'
import { Backpack, Building2, HomeIcon, Plane } from 'lucide-react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import NvavbarButton from './NvavbarButton'
import MobileSideBar from './MobileSideBar'


const datas = [
  {
    icon: HomeIcon ,
    color: "text-green-700",
    bgcolor:"text-green-700/10",
    label:"List your property",
    sublabel:"Start earning today!"
  },
  {
    icon: Building2 ,
    color: "text-red-700",
    bgcolor:"text-red-900/10",
    label:"Introduction myBiz",
    sublabel:"Business Travel Solution"
  },
  {
    icon: Backpack,
    color: "text-yellow-600",
    bgcolor:"text-yellow-700/10",
    label:"My Trips",
    sublabel:"Manage your bookings"
  },
]



const Navbar = () => {
  return (
    <div className= 'flex bg-gray-800 w-full items-center p-4  lg:justify-between h-full mx-auto'>
      <MobileSideBar/>
        <div className=' flex items-center px-5 '>
            <Image src={'/logo.png'} width={100} height={100} alt='logo'  />
        </div>
        <div className=' items-center gap-x-2 px-10 hidden lg:flex '>
        {datas.map((tool)=>(
              <Card
              key={tool.label}
              className="p-1 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                        <tool.icon className={cn("w-8 h-8", tool.color)} />
                    </div>
                    <div>
                        <div className="text-xs font-semibold">
                            {tool.label}
                        </div>
                        <div className="text-xs font-semibold">
                            {tool.sublabel}
                        </div>
                    </div>                  
                </div>
              </Card>
            ))}
            <div>
            <div className=' flex items-center shadow-2xl w-fit h-fit rounded-md p-2 gap-x-2 border-black/5 hover:shadow-xl  transition cursor-pointer bg-white'>
            <Plane className="w-9 h-9 bg-white text-red-800 rounded-md" />
                <NvavbarButton label='Login & Signup'/>
            </div>
            </div>  
        </div>
    </div>
  )
}

export default Navbar
