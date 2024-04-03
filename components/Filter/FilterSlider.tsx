"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// shadcn UI components
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

interface FilterSliderItem {
  label?: string,
  uptoPrice?: number,
  minprice?: number,
  timeStart?: string,
  timeEnd?: string,
  maxprice?: number,
}

interface FilterSliderProps {
  value?: FilterSliderItem[];
  setPrice?: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterSlider = ({ value, setPrice }: FilterSliderProps) => {
  const [price1, setprice1] = useState<number[]>([3000, 5000]);
const handleChange = (value: number[]) => {
  if (setPrice) {
    setprice1(value);
    
      setPrice(value);
  }
}
  return (
    <div className="w-full bg-white rounded-lg grid gap-2">
      <Accordion type="single" collapsible>
        {value?.map((item, index) => (
          <AccordionItem value="Our-price" key={item.label}>
            <AccordionTrigger className="no-underline hover:no-underline font-semibold text-xs text-foreground mx-2 w-full flex justify-between items-center">
              {item.label}
              <ChevronDown className="text-gray-400 font-extralight text-xs" />
            </AccordionTrigger>
            <AccordionContent className="shadow-md">
              <div className='text-sm font-normal'>{price1[0]} &#8377;</div>
              <div className="py-4 w-full flex items-start justify-center flex-col gap-2">
                <Slider
                  min={item.minprice}
                  max={item.maxprice}
                  step={1}
                  className="my-2 cursor-pointer"
                  onValueChange={handleChange}
                />
                <div className="flex justify-between w-full text-xs">
                  <span>{item.minprice} &#8377;</span>
                  <span>{item.maxprice} &#8377;</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSlider;
