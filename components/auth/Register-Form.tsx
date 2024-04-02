
'use client'

import React from 'react'
import * as z from 'zod'
import { registerSchema } from '@/Schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem
} from '@/components/ui/form'
import { useTransition, useState } from 'react';
import axios from 'axios'
import { Input } from '../ui/input';
import CardWrapper from './Card-Wrapper'
import { Button } from '../ui/button';
import { FormError } from '../Form-Error';
import { FormSuccess } from '../FormSuccess';
import toast from 'react-hot-toast';


const RegisterForm = () => {
  const [isPending, StartTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    toast.success("successfully registered");
    setError("");
    setSuccess("");

  
    try {
      
        const res = await axios.post('http://localhost:5000/api/user/register', values);
        console.log(res)
        const data = res.data; 
        setSuccess(data.success);
        form.reset();
      } catch (error:any) {
        setError(error.response.data.error);
     
     
    }
  };
  
  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already Have an Account"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form className=" space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your Name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className=" w-full" disabled={isPending}>
            create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm
