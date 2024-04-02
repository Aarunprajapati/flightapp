"use client";

import React from "react";
import * as z from "zod";
import { formSchema } from "@/Schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { useTransition, useState } from "react";

import { Input } from "../ui/input";
import CardWrapper from "./Card-Wrapper";
import { Button } from "../ui/button";
import { FormError } from "../Form-Error";
import { FormSuccess } from "../FormSuccess";
// import { login } from '@/actions/login';
import { useRouter, useSearchParams } from "next/navigation";
// import { login } from '@/actions/login';
import axios from "axios";
import toast from "react-hot-toast";
import axiosinstance from "@/axiosinstance";

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") == "OAuthAccountNotLinked"
      ? "Email already linked with different Provider"
      : "";

  const [isPending, StartTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (Values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        Values,
        { withCredentials: true },
      );
      const data = res.data;
      setSuccess(data.data.success);
      router.push("/")
      form.reset();
    } catch (error: any) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome to Login Form"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form className=" space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" space-y-4">
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
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className=" w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
