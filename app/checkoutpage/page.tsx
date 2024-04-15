"use client";
import React, { useState } from "react";

import instance from "@/axiosinstance";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/Card-Wrapper";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const CheckOutPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handlesubmit = async () => {
  try {
      setLoading(true);
      await instance.post("/sendmail");
      router.push("/");
  } catch (error) {
    setLoading(false);
    toast.error("Error while invoice create")
    router.push("/auth/login")
  }
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <CardWrapper
        headerLabel="Welcome to checkOut page"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/login"
      >
        <div className="flex justify-center">
          {loading && (
            <Loader2
              className={cn("h-8 my-2 w-8  text-primary/60 animate-spin text-blue-700")}
            />
          )}
        </div>
        <Button onClick={handlesubmit} className=" flex justify-center">
          <hr />
          Thank you! please download your invoice
        </Button>
      </CardWrapper>
    </div>
  );
};

export default CheckOutPage;
