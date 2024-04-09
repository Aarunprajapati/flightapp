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
const stripePromise = loadStripe(
  "pk_test_51P11cvSHl2BiGxNdJZ6IX8jyGAppzYT7SqwCtHWHH4pKj236HMr4SeOEjYRAODsYtEDVOrftnEs471oQTbhxIxsq008GWpORWY",
);

type FormData = z.infer<typeof travelleSchema>;

// interface BookTravelDetailsProps {
//   gonext: (formData: Record<string, any>) => void;
//   goprev: () => void;
// }

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
    console.log(allFormData, "allformdata")
    // const combinedFormData = allFormData.reduce(
    //   (acc, currentForm) => ({ ...acc, ...currentForm }),
    //   {},
    // );

    // console.log(combinedFormData, "combined form data");;

    setFormData((prevData) => ({ ...prevData, ...allFormData }));
    formData.members = allFormData;
    onSubmit({ ...formData });
    handleFormNext();
    setLoading(true);
    // try {
    //   const stripe = await stripePromise; // Assuming stripePromise is defined elsewhere correctly.
    //   const response = await fetch("/create-checkout-session", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ combinedFormData }),
    //   });

    //   if (!response.ok) {
    //     // Handle HTTP errors
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const session = await response.json();

    //   if (stripe) {
    //     const { error } = await stripe.redirectToCheckout({
    //       sessionId: session.id,
    //     });
    //     if (error) {
    //       console.error(error.message);
    //       // Optionally, inform the user of the checkout error
    //     }
    //   } else {
    //     throw new Error("Stripe couldn't be initialized.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   // Optionally, inform the user of the error
    // } finally {
    //   setLoading(false);
    // }
  };

  const renderFormSection = (form: UseFormReturn<FormData>, index: any) => (
    <Form {...form}>
      <form 
      // action={"/create-checkout-session"}
       key={index}>
        {/* Full Name */}
        <div className="flex items-center space-x-2 p-3 border-gray-200 rounded-md">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md">
                  <FormControl>
                    <Input
                      className="outline-none"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="outline-none"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Gender */}
          <div className="grid gap-3 items-center p-4 max-w-xl -mt-6">
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
                        <SelectTrigger className="flex gap-5">
                          <SelectValue>{field.value}</SelectValue>
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
        </div>

        {/* Nationality */}
        <div className="grid gap-3 items-center p-4 max-w-md">
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
                      <SelectTrigger className="flex gap-5">
                        <SelectValue>{field.value}</SelectValue>
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
      <div className="p-4 flex justify-between w-full flex-wrap">
        {form.map(renderFormSection)}
      </div>
      <div className="px-4 py-2 flex justify-end gap-2">
        <Button className="bg-blue-600 text-white" onClick={handleFormBack}>
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit All"}
        </Button>
      </div>
    </>
  );
};
export default BookTravelDetails;
