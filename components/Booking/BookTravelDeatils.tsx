"use client"
import React, { useState } from 'react'
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
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51P11cvSHl2BiGxNdJZ6IX8jyGAppzYT7SqwCtHWHH4pKj236HMr4SeOEjYRAODsYtEDVOrftnEs471oQTbhxIxsq008GWpORWY');
type StepProps = {
    gonext: (FormData: Record<string, any>) => void;
    goprev: () => void;
  };


const BookTravelDeatils = () => {
    const {handleFormNext, handleFormBack, setFormData, onSubmit, formData} = useFormContext()
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof travelleSchema>>({
        resolver: zodResolver(travelleSchema),
        defaultValues:{
            firstName: '',
            lastName: '',
            Gender: 'Male',
            Nationality: 'Indian'
        }
    })

    const handleSubmit = async (value:z.infer<typeof travelleSchema>)=>{
        // console.log(value, "form values vbhfbjvcjm")
        setFormData((prevFormData)=> ({...prevFormData, ...value}))
        onSubmit({...formData,...value})
        handleFormNext()
        setLoading(true);
        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formData }),
            });
            const session = await response.json();
            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
                if (error) {
                    console.error(error.message);
                    setLoading(false);
                }
            } else {
                console.error('Stripe is null');
            }
           
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }


  return (
    <div className=' w-full p-4'>
         <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)}  action="/create-checkout-session" className='p-4 w-full'>
        
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
            <Button type='submit' className='bg-blue-600 text-white' disabled={loading}>
                        {loading ? 'Processing...' : 'Submit'}
            </Button>
        </div>
    </form>
</Form>
    </div>
  )
}


export default BookTravelDeatils
