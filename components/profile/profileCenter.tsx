"use client";
import React from "react";
import { Button } from "../ui/button";
import axiosinstance from "@/axiosinstance";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { phoneNumberSchema } from "@/Schemas";

const ProfileCenter = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    profilePic: null,
  });

  const Fetchdata = async () => {
    try {
      const response = await axiosinstance.get("/profile");
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error in fetch", error);
    }
  };

  React.useEffect(() => {
    Fetchdata();
  }, []);

  const defaultPhoneNumber = userData.phoneNumber || "";


  const form = useForm<z.infer<typeof phoneNumberSchema>>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: defaultPhoneNumber,
    },
  });

  const onSubmit = async (values: z.infer<typeof phoneNumberSchema>) => {
    try {
      const res = await axiosinstance.post("/updateUser", values);
      form.reset();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="me-36">
      <p className="text-2xl font-bold">Profile</p>
      <p className="text-xl mt-4 font-semibold">Login information</p>

      <div className="my-4">
        <div>
          <p>Mobile number</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold">{userData.phoneNumber}</p>
          <div className="ms-80">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">
                  <p className="text-blue-800 font-serif text-lg">edit</p>
                </Button>
              </DialogTrigger>
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                    </DialogHeader>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Mobile number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              className="col-span-3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save changes</Button>
                  </DialogContent>
                </form>
              </Form>
            </Dialog>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
      </div>
   
      <div>
        <div>
          <p>Email address</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold">{userData.email}</p>
        </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="font-semibold">Personal information</p>
        <div className="ms-80">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">
                <p className="text-blue-800 font-serif text-lg">edit</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={userData.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Birthday
                  </Label>
                  <Input
                    id="Birthday"
                    defaultValue={userData.dob}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Gender
                  </Label>
                  <Input
                    id="Gender"
                    defaultValue={userData.gender}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-2">
        <p>Full name</p>
        <p className="font-semibold">{userData.name}</p>
      </div>
      <div className="border-b-2 border-gray-300 mt-2"></div>
      <div className="mt-4">
        <p>Birthday</p>
        <p className=" font-light">{userData.dob}</p>
      </div>
      <div className="border-b-2 border-gray-300 mt-2"></div>
      <div className="mt-4">
        <p>Gender</p>
        <p className="font-light">{userData.gender}</p>
      </div>
      <div className="border-b-2 border-gray-300 mt-2"></div>
    </div>
  );
};

export default ProfileCenter;
