import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";



interface HeroContentSecondProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  disabledDates: { before: Date };
  getDayOfWeek: (date: Date) => string;
  today: Date;
}

const HeroContentSecond = ({date, setDate, disabledDates, getDayOfWeek, today}: HeroContentSecondProps) => {
  return (
    <div>
    <div className='rounded-md flex items-center '>
      {/* Departure date */}
      <Popover>
        <PopoverTrigger asChild>
          <div className='h-[150px]  p-6 border border-r-1 border-gray-300 hover:bg-blue-100 flex flex-col gap-1'>
            <span className='text-sm text-zinc-800'>Departure</span>
            <div className=' text-3xl font-semibold '>
              {date?.from ? (
                <>
                  <div className='text-xl font-semibold'>
                    {format(date.from, "dd MMM''yy")}
                  </div>
                </>
              ) : (
                <div className='text-lg font-semibold'>Departure date</div>
              )}
            </div>
            {date && date.from && (
              <div className='text-sm'>{getDayOfWeek(date.from)}</div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date ? date.from : today}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>

      {/* Return date */}
      <Popover>
        <PopoverTrigger asChild>
          <div className='h-[150px]  p-6 border border-r-1 border-gray-300 hover:bg-blue-100 flex flex-col gap-1'>
            <span className='text-sm text-zinc-800'>Return</span>
            <div className=' text-3xl font-semibold'>
              {date?.to ? (
                <>
                  <div className='text-xl font-semibold'>
                    {format(date.to, "dd MMM''yy")}
                  </div>
                </>
              ) : (
                <div className='text-lg font-semibold'>return date</div>
              )}
            </div>
            {date && date.to && (
              <div className='text-sm'>{getDayOfWeek(date.to)}</div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date ? date.to : today}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>
  );
};

export default HeroContentSecond;
