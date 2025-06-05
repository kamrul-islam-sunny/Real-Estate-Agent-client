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
      <div className="max-w-screen-xl mx-auto h-[620px] px-8 relative bg-bannerColor ">
        <div className="max-w-3xl py-10   border-white">
          <h1 className='text-2xl sm:text-4xl lg:text-6xl  font-normal font-anton text-white leading-20'>Your trusted partner in <span className='text-accent-gold'>Real Estate</span> is Just a Click Away</h1>
          <p className='text-lg font-normal font-nunito text-white leading-6 mt-4 max-w-xl '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>

        <Image src={bannerImg} alt='a person img' width={435} height={580} className='absolute bottom-0 right-10' />


        <div className="max-w-2xl h-80 pt-6 pr-6 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 absolute bottom-0 left-0">
          {
            bannerCard.map((item, i) =>
              <div key={i} className="border rounded text-center flex flex-col items-center justify-center gap-4 px-4">
                <h2 className="text-5xl font-normal font-anton text-[#B68C5A]">{item.number}+</h2>
                <p className="mt-2 text-gray-600 font-nunito">{item.text}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Banner