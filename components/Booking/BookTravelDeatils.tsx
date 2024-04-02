"use client"
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
//* schema
import {  travelleSchema } from '@/Schemas/BookSchema'

//* shadcn ui
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormField, FormItem, Form, FormControl, FormLabel} from '../ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Nationality } from './nationality'
import { useFormContext } from './context/formcontext'
type StepProps = {
    gonext: (FormData: Record<string, any>) => void;
    goprev: () => void;
  };


const BookTravelDeatils = () => {
    const {handleFormNext, handleFormBack, setFormData} = useFormContext()

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
        setFormData((prevFormData)=> ({...prevFormData, ...value}))
        handleFormNext()

    }

  return (
    <div className=' w-full p-4'>
         <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className='p-4 w-full'>
        
        {/* full Name */}
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
        {/* nationality */}
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
        <div className=' px-4 py-2 flex gap-2'>

            <Button className='bg-blue-600 text-white ' onClick={handleFormBack}>Back</Button>
            <Button className='bg-blue-600 text-white '>Submit</Button>
        </div>
    </form>
</Form>


    </div>
  )
}


export default BookTravelDeatils
