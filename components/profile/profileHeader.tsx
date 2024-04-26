/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Separator } from "../ui/separator";

const ProfileHeader = () => {
  return (
    <div>
      <div className=" text-3xl font-bold p-6 mx-28">
        <p>Trips you've booked</p>
      </div>
      <div className="mx-32 mb-5">
        <Separator />
      </div>
    </div>
  );
};

export default ProfileHeader;
