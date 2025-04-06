import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
      <section 
        className={cn(
          "min-h-screen w-full bg-dark flex justify-center relative", // Add relative here
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      >
        <div className='flex flex-col items-center  justify-center gap-2'>
        <div className='flex flex-col gap-2 justify-center items-center'>
        <h1 className='lg:text-7xl md:text-6xl text-4xl text-white'>Voice AI Agent</h1>
        <h1 className='lg:text-7xl md:text-6xl text-4xl text-white'>For Students</h1>
        </div>
        <div className="flex gap-3 mt-4">
            <Link href="/" className='btn-secondary md:px-14 py-5 md:px-8 py-3 flex gap-2'>
                <p className=''>CONTACT SALES</p>
                <Image src="/svg/dotted-arrow.png" className='' width={22} height={7} alt="arrow" />
            </Link>
            <Link href="/" className='btn-primary rounded-4xl text-3xl md:px-14 px-8 py-3 md:py-5 '>
                <p className='text-neutral-200 text-sm'>SIGN UP</p>
            </Link>
        </div>
        </div>
      </section>
    </>
  )
}

export default Hero
