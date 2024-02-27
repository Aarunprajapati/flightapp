""
import React from 'react'
import {  travelleSchema } from '@/Schemas/BookSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormField, FormItem, Form, FormControl, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { Nationality } from './nationality'


const BookTravelDeatils = () => {

    const form = useForm<z.infer<typeof travelleSchema>>({
        resolver: zodResolver(travelleSchema),
        defaultValues:{
            firstName: '',
            lastName: '',
            Gender: 'Male',
            Nationality: 'Indian'
        }
    })

    const handleSubmit = (value:z.infer<typeof travelleSchema>)=>{
        console.log(value)
    }

  return (
    <div className=' w-full p-4'>
         <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className='p-4 w-full'>
        
        {/* Mobile Number */}
        <div className="flex items-center space-x-2 p-3 border-gray-200 rounded-md ">

            <div className=''>
                <FormField             
                    control={form.control}
                    name='firstName'
                    render={({field})=>(
                        <FormItem className={cn(" border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md ",
                           
                        )} >
                            <FormControl>
                                <Input className='outline-none' placeholder='First Name' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <div className=''>
                <FormField
                    control={form.control}
                    name='lastName'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                               <Input className='outline-none' placeholder='Last Name' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
                {/* Gender */}
            <div className='grid gap-3 items-center p-4 max-w-xl -mt-6 '>
                <FormLabel>Gender</FormLabel>
                <div>
                    <FormField
                        control={form.control}
                        name='Gender'
                        render={({field})=>(
                            <FormItem className='border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md'>
                                <FormControl>
                                    <Select
                                    value={field.value}
                                    onValueChange={(value)=>field.onChange(value)}
                                    >
                                        <SelectTrigger className=' flex gap-5'>
                                            <SelectValue>{field.value}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="other">other</SelectItem>

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
           
           </div>
        </div>
        <div className='grid gap-3 items-center p-4 max-w-md '>
                <FormLabel>Nationality</FormLabel>
                <div>
                    <FormField
                        control={form.control}
                        name='Nationality'
                        render={({field})=>(
                            <FormItem className='border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md'>
                                <FormControl>
                                    <Select
                                    value={field.value}
                                    onValueChange={(value)=>field.onChange(value)}
                                    >
                                        <SelectTrigger className=' flex gap-5'>
                                            <SelectValue>{field.value}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Nationality?.map((value)=>(
                                                    <SelectItem key={value} value={value}>{value}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
           
           </div>  
        <div className=' px-4 py-2'>
            <Button className='bg-blue-600 text-white ' type="submit">submit</Button>
        </div>
    </form>
</Form>

    </div>
  )
}


export default BookTravelDeatils