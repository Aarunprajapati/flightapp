/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { travelleSchema } from "@/Schemas/BookSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormField, FormItem, Form, FormControl, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Nationality } from "./nationality";
import { useFormContext } from "./context/formcontext";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51P11cvSHl2BiGxNdJZ6IX8jyGAppzYT7SqwCtHWHH4pKj236HMr4SeOEjYRAODsYtEDVOrftnEs471oQTbhxIxsq008GWpORWY",
);

type FormData = z.infer<typeof travelleSchema>;

const BookTravelDetails = () => {
  const searchParams = useSearchParams();
  const adultsParam = searchParams.get("adults");
  const adults = adultsParam ? parseInt(adultsParam, 10) : 1;
  const childrenParam = searchParams.get("children");
  const children = childrenParam ? parseInt(childrenParam, 10) : 0;
  const totalMembers = adults + children;
  const { handleFormNext, handleFormBack, setFormData, onSubmit, formData } =
    useFormContext();
  const [loading, setLoading] = useState(false);
  // Adjust to hold an array of useForm hooks.
  const form: UseFormReturn<FormData>[] = Array.from({
    length: totalMembers,
  }).map(() =>
    useForm<FormData>({
      resolver: zodResolver(travelleSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        Gender: "Male",
        Nationality: "Indian",
      },
    }),
  );
  const handleSubmit = async () => {
    const allFormData = form.map((forms) => forms.getValues());
    if (allFormData.some((data) => !data.firstName && !data.lastName)) {
      toast.error("Firstname and lastname is required");
      return;
    }
    formData.members = allFormData;
    setFormData((prevData) => ({ ...prevData, ...allFormData }));
    onSubmit({ ...formData });
    handleFormNext();
    setLoading(true);
  };
  
  const getFormHeading = (index:any) => {
    if (index < adults) {
      return "Adult Details";
    } else {
      return "Children Details";
    }
  };

  const renderFormSection = (form: UseFormReturn<FormData>, index: any) => (
    <Form {...form}>
        <h3 className="text-lg font-bold my-2 text-blue-500">{getFormHeading(index)}</h3>
      <form className="mx-auto  lg:p-4">

        {/* Full Name */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-3 border border-gray-200 rounded-md">
          <div className="flex-1 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md">
                  <FormControl>
                    <Input
                      className="outline-none w-full"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 w-full">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="outline-none w-full"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="grid grid-cols-1 gap-4 items-center p-4 border-t mt-4 border-gray-200">
          <FormLabel>Gender</FormLabel>
          <div>
            <FormField
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <FormItem className="border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md">
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="flex justify-between items-center">
                        <SelectValue>
                          {field.value || "Select gender"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Nationality */}
        <div className="grid grid-cols-1 lg:grid-col-3 gap-4 items-center p-4 border-t border-gray-200">
          <FormLabel>Nationality</FormLabel>
          <div>
            <FormField
              control={form.control}
              name="Nationality"
              render={({ field }) => (
                <FormItem className="border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md">
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="flex justify-between items-center">
                        <SelectValue>
                          {field.value || "Select nationality"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Nationality?.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
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
        </div>
      </form>
    </Form>
  );

  return (
    <>
      <div className="w-full flex flex-wrap">
        {form.map((formData, index) => (
          <div key={index} className="w-full lg:w-2/4 lg:p-4">
            <div className="border border-gray-300 lg:p-4 h-full">
              {renderFormSection(formData, index)}
            </div>
          </div>
        ))}
        <div className="w-full mt-4 flex flex-col sm:flex-row justify-between items-center">
          <Button
            className="bg-blue-600 text-white px-6 py-2 mb-4 sm:mb-0"
            onClick={handleFormBack}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-2"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit All"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default BookTravelDetails;
