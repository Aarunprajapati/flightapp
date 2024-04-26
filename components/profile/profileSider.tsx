"use client ";
import React from "react";
import { Separator } from "../ui/separator";
import { ArrowBigUp, BriefcaseIcon, Handshake, User, Users, Wallet } from "lucide-react";
import Link from "next/link";

interface NavItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: 1, name: "Trips", icon: <BriefcaseIcon />, href: '/auth/trips' },
  { id: 2, name: "Travellers", icon: <Users/>, href: '/auth/profile'},
  { id: 3, name: "Cleartrip Wallet", icon: <Wallet/>, href: '/trips/profile' },
  { id: 4, name: "Hi-Five", icon: <Handshake />, href: '/trips/profile' },
  { id: 5, name: "Expressway", icon: <ArrowBigUp />, href: '/trips/profile' },
  { id: 6, name: "Profile", icon: <User/>, href: '/auth/profile' },
];
const ProfileSider = () => {
  return (
    <div>
 

      <div className="mx-32 my-2">
        {navItems.map((item) => (
          <div key={item.id} >
            <Link
            href={item.href}
              className="hover:bg-slate-400 flex justify-start w-72 gap-x-5"            
            >
              <div>{item.icon}</div>
              <div className="font-serif text-xl">{item.name}</div>
            </Link>
            <div className="w-72 my-3">
              <Separator />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSider;
