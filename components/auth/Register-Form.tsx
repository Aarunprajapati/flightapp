"use client";

import React from "react";
import * as z from "zod";
import { registerSchema } from "@/Schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { useTransition, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import CardWrapper from "./Card-Wrapper";
import { Button } from "../ui/button";
import { FormError } from "../Form-Error";
import { FormSuccess } from "../FormSuccess";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosinstance from "@/axiosinstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, StartTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      dob: "",
      profilePic: undefined,
    },
  });
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log(values, "values");
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob);
      formData.append("profilePic", values.profilePic);

      const res = await axiosinstance.post("/register", formData, {
        withCredentials: true
      });

      const data = res.data.data;
      setSuccess(data.success);
      router.push("/");
      form.reset();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.error
        : error.message;
      toast.error(
        "Something went wrong while creating account: " + errorMessage,
      );
      setError(errorMessage);
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
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="space-y-4">
            {/* Fields Name and Email aligned side by side */}
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
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
            </div>

            {/* Fields Password and Phone No aligned side by side */}
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone No</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your Phone Number"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Gender and Dob side by side */}
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Gender</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full border border-blue-800">
                          <SelectValue placeholder="Select the gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="w-full rounded-md">
                            <SelectItem
                              className="text-black focus:bg-blue-500 focus:text-white"
                              value="Male"
                            >
                              Male
                            </SelectItem>
                            <SelectItem
                              className="text-black focus:bg-blue-500 focus:text-white"
                              value="Female"
                            >
                              Female
                            </SelectItem>
                            <SelectItem
                              className="text-black focus:bg-blue-500 focus:text-white"
                              value="Other"
                            >
                              Other
                            </SelectItem>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder="Enter your Date of Birth"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Avatar field on its own line */}
            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="profilePic"
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
