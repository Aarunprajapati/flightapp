"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axiosinstance from "@/axiosinstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { phonenumberSchema } from "./ProfilepageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "../ui/scroll-area";
// import { Input } from "@/components/ui/input"

const ProfileCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen, "isOpen");
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    profilePic: null,
  });
  const [googleUser, setGoogleUser] = React.useState({
    name: "",
    email: "",
    image: "",
  });
  console.log(userData, "usaerdata");

  const form = useForm<z.infer<typeof phonenumberSchema>>({
    resolver: zodResolver(phonenumberSchema),
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      phoneNumber: "",
    },
  });

  const handlesubmit = async (values: z.infer<typeof phonenumberSchema>) => {
    // console.log(values, "values");

    const response = await axiosinstance.put("/updateprofile", values);
    setIsOpen(false);
    if (response.status === 200) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Error updating profile");
    }
  };

  const Fetchdata = async () => {
    try {
      const response = await axiosinstance.get("/profile");
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error in fetch");
    }
  };

  const googleFetchdata = async () => {
    try {
      const response = await axiosinstance.get("/googleUserData");
      console.log(response.data.user, "googleuser");
      setGoogleUser(response.data.user);
    } catch (error) {
      console.error("Error in fetch");
    }
  };

  const handledeleteuser = async () => {
    try {
      const res = await axiosinstance.delete("/deleteuser");
      console.log(res.data.message);
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Error in deleting user");
    }
  };

  React.useEffect(() => {
    Fetchdata();
    googleFetchdata();
  }, []);

  return (
    <>
      <div className="w-[40%]">
        <div className=" flex jutiify-between w-full">
          <p className="text-2xl font-bold">Profile</p>
          {/* edit profile */}
          <div className=" flex gap-10">
            <Dialog
              open={isOpen}
              onOpenChange={() => {
                setIsOpen(!isOpen);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="text-blue-800 font-serif text-lg  ms-[450px]"
                >
                  edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handlesubmit)}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      {/* Fields Name and Email aligned side by side */}
                      <div className="my-2 grid gap-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  defaultValue={userData.name}
                                  type="text"
                                  placeholder="Enter your Name"
                                  {...field}
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
                              <FormLabel
                                htmlFor="phoneNumber"
                                className="text-right"
                              >
                                phone no
                              </FormLabel>
                              <FormControl>
                                <Input
                                  defaultValue={userData.phoneNumber}
                                  id="phoneNumber"
                                  type="text"
                                  placeholder="Enter phone number"
                                  {...field}
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
                                  defaultValue={userData.gender}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  {...field}
                                  value={field.value}
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
                                  defaultValue={userData.dob}
                                  placeholder="Enter your Date of Birth"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="text-xl mt-4 font-semibold">Login information</p>

        <div className="my-4">
          <div>
            <p>Mobile number</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold">{userData?.phoneNumber || ""}</p>
            <div className="ms-80"></div>
          </div>
          <div className="border-b-2 border-gray-300 mt-2"></div>
        </div>

        <div>
          <div>
            <p>Email address</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold">
              {userData?.email || googleUser?.email}
            </p>
          </div>
          <div className="border-b-2 border-gray-300 mt-2"></div>
        </div>

        <div className="flex justify-between items-center my-2">
          <p className="font-semibold">Personal information</p>
        </div>

        <div className="mt-2">
          <p>Full name</p>
          <p className="font-semibold">{userData?.name || googleUser?.name}</p>
        </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
        <div className="mt-4">
          <p>Birthday</p>
          <p className=" font-light">{userData?.dob}</p>
        </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
        <div className="mt-4">
          <p>Gender</p>
          <p className="font-light">{userData?.gender}</p>
        </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
        <button
          className=" text-white bg-red-500 hover:bg-red-700 py-2 px-4  my-5 rounded-full"
          onClick={handledeleteuser}
        >
          {" "}
          DeleteAccount{" "}
        </button>
      </div>
    </>
  );
};

export default ProfileCenter;
