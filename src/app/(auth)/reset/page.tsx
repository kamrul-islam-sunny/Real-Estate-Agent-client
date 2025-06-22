"use client";
import React from "react";
import { Loader2, Lock } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useHandleForgotPasswordMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import PublicRoute from "@/helper/Routers/PublicRoute";

interface resetReq {
  email: string;
}

const Reset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetReq>();
  const [handleForgotPassword, { isLoading: forgotPasswordLoading }] =
    useHandleForgotPasswordMutation();

  const onSubmit: SubmitHandler<resetReq> = async (data) => {
    console.log("Form Data Submitted:", data);
    try {
      await handleForgotPassword(data).unwrap();
      toast.success("Check Your Email!");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <PublicRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white  shadow-sm p-8">
              <div className="flex items-center justify-center mb-8">
                <Lock className="h-10 w-10 text-[#01437D]" />
              </div>

              <h2 className="text-3xl font-bold text-center text-[#001B33] mb-2">
                Forgot Password?
              </h2>
              <p className="text-[#44525E] text-center mb-8">
                Reset your password
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#001B33] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-3  border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#01437D] focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="w-full bg-[#01437D] text-white py-3  font-medium hover:bg-[#013464] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#44525E]">
                Login your account{" "}
                <Link
                  href="/login"
                  className="text-[#01437D] hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </PublicRoute>
    </>
  );
};

export default Reset;
