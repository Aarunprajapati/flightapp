import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectGroup } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { ArrowBigDown, ChevronDown } from 'lucide-react';

interface Filter {
  label?: string;
  value1?: string;
  value2?: string;
  time1?: string;
  time2?: string;
  value3?: string;
  value4?: string;
  value5?: string;
  value6?: string;
  price1?: string;
  price2?: string;
  price3?: string;
  price4?: string;
  price5?: string;
  price6?: string;

}

interface FlightSiderProps {
  filter?: Filter[];
}

const FilterSiderAirlines = ({ filter }: FlightSiderProps) => {
  return (
    <div className='w-full bg-white rounded-lg grid gap-2'>
      <Accordion type="single" collapsible>
        {filter?.map((item) => (
          <AccordionItem value={`item-${item.label}`} key={item.label}> 
       
            <AccordionTrigger className=' no-underline hover:no-underline font-semibold text-xs text-foreground mx-2 w-full flex justify-between items-center'>
              {item.label}
              <ChevronDown className=' text-gray-400 font-extralight text-xs'/>
            </AccordionTrigger>
       
          
              <AccordionContent className=' shadow-md'>        
                    <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg  ">
                      <div className='flex items-center'>
                        <Checkbox defaultChecked id={`non-stop-${item.label}`} className=' mx-2' />
                        <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                          {item.value1}
                        </label>
                      </div>
                      <p className='font-extralight text-xs'>{item.price1}</p>
                    </div>
                    <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg ">
                      <div className='flex items-center'>
                        <Checkbox defaultChecked id={`non-stop-${item.label}`} className=' mx-2' />
                        <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                          {item.value2}
                        </label>
                      </div>
                      <p className='font-extralight text-xs'>{item.price2}</p>
                    </div>
                    {/* for Airlines filter */}

                    <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg ">
                      <div className='flex items-center'>
                        <Checkbox defaultChecked id={`non-stop-${item.label}`} className=' mx-2' />
                        <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                          {item.value3}
                        </label>
                      </div>
                      <p className='font-extralight text-xs'>{item.price3}</p>
                    </div>
                    <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg ">
                      <div className='flex items-center'>
                        <Checkbox defaultChecked id={`non-stop-${item.label}`} className=' mx-2' />
                        <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                          {item.value4}
                        </label>
                      </div>
                      <p className='font-extralight text-xs'>{item.price4}</p>
                    </div>
                    <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg">
                      <div className='flex items-center'>
                        <Checkbox defaultChecked id={`non-stop-${item.label}`} className=' mx-2'  />
                        <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                          {item.value5}
                        </label>
                      </div>
                      <p className='font-extralight text-xs'>{item.price5}</p>
                    </div>
                    <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg  ">
                      <div className='flex items-center'>
                        <Checkbox defaultChecked id={`non-stop-${item.label}`} className=' mx-2' />
                        <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                          {item.value6}
                        </label>
                      </div>
                      <p className='font-extralight text-xs'>{item.price6}</p>
                    </div>
                    {/* end check box */}
                    
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSiderAirlines;
