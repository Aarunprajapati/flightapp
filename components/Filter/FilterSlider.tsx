import React from 'react'
import { ChevronDown } from 'lucide-react';

// shadcn ui componets
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

interface FilterSlideritem{
    label?:string,
    uptoPrice?:string,
    minprice?:string,
    timestart?:string,
    timeend?:string,
    maxprice?:string,
}
interface FilterSliderProps{
    value?:FilterSlideritem[]
}
// * prise and time duration componets of side filter
const FilterSlider = (
    {
       value

    }: FilterSliderProps
) => {
  return (
    <div className='w-full bg-white rounded-lg grid gap-2'>
    <Accordion type="single" collapsible>
        {value?.map((item)=>(
        <AccordionItem value="Our-price" key={item.label}> 
            <AccordionTrigger className=' no-underline hover:no-underline font-semibold text-xs text-foreground mx-2 w-full flex justify-between items-center'>
                {item.label}
                <ChevronDown className=' text-gray-400 font-extralight text-xs'/>
            </AccordionTrigger>
            <AccordionContent className=' shadow-md'> 
                <div className='py-4 mx-2 w-full flex items-start justify-center flex-col gap-2'>
                    <div className=' w-full flex justify-between items-center'>
                    <div className='text-xs text-foreground'> {item.uptoPrice ? item.uptoPrice : item.timestart}</div>
                        <div className=' text-xs text-foreground'>{item.timeend}</div>
                    </div>
                    <Slider defaultValue={[33]} max={100} step={1} className='my-2 cursor-pointer'  /> 
                    <div className=' w-full flex justify-between items-center p-2'>
                        <p className=' text-xs text-foreground'>{item.minprice}</p>
                        <p className=' text-xs text-foreground'>{item.maxprice}</p>                      
                    </div>           
                </div>       
            </AccordionContent>
        </AccordionItem>
    ))}
    </Accordion>
  </div>
  )
}

export default FilterSlider
