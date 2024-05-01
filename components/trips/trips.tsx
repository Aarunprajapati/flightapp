import React from "react";
import ProfileHeader from "../profile/profileHeader";
import ProfileSider from "../profile/profileSider";
import TripsCenter from "./tripsCenter";

const Trips = () => {
  return (
    <div>
      <ProfileHeader />

      <div className="flex  ">
        <ProfileSider />
        <TripsCenter />
      </div>
    </div>
  );
};

export default Trips;
