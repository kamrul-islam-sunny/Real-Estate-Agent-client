'use client'

import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi'
// import { useHandleFindLocationPropertiesQuery } from '@/redux/features/properties/propertiesApi'
import React, { useEffect, useState } from 'react'
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
const bathroomOptions = ['1', '2', '3', '4', '5+']
const amenityOptions = [
  'Air conditioning',
  'Balcony',
  'Garage',
  'Parking',
  'Pool',
  'Security cameras',
  'WiFi',
]

export default function PropertyFilterForm({setIsLoading, currentPage,itemsPerPage, setFilterData }: any) {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      amenities: [],
    },
  })

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null)
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(null)
  const [fromData, setFromData] = useState<Partial<FormValues>>({})

  const { data, refetch, isLoading} = useHandleGetPropertiesQuery({
    location: fromData?.city || '',
    sale: fromData?.homeType || '',
    bathrooms: selectedBathrooms || '',
    bedrooms: selectedBedrooms || '',
    amenities: selectedAmenities || [],
    minPrice: fromData.priceMin || '',
    maxPrice: fromData.priceMax || '',
    squareFeet:fromData.sqmMax || '',
    page: currentPage || 1,
    limit: itemsPerPage || 10,
  })
  const filterData = data?.payload.data
  console.log(data?.payload.data, filterData)
  console.log(fromData)

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

  // http://localhost:5000/api/v1/property/find?page=1&limit=10&location=&sale=&minPrice=45000&maxPrice=

  useEffect(() => {
    setFilterData(filterData)
    setIsLoading(isLoading)
  }, [filterData, setFilterData, isLoading, setIsLoading])

  const handleInputChange = (fieldName: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(`${fieldName}:`, e.target.value);
    setValue(fieldName, e.target.value)
    handleSubmit(onSubmit)();
  };



 

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  console.log(selectedAmenities)



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
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
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
              <label
                key={item}
                className="flex items-center space-x-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

       
      </form>
    </div>
  )
}



// http://localhost:5000/api/v1/property/find?page=1&limit=10&location=New+York&type=