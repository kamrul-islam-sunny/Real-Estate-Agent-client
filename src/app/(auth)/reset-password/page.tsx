"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Key } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useHandleResetPasswordMutation } from "@/redux/features/auth/authApi";
import dynamic from "next/dynamic";
import PublicRoute from "@/helper/Routers/PublicRoute";

interface ResetPasswordInputs {
  newPassword: string;
  password: string;
}

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);

  const [handleResetPassword, { isLoading: resetPasswordLoading }] =
    useHandleResetPasswordMutation();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    if (!token) {
      toast.error("Token is missing. Please try again.");
      return;
    }

    try {
      await handleResetPassword({ token, password: data?.password }).unwrap();
      toast.success("Successfully reset password! Please Login");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white  shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Key className="h-10 w-10 text-[#01437D]" />
            </div>

            <h2 className="text-3xl font-bold text-center text-[#001B33] mb-2">
              Reset Password
            </h2>
            <p className="text-[#44525E] text-center mb-8">
              Enter your new password below
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#001B33] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "New password is required",
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
                      errors.newPassword ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#01437D] focus:border-transparent`}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#001B33] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    className={`w-full px-4 py-3  border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#01437D] focus:border-transparent`}
                    placeholder="Confirm your new password"
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
                disabled={resetPasswordLoading}
                className="w-full bg-[#01437D] text-white py-3  font-medium hover:bg-[#013464] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {resetPasswordLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}

export default dynamic(() => Promise.resolve(ResetPassword), { ssr: false });
