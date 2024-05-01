"use client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import {
  AlignJustify,
  ArrowBigUp,
  BriefcaseIcon,
  Handshake,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useTheme, useMediaQuery } from "@mui/material";

interface NavItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: 1, name: "Trips", icon: <BriefcaseIcon />, href: "/auth/trips" },
  { id: 2, name: "Travellers", icon: <Users />, href: "/auth/profile" },
  { id: 3, name: "Cleartrip Wallet", icon: <Wallet />, href: "/trips/profile" },
  { id: 4, name: "Hi-Five", icon: <Handshake />, href: "/trips/profile" },
  { id: 5, name: "Expressway", icon: <ArrowBigUp />, href: "/trips/profile" },
  { id: 6, name: "Profile", icon: <User />, href: "/auth/profile" },
];
const ProfileSider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <div className=" mx-5 lg:mx-36 lg:mr-0 my-2 md:mx-20  ">
        <button className="block lg:hidden" onClick={handleOpen}>
          <AlignJustify className="w-6 h-6" />
        </button>
        <div
          className={`lg:grid ${isOpen ? "my-5 bg-gray-100 p-4 rounded-lg" : "hidden"}`}
        >
          {navItems.map((item) => (
            <div key={item.id}>
              <Link
                href={item.href}
                className="hover:bg-slate-400 p-2 hover:p-2 hover:rounded-2xl flex justify-start w-72 gap-x-5"
              >
                <div>{item.icon}</div>
                <div className="font-serif text-xl">{item.name}</div>
              </Link>
              <div className="w-full my-3">
                <Separator />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSider;
