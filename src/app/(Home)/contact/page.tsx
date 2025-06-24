"use client";
import CustomBreadcrumb from "@/components/layout/Shared/CustomBreadcrumb";
import { useHandleCreateContactMutation } from "@/redux/features/contact/contactApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [handleSendContact, { isLoading }] = useHandleCreateContactMutation();
  const onSubmit = async (data: ContactFormData) => {
    console.log("Form submitted:", data);
    try {
      await handleSendContact(data).unwrap();
      toast.success("Successfully Send Your Massage");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomBreadcrumb currentPage="Contact" BreadcrumbLinkFrom="Home" />

      <section className="px-[5%]">
        <div className="max-w-screen-xl mx-auto text-center py-20">
          <h2 className="text-3xl sm:text-[56px] font-anton  text-center">
            Reach out &{" "}
            <span className="text-accent-gold">
              let&#39;s <br />
              <span className="text-accent-brown">start</span>
            </span>{" "}
            a conversation
          </h2>
          <p className="mt-5 text-gray-600 max-w-xl mx-auto">
            If you have any questions about the real estate market, I’d love to
            chat. Reach out below, and I’ll get back to you shortly.
          </p>
        </div>

        <div className="bg-[#f9f9f9] p-6 sm:py-12 sm:px-14 rounded max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 font-nunito"
          >
            {/* First Name */}
            <div>
              <label className="block mb-1 text-lg font-medium text-gray-700">
                First Name*
              </label>
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="Enter Your Full Name..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              {errors.firstName && (
                <p className="text-red-500 text-lg mt-1">
                  First name is required
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-lg font-medium text-gray-700">
                Last Name*
              </label>
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Enter Your Full Name..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              {errors.lastName && (
                <p className="text-red-500 text-lg mt-1">
                  Last name is required
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-lg font-medium text-gray-700">
                Email*
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              {errors.email && (
                <p className="text-red-500 text-lg mt-1">Email is required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-lg font-medium text-gray-700">
                Phone*
              </label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                placeholder="Enter Your Phone Number..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              {errors.phone && (
                <p className="text-red-500 text-lg mt-1">
                  Phone number is required
                </p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-lg font-medium text-gray-700">
                Message*
              </label>
              <textarea
                rows={5}
                {...register("message", { required: true })}
                placeholder="Messages Here..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-lg mt-1">Message is required</p>
              )}
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-accent-gold hover:bg-accent-gold-dark text-white font-medium px-6 py-3 rounded transition-all w-full sm:w-auto"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-5xl mx-auto py-12 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center md:text-left ">
            {/* Left Text */}
            <h2 className="text-4xl sm:text-[56px] font-anton text-gray-900">
              Contact <span className="text-accent-gold">me</span> anytime -
            </h2>

            {/* Contact Info */}
            <div className="flex flex-col items-center sm:items-start gap-4 lg:gap-10">
              {/* Phone */}
              <div className="flex items-center gap-2 text-gray-900   text-2xl sm:text-[40px] font-anton">
                <FaPhoneAlt className="size-10 sm:size-14 text-accent-gold" />
                <span>0123 456 789</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-gray-900 text-2xl sm:text-[40px] font-anton">
                <IoMdMail className="size-10 sm:size-14 text-accent-gold" />
                <span>Loremi̇psum@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
