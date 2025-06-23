'use client'
import { Carousel, CarouselContent, CarouselItem, CustomCarouselNext, CustomCarouselPrevious } from '@/components/ui/carousel'
import Link from 'next/link'
import React from 'react'
import Heading from '../Shared/Heading'
import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi'
import PropertyCard from '../Shared/commonCard/PropertyCard'
import SkeletonCard from '../Shared/commonCard/SkeletonCard'
import { Frown } from 'lucide-react'
// import PropertyCard from '../Shared/commonCard/PropertyCard'

function TopOffers() {

    const { data, isLoading, isError } = useHandleGetPropertiesQuery({})

    const allProperties = data?.payload.data || [];

    return (
        <div className='px-[5%] bg-light-bg'>
            <div className="max-w-screen-xl mx-auto py-12 sm:py-16 lg:py-20">
                <div className="relative flex flex-col sm:flex-row justify-between sm:items-end gap-5 ">
                    <header className="sm:w-1/2 space-y-2 sm:space-y-4">
                        <Heading>
                            <span className='text-black'>Top offers</span>
                        </Heading>

                    </header>
                    <div className=" sm:absolute right-40">
                        <Link href={"/property"}>
                            <button className='px-5 py-3 bg-accent-gold text-white rounded-sm cursor-pointer'>Explore All</button>
                        </Link>
                    </div>
                </div>
                <Carousel
                    className="w-full mt-8 sm:mt-10 lg:mt-15 2xl:mt-12"
                    aria-label="Our courses Carousel"
                >
                    <CarouselContent role="list" >
                        {
                             isLoading ? Array.from({ length: 3 }).map((_, i) =>
                                <CarouselItem role='listitem'
                                    key={i}
                                    className="sm:basis-1/2 lg:basis-1/3"
                                >
                                    <SkeletonCard key={i} />
                                </CarouselItem>

                            ) : allProperties.map((product, i) =>
                                <CarouselItem role='listitem'
                                    key={i}
                                    className="sm:basis-1/2 lg:basis-1/3 "
                                >
                                    <Link href={`/properties/${product.slug}`} key={i}>
                                        <PropertyCard product={product} />
                                    </Link>
                                </CarouselItem>
                            )

                        }

                        {
                            isError && <div className="flex flex-col items-center justify-center text-center w-full py-16">
                                <Frown className="w-16 h-16 text-accent-gold mb-4" />
                                <h2 className="text-2xl font-semibold text-accent-gold">No Properties Found</h2>
                                <p className="text-accent-gold mt-2">
                                    Try adjusting your search or check back later.
                                </p>
                            </div>
                        }
                    </CarouselContent>
                    <CustomCarouselPrevious aria-label="Previous Blog" />
                    <CustomCarouselNext aria-label="Next Blog" />
                </Carousel>
            </div>
        </div>
    )
}

export default TopOffers