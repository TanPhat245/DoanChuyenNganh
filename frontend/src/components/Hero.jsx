import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>HÀNH TRÌNH WORLDS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>2024</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>TẠI ĐÂY</p>
                    <p className='w-9 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
      
        <video autoPlay loop muted playsInline className="w-full sm:w-1/2">
  <source src='https://t1shoggado.mycafe24.com/new-pc-video.mp4' type='video/mp4'></source>
</video>
    </div>
  )
}

export default Hero
