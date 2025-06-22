'use client'
import Image from 'next/image'
import React from 'react'
import buyIcon from '@/../public/asset/StartYourJourney/CardIcons/buy.png'
import rentIcon from '@/../public/asset/StartYourJourney/CardIcons/rent.png'
import sellIcon from '@/../public/asset/StartYourJourney/CardIcons/sell.png'

import buyImages from '@/../public/asset/StartYourJourney/CardImages/image (1).png'
import sellImages from '@/../public/asset/StartYourJourney/CardImages/image (2).png'
import rentImages from '@/../public/asset/StartYourJourney/CardImages/image (4).png'

function StartYourJourney() {
    return (
        <div className='px-[5%]'>
            <div className="max-w-screen-xl mx-auto py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* card no 1 */}
                    <div className="h-[450px] py-10 rounded-sm relative overflow-hidden group bg-light-bg hover:bg-accent-gold transition duration-700 flex flex-col sm:flex-row-reverse lg:flex-col items-center ">
                        <div className="flex flex-col items-center justify-center gap-4 relative z-10 sm:pr-30 lg:pr-0">
                            <Image src={buyIcon} alt='buy a home icon' width={50} height={50} />
                            <h5 className='font-normal text-xl font-anton text-dark-true group-hover:text-white transition duration-700'>Buy a property</h5>
                            <button className='py-2 px-4 rounded-sm bg-dark-true text-white hover:bg-dark-true/90 font-inter text-sm font-light cursor-pointer'>Find a home</button>
                        </div>
                        <Image src={buyImages} alt='buy a home icon' width={450} height={220} className='absolute bottom-0 left-0 z-0' />
                    </div>


                    {/* card no 2 */}
                    <div className="group h-[450px] rounded-sm py-10 relative overflow-hidden bg-light-bg hover:bg-accent-gold transition duration-700 flex flex-col sm:flex-row lg:flex-col items-center">
                        <div className="flex flex-col items-center justify-center gap-4 relative z-10 sm:pl-30 lg:pl-0">
                            <Image src={sellIcon} alt='buy a home icon' width={50} height={50} />
                            <h5 className="font-normal text-xl font-anton text-dark-true group-hover:text-white transition-colors duration-700">
                                Sell a property
                            </h5>
                            <button className='py-2 px-4 rounded-sm bg-dark-true text-white hover:bg-dark-true/90 font-inter text-sm font-light cursor-pointer'>Place an ad</button>
                        </div>
                        <Image src={sellImages} alt='buy a home icon' width={450} height={220} className='absolute bottom-0 sm:right-0 lg:left-0 z-0' />

                    </div>


                    {/* card no 3 */}
                    <div className="h-[450px] bg-light-bg rounded-sm py-10 relative overflow-hidden hover:bg-accent-gold transition duration-700 group flex flex-col sm:flex-row lg:flex-col items-center">
                        <div className="flex flex-col items-center justify-center gap-4 relative z-10 sm:pl-30 lg:pl-0">
                            <Image src={rentIcon} alt='buy a home icon' width={50} height={50} />
                            <h5 className='font-normal text-xl font-anton text-dark-true group-hover:text-white transition-colors duration-700'>Rent a property</h5>
                            <button className='py-2 px-4 rounded-sm bg-dark-true text-white hover:bg-dark-true/90 font-inter text-sm font-light cursor-pointer'>Find a rental</button>
                        </div>
                        <Image src={rentImages} alt='buy a home icon' width={450} height={220} className='absolute bottom-0 sm:right-0 lg:left-0 z-0' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartYourJourney