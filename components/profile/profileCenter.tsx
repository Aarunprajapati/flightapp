"use client";
import React from "react";
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

const ProfileCenter = () => {
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
  const handleDeleteUser = async () => {
    try {
      const res = await axiosinstance.delete("/deleteuser");
      console.log(res.data.message)
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Error in delete Account");
    }
  };

  React.useEffect(() => {
    Fetchdata();
    googleFetchdata();
  }, []);

  return (
    <div className="me-36">
      <p className="text-2xl font-bold">Profile</p>
      <p className="text-xl mt-4 font-semibold">Login information</p>

      <div className="my-4">
        <div>
          <p>Mobile number</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold">{userData?.phoneNumber || ""}</p>
          <div className="ms-80">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">
                  <p className="text-blue-800 font-serif text-lg">edit</p>{" "}
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
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={userData.phoneNumber }
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

      <div className="flex justify-between items-center mt-2">
        <p className="font-semibold">Personal information</p>
        <div className="ms-80">
        <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">
                  <p className="text-blue-800 font-serif text-lg">edit</p>{" "}
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
                    <Label htmlFor="name" className="text-right">
                      Date of birth
                    </Label>
                    <Input
                      id="name"
                      defaultValue={userData.dob}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Gender
                    </Label>
                    <Input
                      id="name"
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
        <p className="font-semibold">{userData?.name || googleUser?.name}</p>
      </div>
      <div className="border-b-2 border-gray-300 mt-2"></div>
      <div className="mt-4">
        <p>Birthday</p>
        <p className=" font-light">{userData?.dob || ""}</p>
      </div>
      <div className="border-b-2 border-gray-300 mt-2"></div>
      <div className="mt-4">
        <p>Gender</p>
        <p className="font-light">{userData?.gender || ""}</p>
      </div>
      <div className="border-b-2 border-gray-300 mt-2"></div>
    </div>
  );
};

export default ProfileCenter;
