"use client";
import { useLoggedInUserQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useLoggedInUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userInfo?.email) {
      router.push("/");
    }
  }, [isLoading, userInfo, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // While redirecting logged-in users, show nothing or loader
  if (userInfo?.email) {
    return  <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default PublicRoute;
