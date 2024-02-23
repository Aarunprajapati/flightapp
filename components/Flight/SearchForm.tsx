"use client"
import { formSchema } from '@/Schemas/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { RefAttributes, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            route: '',
            // dates:{
            //     from: 'oneway',
            //     to: 'roundtrip'
            // },
            // location: {},     
            // adults: 1,
            // children: 0
        
        }
    })
 
      
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("sdsd")
        // console.log(values)
        
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
                                    <Select>
                                    <SelectTrigger className="border-none outline-none ring-1 ring-blue-600 rounded-sm">
                                    <SelectValue placeholder='one way'/>
                                    </SelectTrigger>
                                                <SelectContent {...field}>
                                                <SelectGroup>
                                                <SelectItem value="one way" className=' text-black focus:text-white focus:bg-blue-500' >one way</SelectItem>
                                                <SelectItem value="rounded trip" className=' text-black focus:text-white focus:bg-blue-500 '>Rounded trip</SelectItem>
                                                </SelectGroup>
                                                </SelectContent>
                                                </Select>
                                            </div>   
                            </FormControl>
                                            <FormMessage/>
                        </FormItem>
                       )}                    
                       />     
                    </div>
                    {/* <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                        <FormField
                        control={form.control}
                        name='location'
                        render={(field)=>(
                            <FormItem>
                                <FormLabel className=' flex text-black'>From</FormLabel>
                                <FormMessage/>
                                <FormControl>
                                        <div className=' flex items-center '>
                                            <Input type="text" placeholder="From" {...field}/>
                                          
                                        </div>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                        <FormField
                        control={form.control}
                        name='location'
                        render={(field)=>(
                            <FormItem>
                                <FormLabel className=' flex text-black'>To</FormLabel>
                                <FormMessage/>
                                <FormControl>
                                        <div className=' flex items-center '>
                                            <Input type="text" placeholder="From" {...field}/>
                                          
                                        </div>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                           <FormField
                           control={form.control}
                           name='onward'
                           render={(field)=>(
                                <FormItem >
                                    <FormLabel className=' flex text-black'>Onward</FormLabel>
                                    <FormMessage/>
                                    <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                    <div className={cn("grid gap-2",)}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "justify-start text-left font-normal",
                                            !field?.onward && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dates.from ? 
                                           
                                                <>
                                                {format(date.from, "LLL dd, y")}
                                            
                                                </>
                                                :"Onward Date"
                                            }
                                            
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.to}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                            disabled={(date)=>
                                                date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                        />
                                        </PopoverContent>
                                    </Popover>
                            </div>
                                    </FormControl>
                                </FormItem>
                           )}


                           />
                    </div>
                    <div className='grid w-full gap-1.5 lg:max-w-xs items-center'>
                           <FormField
                           control={form.control}
                           name='return'
                           render={(field)=>(
                                <FormItem>
                                    <FormLabel className=' flex text-black'>Return</FormLabel>
                                    <FormMessage/>
                                    <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                    <div className={cn("grid gap-2",)}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value?.to ? 
                                           
                                                <>
                                                {format(date.to, "LLL dd, y")}
                                            
                                                </>
                                                :"Return Date"
                                            }                                           
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.to}
                                            selected={field.date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                            disabled={(date)=>
                                                date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                        />
                                        </PopoverContent>
                                    </Popover>
                            </div>
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
                            render={(field)=>(
                            <FormItem>
                            <FormLabel className=' flex text-black'>Adults</FormLabel>
                            <FormMessage/>
                            <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                            
                                <Input placeholder='No of adults' type='text' {...field} />
                            </FormControl>                 
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
                        render={(field)=>(
                        <FormItem>
                        <FormLabel className=' flex text-black'>Childrens</FormLabel>
                        <FormMessage/>
                        <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                        
                            <Input placeholder='no of childrens' type='text' {...field} />
                        </FormControl>                 
                        </FormItem>
                        )}
                        />                    
                    
                    
                    </div>
                    </div>
                    */}
                    <div className='flex items-center w-full space-x-2'>
                        <div className=' grid items-center flex-1 mt-5'>
                           <button type="submit">search</button>
                        </div>
                    </div> 
                    
                   
                </form>
            </Form>
        </div>
  )
}

export default SearchForm
