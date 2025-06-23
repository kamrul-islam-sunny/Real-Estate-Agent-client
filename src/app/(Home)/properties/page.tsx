'use client'
import React, { useState } from 'react'
import CustomBreadcrumb from '@/components/layout/Shared/CustomBreadcrumb'
import PropertyFilterForm from './components/PropertyFilterForm'
import PropertyCard from '@/components/layout/Shared/commonCard/PropertyCard'
import { ListFilterPlus } from 'lucide-react'

import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi'
import SkeletonCard from '@/components/layout/Shared/commonCard/SkeletonCard'
import Link from 'next/link'


function Page() {

    const [open, isOpen] = useState(false)
    const { data, isLoading } = useHandleGetPropertiesQuery({})

    const allProperties = data?.payload.data || [];
    console.log(data)


    return (
        <>
            <CustomBreadcrumb currentPage='Properties'
                BreadcrumbLinkFrom='Home'
            />

            <div className="px-[5%]">
                <div className='max-w-screen-xl mx-auto mt-12 relative z-20' >

                    <div className="w-full sm:max-w-5xl mx-auto grid sm:grid-cols-7 justify-center gap-8 py-10">
                        <button
                            className="sm:hidden flex items-center gap-2 text-lg font-nunito border border-gray-300 w-26 rounded px-4 py-1"
                            onClick={() => isOpen(!open)}
                        >
                            Filter <ListFilterPlus size={18} />
                        </button>

                        {/* Overlay */}
                        <div
                            className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                            onClick={() => isOpen(false)}
                        ></div>

                        {/* Slide-in Drawer - From Left Side */}
                        <div
                            className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 shadow-lg transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
                                }`}
                        >
                            <div className="p-4 border-b flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Filter Properties</h2>
                                <button onClick={() => isOpen(false)} className="text-gray-500 hover:text-black">✕</button>
                            </div>
                            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                                <PropertyFilterForm />
                            </div>
                        </div>

                        <div className="hidden sm:block sm:col-span-2 ">
                            <PropertyFilterForm />
                        </div>

                        <div className="sm:col-span-5 ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {
                                    allProperties.map((product, i) =>
                                        <Link href={`/properties/${product.slug}`} key={i}>
                                            <PropertyCard product={product}  />
                                        </Link>
                                    )
                                }
                                {isLoading
                                    && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Page