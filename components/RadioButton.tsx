'use client'
import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import HeroContent from './HeroContent';


interface LabelItem{ 
    id?:Number, 
    label: string;
}

interface RadioButtonProps {
  labels: LabelItem[];
  title?:string;
  sidelabel?:string
  className?: string; 
}

const RadioButton: React.FC<RadioButtonProps> = ({ labels, className, title, sidelabel }) => {
  return (
    <div>
      <div className={cn('w-full rounded-md md:flex items-center justify-between p-10 space-x-10 hidden ', className)}>
        <div className='flex gap-x-3'>
            <div className='text-black text-sm font-semibold max-w-20'>
                {title}
            </div> 
            <div className='flex items-center'>
              <RadioGroup defaultValue={`option-${labels[0].label}`} className='flex items-center lg:space-x-2 space-x-5'>
                {labels.map((item) => (
                    <div className="flex items-center space-x-2"  key={item.label}>
                        <RadioGroupItem value={`option-${item.label}`} id={`option-${item.label}`} />
                        <Label htmlFor={`option-${item.label}`} className='text-md font-semibold space-x-2'>
                        {item.label}
                        </Label>
                    </div>
                  ))}
              </RadioGroup>
              </div>
              
                   

        </div>
        <p className='text-zinc-800 text-md'>{sidelabel}</p>
      </div>
    </div>
  );
}

export default RadioButton;
