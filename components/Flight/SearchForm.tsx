'use client'
import { formSchema } from '@/Schemas/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import React from 'react'
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
import { Input } from "@/components/ui/input"

const SearchForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            route: {
                oneway: 'oneway',
                roundtrip: 'roundtrip'
            },
            location: '',
            onward: undefined,
            return: undefined,
            travells: {
                adults: 1,
                children: 0
            }
        }
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {}

  return (
    <div className=' flex items-center p-4 h-full w-full mx-auto'>

      
    </div>
  )
}

export default SearchForm
