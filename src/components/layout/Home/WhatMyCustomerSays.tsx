'use client'
import React, { useEffect, useState } from 'react'
import Heading from '../Shared/Heading'
import {
    Carousel,
    CustomCarouselContent,
    CustomCarouselItem,
    // CustomCarouselNext2,
    // CustomCarouselPrevious2,
    type CarouselApi,
} from "@/components/ui/carousel"
import TestimonialCard from '../Shared/commonCard/TestimonialCard '
import { GoDotFill } from 'react-icons/go'


function WhatMyCustomerSays() {

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }
        console.log(api)

        setCount(api.scrollSnapList().length)

        setCurrent(api.selectedScrollSnap() + 1)


        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
        console.log(count)
        console.log(current)
    }, [api, count, current])

    const dotStyle = (num: number) => {
        return `size-3 ${num === current ? 'text-black size-4 ml-2' : 'text-white ml-2'}`
    }


    return (
        <div className='relative'>
            <div className='px-[5%]'>
                <div className="max-w-screen-xl mx-auto my-6 sm:my-20 relative  ">
                    <div className="bg-accent-gold py-10 sm:h-[500px] rounded text-center sm:pt-10 relative ">
                        <Heading>
                            <span className='text-white'>What My customer says</span>
                        </Heading>


                        <div className="sm:max-w-7xl lg:max-w-screen-2xl mx-auto mt-6 sm:absolute top-25 sm:left-1/2  sm:transform sm:-translate-x-1/2 overflow-hidden ">
                            <Carousel setApi={setApi} className="w-full">
                                <CustomCarouselContent>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <CustomCarouselItem key={index} className="sm:basis-1/3 ">
                                            <TestimonialCard />
                                        </CustomCarouselItem>
                                    ))}
                                </CustomCarouselContent>
                                {/* <CustomCarouselPrevious2 />
                                <CustomCarouselNext2 /> */}
                            </Carousel>

                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 py-2 flex items-center justify-center text-muted-foreground ">
                            {
                                Array.from({ length: count }).map((_, i) =>
                                    <GoDotFill key={i} className={`${dotStyle(i)}`} />
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default WhatMyCustomerSays