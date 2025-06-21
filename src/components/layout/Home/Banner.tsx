import Image from 'next/image'
import React from 'react'
import bannerImg from '@/../public/asset/bannerPerson.png'

function Banner() {

  const bannerCard = [
    {
      number: 5,
      text: 'Years of experience'
    },
    {
      number: 50,
      text: 'Property Ready'
    },
    {
      number: 100,
      text: 'Happy Customers'
    },

  ]

  return (
    <div className='px-[5%]'>
      <div className="max-w-screen-xl mx-auto sm:h-[650px] relative bg-bannerColor ">
        <div className="max-w-3xl py-10 px-8">
          <h1 className='text-2xl sm:text-[40px] lg:text-[56px] font-normal font-anton text-white sm:leading-14 lg:leading-20'>Your trusted partner in <span className='text-accent-gold'>Real Estate</span> is Just a Click Away</h1>
          <p className='text-lg font-normal font-nunito text-white leading-6 mt-4 max-w-xl '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>


        <div className="sm:absolute bottom-0 sm:right-3 lg:right-20 ">
          <Image src={bannerImg} alt='a person img' width={435} height={580} className='w-full px-6 sm:px-0 sm:max-w-80 lg:max-w-full' />
        </div>


        <div className="sm:w-1/2 lg:max-w-2xl lg:h-80 pt-6 sm:pr-6 bg-white grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 sm:mt-4 lg:mt-7 ">
          {
            bannerCard.map((item, i) =>
              <div key={i} className="border rounded text-center flex flex-col items-center justify-center lg:gap-4 p-3 lg:px-4">
                <h2 className="text-[40px] lg:text-[56px] font-normal font-anton text-[#B68C5A]">{item.number}+</h2>
                <p className="lg:mt-2 text-gray-600 font-nunito">{item.text}</p>
              </div>
            )
          }
        </div>



      </div>

    </div>
  )
}

export default Banner
