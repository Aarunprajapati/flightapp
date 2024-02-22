'use client'
import React, { useState } from 'react';
import { Select, SelectContent, SelectTrigger } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { SelectGroup } from '../ui/select';
import { ifError } from 'assert';
interface filter{
  label?:string,
  value1?:string,
  value2?:string,
  time1?:string,
  time2?:string,
}

interface FlightSiderProps{
  filter?: filter[]
}

const FilterSider = ({filter}:FlightSiderProps) => {
  

  return (
    <div className='w-full bg-white rounded-lg grid gap-2'>
     
      <Select>
        <div className='shadow-md rounded-lg'>
          <SelectTrigger
            className="w-full border-none outline-none transition-all duration-200 ease-in-out relative"
            >
           Stop
          </SelectTrigger>
            {filter?.map((item)=>(
          <SelectContent className='w-full outline-none transition-all duration-200 ease-in-out' key={item.label}>
            <SelectGroup>
              <div className="flex items-center justify-between space-x-2 py-4 w-full hover:bg-blue-50 rounded-lg">
                <div className=' flex items-center'>
                  <Checkbox id="non-stop" className='mx-2' />
                  <label
                    htmlFor="non-stop"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light text-foreground"
                  >
                    {item.value1}
                  </label>
                </div>
                <p className=' font-extralight text-sm text-foreground'>{item.time1}</p>
              </div>
            </SelectGroup>
            <SelectGroup>
              <div className="flex items-center justify-between space-x-2 py-4 w-full hover:bg-blue-50 rounded-lg">
                <div className=' flex items-center'>
                <Checkbox id="one-stop" className='mx-2' />
                <label
                  htmlFor="one-stop"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.value2}
                </label>
                </div>
                <p className=' font-extralight text-sm text-foreground'></p>
              </div>
            </SelectGroup>
          </SelectContent>
        ))}
        </div>
      </Select>

    </div>
  );
};

export default FilterSider;
