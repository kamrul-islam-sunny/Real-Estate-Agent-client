"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useLoggedInUserQuery } from "@/redux/features/auth/authApi";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useLoggedInUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userInfo?.email) {
      router.push("/login");
    }
  }, [isLoading, userInfo, router]);

  if (isLoading || !userInfo?.email) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
