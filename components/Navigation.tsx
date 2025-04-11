"use client"
import Link from 'next/link'
import React, { useState } from 'react'


const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleMobileMenu = ()=>{
        setIsOpen(prev => !prev)
    }
    
  return (
    <>
    <nav className='w-full py-4 fixed hidden px-20 md:flex items-center justify-between bg-dark border-b backdrop-blur-2xl z-50 top-0 border-b-gray-700'>
        <h1 className='text-[#FFFAEA] text-sm font-extrabold tracking-wide'>BRAIN WAVES</h1>
        <div className='flex-1 flex justify-evenly ml-2 gap-4 items-center'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/courses'>Courses</NavLink>
            <NavLink to='/generate'>Create</NavLink>
            <NavLink to='/blogs'>Blog</NavLink>
            <NavLink to='/careers'>Careers</NavLink>
            <NavLink to='/startups'>Startups</NavLink>
        </div>
        <Link href='/profile' className='btn-primary py-2'>Profile</Link>
    </nav>
    <nav className='md:hidden w-full fixed top-0 z-50  bg-dark border-b border-b-gray-700 border-dotted flex px-7 py-4 items-center justify-between'>
        <h1 className='text-[#FFFAEA] text-sm font-extrabold tracking-wide'>BRAIN WAVES</h1>
        <div className='flex items-center'>
        <Link href='/profile' className='btn-primary px-2 py-1'>Profile</Link>
        <MenuButton handleButton={handleMobileMenu} />
        </div>
    </nav>
    {
        isOpen && (
            <div className='flex flex-col w-full absolute top-12 z-50 text-center bg-dark/40 text-primary border-b backdrop-blur-2xl border-b-gray-700 border-dotted'>
             <NavLink to='/'>Home</NavLink>
            <NavLink to='/courses'>Courses</NavLink>
            <NavLink to='/generate'>Create</NavLink>
            <NavLink to='/blogs'>Blog</NavLink>
            <NavLink to='/careers'>Careers</NavLink>
            <NavLink to='/startups'>Startups</NavLink>
            </div>
        )
    }
    </>
  )
}

const NavLink = ({ children, to, className }: { children: React.ReactNode; to: string; className?: string;}) => {
  return (
    <Link
      href={to}
      className={`text-sm text-neutral-100 ${className} hover:bg-white/10 hover:rounded-md px-3 py-2 hover:transition-all'}`
      }
    >
      {children}
    </Link>
  )
}

export const MenuButton = ({handleButton}: {handleButton:()=>void}) => {
    return(
        <>
            <button className='btn-primary antialiased border-none focus:rotate-90 focus:transition-all bg-transparent' onClick={handleButton}>
            <div className='flex flex-col gap-0.5 items-center justify-center'>
            <div className='flex items-center gap-1'>
            <div className='h-1 bg-neutral-200 w-1 rounded-full'></div>
            <div className='h-1  w-1 rounded-full'></div>
            <div className='h-1 bg-neutral-200 w-1 rounded-full'></div>
            </div>
            <div className='flex items-center gap-1'>
            <div className='h-1 w-1 rounded-full'></div>
            <div className='h-1 border-1 bg-transparent border-neutral-200 w-1 rounded-full'></div>
            <div className='h-1  w-1 rounded-full'></div>

            </div>
            <div className='flex items-center gap-1'>
            <div className='h-1 bg-neutral-200 w-1 rounded-full'></div>
            <div className='h-1 w-1 rounded-full'></div>
            <div className='h-1 bg-neutral-200 w-1 rounded-full'></div>
            </div>
            </div>
        </button>
        </>
    )
}

export default Navigation
