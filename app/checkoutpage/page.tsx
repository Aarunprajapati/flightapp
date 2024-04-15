"use client";
import React from "react";

import instance from "@/axiosinstance";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const page = () => {
  const router = useRouter();
  const handlesubmit = async () => {
    await instance.post("/sendmail");
    router.push("/");
  };
  return (
    <div>
      <Button onClick={handlesubmit}>
        Thank you please download your invoice!!
      </Button>
    </div>
  );
};

export default page;
