"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Building2, Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useHandleLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PublicRoute from "@/helper/Routers/PublicRoute";

interface LoginFormInputs {
  email: string;
  password: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [handleLogin, { isLoading: handleLoginLoading }] =
    useHandleLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Form Data Submitted:", data);
    try {
      await handleLogin(data).unwrap();
      toast.success("Successfully Login!");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white  shadow-sm p-8">
            <div className="flex items-center justify-center mb-8">
              <Building2 className="h-10 w-10 text-[#01437D]" />
            </div>

            <h2 className="text-3xl font-bold text-center text-[#001B33] mb-2">
              Welcome Back
            </h2>
            <p className="text-[#44525E] text-center mb-8">
              Sign in to your account
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

              <div>
                <label className="block text-sm font-medium text-[#001B33] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                        message:
                          "Password must include letters, numbers, and special characters",
                      },
                    })}
                    className={`w-full px-4 py-3  border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#01437D] focus:border-transparent`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={handleLoginLoading}
                className="w-full bg-[#01437D] text-white py-3  font-medium hover:bg-[#013464] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {handleLoginLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#44525E]">
              Forgot your password?{" "}
              <Link
                href="/reset"
                className="text-[#01437D] hover:underline font-medium"
              >
                Reset it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}

export default Login;
