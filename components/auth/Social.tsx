import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import axiosInstance from "@/axiosinstance";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const Social = () => {
  const router = useRouter()
 
  const onClick = async (provider: string) => {
    try {
      await signIn(provider,{
        redirect:false,
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
      
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    }
  };

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button className="w-full" size="lg" onClick={() => onClick("google")}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button className="w-full" size="lg" onClick={() => onClick("github")}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
