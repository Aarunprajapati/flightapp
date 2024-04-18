'use client'
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';


interface LabelItem{ 
    label: string;
}

interface RadioButtonProps {
  labels: LabelItem[];
  title?:string;
  sidelabel?:string
  className?: string; 
  setSelect?:(data:any)=>void;
}

const RadioButton= ({ labels, className, title, sidelabel, setSelect }: RadioButtonProps) => {
    const handleSubmit = (event: any) => {
    if (setSelect) {
      setSelect(event);
    }
  };
 
  return (
<div className={`w-full rounded-md flex flex-col md:flex-row items-center justify-between py-5 space-y-4 md:space-y-0 md:space-x-10 ${className}`}>
    <div className='flex flex-col md:flex-row gap-x-3 items-center'>
        <div className='text-black text-xs font-semibold mb-2 text-center'>
            {title}
        </div> 
        <div className='flex items-center justify-start'>
            <RadioGroup defaultValue={`option-${labels[0].label}`} className='flex gap-3 flex-col md:flex-row justify-center lg:items-center'>
                {labels.map((item) => (
                    <div className="flex items-center space-x-2 md:space-x-3" key={item.label}>
                        <RadioGroupItem value={`option-${item.label}`} id={`option-${item.label}`} onClick={()=>handleSubmit(item.label)} />
                        <label htmlFor={`option-${item.label}`} className='text-xs md:text-sm lg:text-sm font-semibold'>
                            {item.label}
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    </div>
    <p className='text-zinc-800 text-sm md:text-md lg:text-lg'>{sidelabel}</p>
</div>


  );
}

export default RadioButton;
