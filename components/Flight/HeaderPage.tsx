import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"



const HeaderPage = () => {
  return (
    <div className=' flex items-center space-y-5'>
          <Select>
                <SelectTrigger className="w-[150px] border-none outline-none ring-1 ring-blue-600 rounded-sm">
                    <SelectValue placeholder="one way" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="one way" className=' text-black focus:text-white focus:bg-blue-500 '>One Way</SelectItem>
                    <SelectItem value="rounded trip" className=' text-black focus:text-white focus:bg-blue-500 '>Rounded trip</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
    </div>
  )
}

export default HeaderPage
