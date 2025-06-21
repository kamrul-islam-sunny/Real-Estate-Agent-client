// components/PropertyCard.jsx
import Image from 'next/image'
import { CheckCircle, Bed, Bath, Car } from 'lucide-react'
import cardImage from '@/../public/asset/cardImages.png'

export default function PropertyCard() {
  return (
    <div className="max-w-sm w-full rounded-lg shadow-lg border overflow-hidden bg-white">
      {/* Top Image with labels */}
      <div className="relative">
        <Image
          src={cardImage} // 👉 তোমার ইমেজ ফাইলের path
          alt="Property Image"
          width={400}
          height={200}
          className="object-cover w-full h-48"
        />

        {/* Verified & New badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle size={14} /> Verified
          </span>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2 font-nunito">
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md inline-block">
          For Rent
        </span>

        <h3 className="text-2xl font-semibold text-gray-800 ">$1,620</h3>
        <p className="text-sm text-gray-500">40 S 9th St, Brooklyn, NY 11249</p>

        {/* Bottom Info */}
        <div className="flex items-center justify-between text-base text-gray-600 pt-2 border-t mt-3">
          <span>65 sq.m</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 "><Bed size={18} /> 2</span>
            <span className="flex items-center gap-1 "><Bath size={18} /> 1</span>
            <span className="flex items-center gap-1 "><Car size={18} /> 1</span>
          </div>
        </div>
      </div>
    </div>
  )
}

