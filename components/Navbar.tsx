/* eslint-disable @next/next/no-async-client-component */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
// * custome components
import NvavbarButton from "./NvavbarButton";
import MobileSideBar from "./MobileSideBar";
import LoginForm from "./auth/Login-Form";
import RegisterForm from "./auth/Register-Form";
// * icons
import { Backpack, Building2, HomeIcon, Plane } from "lucide-react";
//* shadcn ui
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axiosinstance from "@/axiosinstance";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import UserProfile from "./profile/userprofile";
//* var
const datas = [
  {
    icon: HomeIcon,
    color: "text-green-700",
    bgcolor: "text-green-700/10",
    label: "List your property",
    sublabel: "Start earning today!",
  },
  {
    icon: Building2,
    color: "text-red-700",
    bgcolor: "text-red-900/10",
    label: "Introduction myBiz",
    sublabel: "Business Travel Solution",
  },
  {
    icon: Backpack,
    color: "text-yellow-600",
    bgcolor: "text-yellow-700/10",
    label: "My Trips",
    sublabel: "Manage your bookings",
  },
];

const Navbar = ({ user, session }: any) => {
  return (
    <div className="flex bg-gray-800 w-full items-center px-2 py-3 lg:px-10 md:px-5  lg:py-4 lg:justify-between h-full mx-auto">
      {/* Logo Section */}
      <div className="flex items-center px-5 justify-center lg:justify-start lg:mx-44 ">
        <Link href="/">
          <Image
            src="/logo.png"
            width={50} // Set a smaller width for mobile
            height={50} // Set a smaller height for mobile
            alt="logo"
            className=" img-fluid w-14 h-14 "
          />
        </Link>
      </div>

      {/* Navigation and Action Items */}
      <div className="hidden lg:flex items-center lg:gap-x-2 mx-5 lg:mx-auto">
        {datas.map((tool) => (
          <Card
            key={tool.label}
            className="p-1 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={`p-2 w-fit rounded-md ${tool.bgcolor}`}>
                <tool.icon className={`w-8 h-8 ${tool.color}`} />
              </div>
              <div>
                <div className="text-xs font-semibold">{tool.label}</div>
                <div className="text-xs font-semibold">{tool.sublabel}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* user profile */}
      <div>
        <UserProfile user={user} session={session} />
      </div>
    </div>
  );
};

export default Navbar;
