'use client'
import React, { useEffect, useState } from 'react'
import Heading from '../Shared/Heading'
import {
    Carousel,
    CustomCarouselContent,
    CustomCarouselItem,
    CustomCarouselNext2,
    CustomCarouselPrevious2,
    type CarouselApi,
} from "@/components/ui/carousel"
import TestimonialCard from '../Shared/home/TestimonialCard '
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
        return `size-3 ${num === current ? 'text-black size-4' : ''}`
    }

    // todo: responsive 
    // ! 


    return (
        <div className='relative'>
            <div className='px-[5%]'>
                <div className="max-w-screen-xl mx-auto my-6 sm:my-10 relative">
                    <div className="bg-accent-gold h-[600px] rounded text-center py-10 relative">
                        <Heading>
                            <span className='text-white'>What My customer says</span>
                        </Heading>


                        <div className="max-w-screen-2xl mx-auto absolute -left-32">
                            <Carousel setApi={setApi} className="w-full">
                                <CustomCarouselContent>
                                    {Array.from({ length: 15 }).map((_, index) => (
                                        <CustomCarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 ">
                                            <div className="space-y-6 mt-6">
                                                <TestimonialCard />
                                            </div>
                                        </CustomCarouselItem>
                                    ))}
                                </CustomCarouselContent>
                                <CustomCarouselPrevious2 />
                                <CustomCarouselNext2 />
                            </Carousel>

                            <div className="absolute right-14 sm:right-20 bottom-6 lg:right-20 lg:bottom-12 py-2 flex items-center justify-center text-muted-foreground  ">
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

        </div>
    )
}

export default WhatMyCustomerSays