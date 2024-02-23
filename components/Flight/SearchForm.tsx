"use client"
import { formSchema } from '@/Schemas/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { RefAttributes, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z  from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import HeroContent from '../HeroContent'
import HeaderPage from './HeaderPage'
import { ArrowLeftRight, CalendarIcon, MinusCircleIcon, Plus, PlusCircleIcon } from 'lucide-react'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import CustomButton from '../CustomButton'

const SearchForm = () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [date1, setDate1] = useState<Date | undefined>(undefined);
    const router = useRouter()
    const  form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            route: '',
            location:'',     
            locationR:'',     
            adults: '',
            children: '',
        },
    });
 
      
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("sdsd")
        console.log(values)
        
        form.reset()
        
    }

  return (
        <div className=' w-full space-y-2 my-5'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col lg:flex-row  items-center lg:max-w-[1400px] lg:mx-auto space-y-4 lg:space-y-0 space-x-0 lg:space-x-2 rounded-lg   '>
                    <div className='grid gap-1.5 justify-start lg:max-w-sm items-center '>
                       <FormField
                       control={form.control}
                       name="route"
                       render={({field})=>(
                        <FormItem>
                            <FormLabel className=' flex text-black'>Route</FormLabel>
                            <FormControl>
                                <div className='w-[150px] flex items-center space-y-5'>
                        <select  {...field} className="border-none outline-none ring-1 ring-blue-600 p-2 rounded-sm">
                            <option  value="">Select the trip</option>  
                            <option value="one way">One Way</option>
                            <option value="Rounded trip">Rounded trip</option>
                        </select>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                       )}                    
                       />     
                    </div>

                    <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                    <FormField
                      control={form.control}
                      name='location'
                      render={({ field: {...field } }) => ( 
                      <FormItem>
                      <FormLabel className='flex text-black'>From</FormLabel>
                    <FormControl>
                     <Input type="text" placeholder="From" {...field} />
                     </FormControl>
                      <FormMessage />
                      </FormItem>
                     )}
                    />
                    </div>
                    
                    <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                    <FormField
                      control={form.control}
                      name='locationR'
                      render={({ field: {...field } }) => ( 
                      <FormItem>
                      <FormLabel className='flex text-black'>To</FormLabel>
                    <FormControl>
                     <Input type="text" placeholder="From" {...field} />
                     </FormControl>
                      <FormMessage />
                      </FormItem>
                     )}
                    />
                    </div>





                <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                           <FormField
                           control={form.control}
                           name='dates'
                           render={( {field} )=>(
                                <FormItem >
                                    <FormLabel className=' flex text-black'>Onward</FormLabel>
                                   
                                    <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                    <div className={cn("grid gap-2",)}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "justify-start text-left font-normal",
                                            "text-muted-foreground"
                                            )}
                                        
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                                initialFocus
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(selectedDate) => {
                                                    setDate(selectedDate); 
                                                    field.onChange(selectedDate); 
                                                }}
                                                numberOfMonths={2}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        {/* <Calendar selected={date} onSelect={setDate} /> */}
                                        </PopoverContent>
                                    </Popover>
                            </div>
                            {/* <FormMessage/> */}
                                    </FormControl>
                                </FormItem>
                           )}


                           />
                    </div>

                <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                           <FormField
                           control={form.control}
                           name='dateR'
                           render={( {field} )=>(
                                <FormItem >
                                    <FormLabel className=' flex text-black'>Return</FormLabel>
                                   
                                    <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                    <div className={cn("grid gap-2",)}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "justify-start text-left font-normal",
                                            "text-muted-foreground"
                                            )}
                                        
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                                initialFocus
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(selectedDate) => {
                                                    setDate1(selectedDate); 
                                                    field.onChange(selectedDate); 
                                                }}
                                                numberOfMonths={2}
                                                disabled={(date1) => date1 < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        {/* <Calendar selected={date} onSelect={setDate} /> */}
                                        </PopoverContent>
                                    </Popover>
                            </div>
                            {/* <FormMessage/> */}
                                    </FormControl>
                                </FormItem>
                           )}


                           />
                    </div>

                   





                    <div className=' flex items-center w-full space-x-2'>
                    <div className=' grid items-center flex-1'>
                            <FormField
                            control={form.control}
                            name='adults'
                            render={({ field: {...field } })=>(
                            <FormItem>
                            <FormLabel className=' flex text-black'>Adults</FormLabel>
                           
                            <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>               
                                <Input placeholder='No of adults' type='text' {...field} />
                            </FormControl>
                            <FormMessage/>                 
                            </FormItem>
                            )}
                    />
                    </div>
                    
                    </div>

                    <div className='flex items-center w-full space-x-2'>
                    <div className=' grid items-center flex-1'>
                        <FormField
                        control={form.control}
                        name='children'
                        render={({ field: {...field } })=>(
                        <FormItem>
                        <FormLabel className=' flex text-black'>Childrens</FormLabel>
                        
                        <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>           
                            <Input placeholder='no of childrens' type='text' {...field} />
                        </FormControl> 
                        <FormMessage/>                
                        </FormItem>
                        )}
                        />                    
                    
                    
                    </div>
                    </div>
                   
                    <div className='flex items-center  space-x-2'>
                        <div className=' grid items-center flex-1 mt-5'>
                           {/* </button type="submit">search</> */}
                           <Button type='submit'>Search</Button>
                        </div>
                    </div> 
                    
                   
                </form>
            </Form>
        </div>
  );
};                     

export default SearchForm

{/* <div className='grid w-full gap-1.5 lg:max-w-xs items-center'>
<FormField
control={form.control}
name='dates'
render={(field)=>(
     <FormItem>
         <FormLabel className=' flex text-black'>Return</FormLabel>
         {/* <FormMessage/> */}
        //  <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
        //  <div className={cn("grid gap-2",)}>
        //  <Popover>
        //      <PopoverTrigger asChild>
        //      <Button
        //          id="date"
        //          variant={"outline"}
        //          className={cn(
        //          "justify-start text-left font-normal",
        //           "text-muted-foreground"
        //          )}
            //  >
            //      <CalendarIcon className="mr-2 h-4 w-4" />
            //      {date1 ? format(date1, "PPP") : <span>Pick a date</span>}
            //  </Button>
            //  </PopoverTrigger>
            //  <PopoverContent className="w-auto p-0" align="start">
            //  <Calendar
            //      initialFocus
            //      mode="single"
                 // defaultMonth={date?.to}
//                  selected={date1}
//                  onSelect={setDate1}
//                  numberOfMonths={2}
//                  // initialFocus
//                  disabled={(date1)=>
//                      date1 < new Date(new Date().setHours(0, 0, 0, 0))
//                  }
//              />
//              </PopoverContent>
//          </Popover>
//  </div>
//          </FormControl>
//      </FormItem>
// )}
// />
// </div> 