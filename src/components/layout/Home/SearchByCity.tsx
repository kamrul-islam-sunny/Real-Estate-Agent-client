import { Carousel, CarouselContent, CarouselItem, CustomCarouselNext, CustomCarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import Heading from '../Shared/Heading'
import CityCard from '../Shared/commonCard/CityCard'

function SearchByCity() {
  return (
  <div className='px-[5%]'>
            <div className="max-w-screen-xl mx-auto py-10">
                <div className="relative flex flex-col sm:flex-row justify-between sm:items-end gap-5">
                    <header className="sm:w-1/2 space-y-2 sm:space-y-4">
                        <Heading>
                            <span className='text-black'>Search by city</span>
                        </Heading>

                    </header>
                    {/* <div className=" sm:absolute right-40">
                        <Link href={"/property"}>
                            <button className='px-5 py-3 bg-accent-gold text-white rounded-sm cursor-pointer'>Explore All</button>
                        </Link>
                    </div> */}
                </div>
                <Carousel
                    className="w-full mt-5 sm:mt-7 lg:mt-9 2xl:mt-12"
                    aria-label="Our courses Carousel"
                >
                    <CarouselContent role="list" >
                        {
                        Array.from({ length: 10 }).map((_, i) => (
                            <CarouselItem role='listitem'
                                key={i}
                                className="sm:basis-1/2 lg:basis-1/4 "
                            >
                                <CityCard key={i} />
                            </CarouselItem>
                        ))
                    }

                        {/* {
                            isLoading ? Array.from({ length: 3 }).map((_, i) =>
                                <CarouselItem role='listitem'
                                    key={i}
                                    className="sm:basis-1/2 lg:basis-1/3"
                                >
                                    <SkeletonSingleCard key={i} />
                                </CarouselItem>

                            ) : properties?.map((property: any, i: number) =>
                                <CarouselItem role='listitem'
                                    key={i}
                                    className="sm:basis-1/2 lg:basis-1/3"
                                >
                                    <Link href={`/property/propertyDetails/${property.slug}`}><Card property={property} /></Link>
                                </CarouselItem>
                            )
                        } */}
                        {/* {
                            isError && <div className="flex flex-col items-center justify-center text-center w-full py-16">
                                <Frown className="w-16 h-16 text-white mb-4" />
                                <h2 className="text-2xl font-semibold text-white">No Properties Found</h2>
                                <p className="text-gray-200 mt-2">
                                    Try adjusting your search or check back later.
                                </p>
                            </div>
                        } */}
                    </CarouselContent>
                    <CustomCarouselPrevious aria-label="Previous Blog" />
                    <CustomCarouselNext aria-label="Next Blog" />
                </Carousel>
            </div>
        </div>
  )
}

export default SearchByCity