import React from "react";
import { Separator } from "../ui/separator";

const ProfileHeader = () => {
  return (
    <div>
      {/* Adjust text size and padding more responsively */}
      <div className="p-4 md:p-6 lg:p-8 xl:p-10 mx-4 md:mx-20 lg:mx-28 xl:mx-32 font-bold">
        <p className="text-sm sm:text-md md:text-2xl lg:text-3xl xl:text-4xl">Trips you&#39;ve booked</p>
      </div>
      <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-32 xl:mx-40 mb-5">
        <Separator />
      </div>
    </div>
  );
};

export default ProfileHeader;
