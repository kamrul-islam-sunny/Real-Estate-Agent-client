'use client'

import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi'
// import { useHandleFindLocationPropertiesQuery } from '@/redux/features/properties/propertiesApi'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormValues = {
  city: string
  homeType: string
  priceMin?: string
  priceMax?: string
  sqmMin?: string
  sqmMax?: string
  amenities: string[]
}

const bedroomOptions = ['1', '2', '3', '4', '5+']
const bathroomOptions = ['1', '2', '3', '4', '4+']
const amenityOptions = [
  'Air conditioning',
  'Balcony',
  'Garage',
  'Parking',
  'Pool',
  'Security cameras',
  'WiFi',
]

export default function PropertyFilterForm() {
  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormValues>({
    defaultValues: {
      amenities: [],
    },
  })

  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null)
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(null)
  const [fromData, setFromData] = useState<Partial<FormValues>>({})

  const { data, refetch, } = useHandleGetPropertiesQuery({
    location: fromData?.city || '',
    type: fromData?.homeType || '',
  })
  console.log(data)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const fullData = {
      ...data,
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
    }
    console.log(fullData)
    setFromData(fullData)
    refetch();
  }

  const handleInputChange = (fieldName: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(`${fieldName}:`, e.target.value);
    setValue(fieldName, e.target.value)
    handleSubmit(onSubmit)();
  };

  // name,
  //           page,
  //           limit,
  //          
  //     
  //           sale,
  //          



  const toggleAmenity = (amenity: string) => {
    const current = getValues('amenities') || []
    if (current.includes(amenity)) {
      setValue('amenities', current.filter((a) => a !== amenity))
    } else {
      setValue('amenities', [...current, amenity])
    }
  }

  const selectedAmenities = watch('amenities')






  return (
    <div className="w-full max-w-xs space-y-6 rounded ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* City */}
        <div>
          <label className="block text-lg font-medium mb-1 font-nunito">City</label>
          <select {...register('city')}
            onChange={(e) => {
              handleInputChange('city')(e);
            }} className="w-full border rounded px-3 py-2 ">
            <option value="">select a city</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Moulvibazar">Moulvibazar</option>
          </select>
        </div>

        {/* Home Type */}
        <div>
          <label className="block text-lg font-medium mb-1 font-nunito" >Home type</label>
          <select {...register('homeType')}
            onChange={(e) => {
              handleInputChange('homeType')(e);
            }}
            className="w-full border rounded px-3 py-2">
            <option value="">select a type</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-lg font-medium mb-1 font-nunito">Price</label>
          <div className="flex gap-2">
            <input {...register('priceMin')}
              onChange={(e) => {
                handleInputChange('priceMin')(e);
              }}
              placeholder="Min" type="number" className="w-full border rounded px-3 py-2" />
            <input {...register('priceMax')}
              onChange={(e) => {
                handleInputChange('priceMax')(e);
              }}
              placeholder="Max" type="number" className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        {/* Square Metres */}
        <div>
          <label className="block text-lg font-medium mb-1 font-nunito">Square metres</label>
          <div className="flex gap-2">
            <input {...register('sqmMin')}
              onChange={(e) => {
                handleInputChange('sqmMin')(e);
              }}
              placeholder="Min" type="number" className="w-full border rounded px-3 py-2" />
            <input {...register('sqmMax')}
              onChange={(e) => {
                handleInputChange('sqmMax')(e);
              }}
              placeholder="Max" type="number" className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-lg font-medium mb-1 font-nunito">Bedrooms</label>
          <div className="flex gap-2 flex-wrap">
            {bedroomOptions.map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setSelectedBedrooms(num)}
                className={`border px-3 py-1 rounded text-sm ${selectedBedrooms === num ? 'bg-black text-white' : 'hover:bg-gray-200'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-lg font-medium mb-1 font-nunito">Bathrooms</label>
          <div className="flex gap-2 flex-wrap">
            {bathroomOptions.map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setSelectedBathrooms(num)}
                className={`border px-3 py-1 rounded text-sm ${selectedBathrooms === num ? 'bg-black text-white' : 'hover:bg-gray-200'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-lg font-semibold mb-2 font-nunito">Amenities</label>
          <div className="space-y-2">
            {amenityOptions.map((item) => (
              <label key={item} className="flex items-center space-x-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities?.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button type="submit" className="w-full bg-black text-white py-2 rounded">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  )
}
