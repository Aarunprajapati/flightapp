import React from "react";
import ProfileHeader from "./profileHeader";
import ProfileSider from "./profileSider";
import ProfileCenter from "./profileCenter";

const ProfilePage = () => {
  return (
    <div>
      <ProfileHeader />

      <div className="grid lg:flex w-full">
        <div className="w-[320px] md:w-[60%] lg:w-[30%]">
          <ProfileSider />
        </div>
        <div className="w-[320px] md:w-[60%] lg:w-[60%]">
          <ProfileCenter />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
