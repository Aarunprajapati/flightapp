"use client";
import { bookschema } from "@/Schemas/BookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormField,
  FormItem,
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { countryCode } from "./countrycode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { useFormContext } from "./context/formcontext";
import toast from "react-hot-toast";
type StepProps = {
  gonext: (FormData: Record<string, any>) => void;
  goprev: () => void;
};

const BookContact = () => {
  const { handleFormNext, handleFormBack, setFormData } = useFormContext();
  const form = useForm<z.infer<typeof bookschema>>({
    resolver: zodResolver(bookschema),
    defaultValues: {
      code: {
        dial_code: "+91",
      },
      phone: "",
      email: "",
    },
  });
  const handleSubmit = (value: z.infer<typeof bookschema>) => {
    if (!(value.email && value.phone)) {
      toast.error("Please enter email and phone");
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, ...value }));
    handleFormNext();
    // form.reset();
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 mx-5 text-blue-500">Add Contact Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="lg:p-4 max-w-full md:max-w-2xl lg:max-w-4xl"
        >
          <div className="border border-gray-300 lg:p-4">
            {/* Mobile Number */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 p-3 border-gray-200 rounded-md w-full">
              <div className="w-full md:w-20">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        "border-none outline-none ring-1 focus:ring-blue-700 ring-blue-700 rounded-md",
                        field.value.dial_code === "+91"
                          ? "text-black focus:bg-blue-500 focus:text-white "
                          : "",
                      )}
                    >
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
                              {countryCode.map((item: any) => (
                                <SelectItem
                                  key={item.name}
                                  value={item.dial_code}
                                  className=" text-black focus:bg-blue-500 focus:text-white"
                                >
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
              <div className="w-full md:w-80">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="outline-none w-full"
                          placeholder="Phone number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2 items-center p-4 md:w-[435px]">
              <FormLabel>Email</FormLabel>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="outline-none"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-2 flex gap-2">
            <Button className="bg-blue-600 text-white" onClick={handleFormBack}>
              Back
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookContact;
