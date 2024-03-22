import { bookschema } from '@/Schemas/BookSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormField, FormItem, Form, FormControl, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { countryCode } from './countrycode'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { cn } from '@/lib/utils'
type StepProps = {
    gonext: (FormData: Record<string, any>) => void;
    goprev: () => void;
  };


const BookContact = ({gonext, goprev}:StepProps) => {
    const form = useForm<z.infer<typeof bookschema>>({
        resolver: zodResolver(bookschema),
        defaultValues:{
            code:{
                dial_code:'+91'
            },
            phone:'',
            email:''
        }
    })
    const handleSubmit = (value: z.infer<typeof bookschema>) => {
        console.log(value)
        form.reset();
    }
  return (
    <div className=' p-4 '>
       <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className='p-4 max-w-2xl'>
        
        {/* Mobile Number */}
        <div className="flex items-center col-span-12 space-x-2 p-3  border-gray-200 rounded-md w-full">

            <div className='w-20'>
                <FormField             
                    control={form.control}
                    name='code'
                    render={({field})=>(
                        <FormItem className={cn(" border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md ",
                            field.value.dial_code === "+91" ? "text-black focus:bg-blue-500 focus:text-white " : ""
                        )} >
                            <FormControl>
                            <Select
                            value={field.value.dial_code}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="+91" />
                                </SelectTrigger>
                                <SelectContent defaultValue={"+91"}>
                                    <SelectGroup>
                                    {countryCode.map((item:any) => (
                                        <SelectItem key={item.name} value={item.dial_code} className=' text-black focus:bg-blue-500 focus:text-white'>
                                             {item.name}({item.dial_code})
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <div className='w-80'>
                <FormField
                    control={form.control}
                    name='phone'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input className='outline-none' placeholder='phone no' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
      
        {/* Email */}
        <div className='grid gap-2 items-center p-4 max-w-[440px]'>
            <FormLabel>Email</FormLabel>
            <div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input className='outline-none' placeholder='email' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
        {/* <div className=' px-4 py-2'>
            <Button className='bg-blue-600 text-white ' type="submit">submit</Button>
        </div> */}
    </form>
</Form>
    </div>
  )
}

export default BookContact
