import { Bed, Bath, Ruler, Share2, Heart, CheckCircle } from "lucide-react";
import Image from "next/image";
import firstImage from "@/../public/asset/about/first.png"
import secondImage from "@/../public/asset/about/secondImg.png"
import thirdImage from "@/../public/asset/about/third.png"
import {
    Snowflake,
    Sun,
    Car,
    WashingMachine,
    Wifi,
    MoveVertical,
    Shirt,
} from 'lucide-react'

export default function PropertyDetails() {
    return (
        <div className="px-[5%]">

            <div className="max-w-5xl mx-auto">
            
            </div>


            <div className=" max-w-screen-xl mx-auto">

                {/* Images Section */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 py-10">
                    <div className="sm:col-span-3">
                        <Image
                            src={firstImage}
                            alt="Main Property"
                            width={638}
                            height={400}
                            className="w-full object-cover"
                        />
                    </div>

                    <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2 gap-4">
                        <div className="">
                            <Image src={secondImage} alt="Room" width={400} height={200} className="w-full h-full object-cover rounded" />
                        </div>
                        <div className="">
                            <Image src={thirdImage} alt="Kitchen" width={400} height={200} className="w-full h-full object-cover rounded" />
                        </div>

                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-4 sm:space-y-8 font-nunito">
                        {/* Price, Address, Icons */}
                        <div className="flex justify-between items-start">
                            <div className="">
                                <div className="flex items-start gap-1 mb-4">
                                    <p className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle size={14} /> Verified
                                    </p>
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        New
                                    </span>
                                </div>

                                <h2 className="text-3xl font-semibold text-gray-800 mb-3">$ 1,350</h2>
                                <p className="text-gray-600 text-lg font-normal mb-4">07-04 Myrtle Ave Glendale, NY 11385</p>
                                <div className="flex gap-6  text-gray-600 text-sm">
                                    <span className="flex items-center gap-1"><Bed size={16} /> 2</span>
                                    <span className="flex items-center gap-1"><Bath size={16} /> 1</span>
                                    <span className="flex items-center gap-1"><Ruler size={16} /> 42 sq.m</span>
                                </div>
                            </div>
                            <div className="flex gap-3 text-gray-600">
                                <Share2 className="cursor-pointer" />
                                <Heart className="cursor-pointer" />
                            </div>
                        </div>

                        <div className="">
                            <hr />
                        </div>

                        {/* About Section */}
                        <div>
                            <h3 className="text-2xl font-medium mb-2">About</h3>
                            <p className="text-gray-700 text-lg font-normal leading-relaxed">
                                It offers a comfortable living area leading to a formal dining room, gorgeous hardwood
                                floors throughout, spacious newly renovated kitchen with granite countertops and
                                stainless steel appliances. Additionally, level two is the convenience of a master bedroom
                                featuring a built-in dressing room, complemented by a private bath and shower for added
                                comfort. This listing is conveniently located close to transportation hubs,
                                ensuring easy access to the city’s heartbeat.
                            </p>
                        </div>
                    </div>
                    {/* Map Section */}
                    <div className="sm:col-span-1">
                        <iframe
                            className="w-full h-64 rounded-md"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8300551761065!2d-73.8979323!3d40.6995242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e4ea6fa6bb9%3A0x3e253e46f47313f2!2sMyrtle%20Ave%2C%20Glendale%2C%20NY!5e0!3m2!1sen!2sus!4v1718799999999"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* General Info + Amenities */}
                <div className="grid md:grid-cols-2 gap-6 py-6 sm:py-16 rounded-md">
                    {/* General Info */}
                    <div className="bg-light-bg flex flex-col py-10 items-center space-y-2 font-nunito">
                        <h4 className="text-2xl font-medium text-accent-gold">General Information</h4>
                        <p className="border w-24 border-accent-gold mb-8"></p>

                        <table className="table-auto w-2/3 ">
                            <tbody>
                                <tr className="text-lg font-normal ">
                                    <td className="px-4 py-2 text-dark-true">Property type:</td>
                                    <td className="px-4 py-2 text-end">Apartment</td>
                                </tr>
                                <tr className="text-lg font-normal">
                                    <td className="px-4 py-2 text-dark-true">Year built:</td>
                                    <td className="px-4 py-2 text-end">2023</td>
                                </tr>
                                <tr className="text-lg font-normal">
                                    <td className="px-4 py-2 text-dark-true">Living space:</td>
                                    <td className="px-4 py-2 text-end">42 sq.m</td>
                                </tr>
                                <tr className="text-lg font-normal">
                                    <td className="px-4 py-2 text-dark-true">Floors:</td>
                                    <td className="px-4 py-2 text-end">1</td>
                                </tr>
                                <tr className="text-lg font-normal">
                                    <td className="px-4 py-2 text-dark-true">Total rooms:</td>
                                    <td className="px-4 py-2 text-end">2</td>
                                </tr>
                                <tr className="text-lg font-normal">
                                    <td className="px-4 py-2 text-dark-true">Bedrooms:</td>
                                    <td className="px-4 py-2 text-end">2</td>
                                </tr>
                                <tr className="text-lg font-normal">
                                    <td className="px-4 py-2 text-dark-true">Bathrooms:</td>
                                    <td className="px-4 py-2 text-end">1</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    {/* Amenities */}
                    <div className="bg-light-bg flex flex-col py-10 items-center space-y-2 font-nunito">
                        <h4 className="text-2xl font-medium text-accent-gold">Amenities</h4>
                        <p className="border w-24 border-accent-gold mb-8"></p>
                        <ul className="w-2/3 list-none grid grid-cols-2 text-lg space-y-4 text-gray-700">
                            <li className="flex items-center gap-2">
                                <Snowflake className="w-4 h-4 " />
                                Air conditioning
                            </li>
                            <li className="flex items-center gap-2">
                                <Sun className="w-4 h-4 " />
                                Balcony
                            </li>
                            <li className="flex items-center gap-2">
                                <Car className="w-4 h-4 " />
                                Garage
                            </li>
                            <li className="flex items-center gap-2">
                                <WashingMachine className="w-4 h-4 " />
                                Washing machine
                            </li>
                            <li className="flex items-center gap-2">
                                <Wifi className="w-4 h-4 " />
                                Wi-Fi
                            </li>
                            <li className="flex items-center gap-2">
                                <MoveVertical className="w-4 h-4 " />
                                Elevator
                            </li>
                            <li className="flex items-center gap-2">
                                <Shirt className="w-4 h-4 " />
                                Laundry
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
