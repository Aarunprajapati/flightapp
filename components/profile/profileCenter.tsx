"use client";
import React from "react";
import { Button } from "../ui/button";
import axiosinstance from "@/axiosinstance";
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
    <>
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
              <Button variant="link">
                <p className="text-blue-800 font-serif text-lg">edit</p>
              </Button>
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
            <div className="ms-80">
              <Button variant="link">
                <p className="text-blue-800 font-serif text-lg">edit</p>
              </Button>
            </div>
          </div>
          <div className="border-b-2 border-gray-300 mt-2"></div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold">Personal information</p>
          <div className="ms-80">
            <Button variant="link">
              <p className="text-blue-800 font-serif text-lg">edit</p>
            </Button>
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
        <div
          className=" text-white bg-red-600  rounded-full px-3 flex justify-center text-normal w-40 py-2 hover:bg-red-800 my-5 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </div>
      </div>
    </>
  );
};

export default ProfileCenter;
