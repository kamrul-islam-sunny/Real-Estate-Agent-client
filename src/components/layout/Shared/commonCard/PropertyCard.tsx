'use client'

import Image from 'next/image'
import { CheckCircle, Bed, Bath, Car } from 'lucide-react'

export default function PropertyCard({ product }:any) {
  const {
    name,
    location,
    image,
    price,
    bedrooms,
    bathrooms,
    parking,
    squareFeet,
    sale,
  } = product

  return (
    <div className="w-full rounded-lg border overflow-hidden bg-white">
      {/* Top Image with labels */}
      <div className="relative z-50">
        <Image
          src={image?.[0] || '/asset/cardImages.png'} // fallback image
          alt={name}
          width={400}
          height={200}
          className=" h-52 object-cover"
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
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md inline-block capitalize">
          For {sale || 'rent'}
        </span>

        <h3 className="text-2xl font-semibold text-gray-800">${price}</h3>
        <p className="text-sm text-gray-500">{location}</p>

        {/* Bottom Info */}
        <div className="flex items-center justify-between text-base text-gray-600 pt-2 border-t mt-3">
          <span>{squareFeet} sq.m</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Bed size={18} /> {bedrooms}</span>
            <span className="flex items-center gap-1"><Bath size={18} /> {bathrooms}</span>
            <span className="flex items-center gap-1"><Car size={18} /> {parking}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
