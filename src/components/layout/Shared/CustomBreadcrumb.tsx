import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlashIcon } from 'lucide-react'
import Image from 'next/image'
import coverImage from '@/../public/asset/coverImage.png'


interface CustomBreadcrumbProps {
    currentPage: string;
    BreadcrumbLinkFrom: string;
   
}

function CustomBreadcrumb({currentPage, BreadcrumbLinkFrom }: CustomBreadcrumbProps) {
    return (
        <div className="max-w-screen-2xl mx-auto relative">
            <Image src={coverImage} height={300} width={1200} alt='' className='w-full relative z-10' />
            <div className="bg-white flex items-center justify-between px-10 py-6  lg:max-w-5xl sm:max-w-2xl max-w-sm w-full absolute z-20 -bottom-10 left-1/2 transform -translate-x-1/2 rounded">
                <h2 className='text-xl sm:text-[32px] text-dark-gray font-normal font-anton' >{currentPage}</h2>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">{BreadcrumbLinkFrom}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components">{currentPage}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default CustomBreadcrumb