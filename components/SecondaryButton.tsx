import Link from 'next/link'
import React from 'react'
import DotTrail from './DotTrail'

const SecondaryButton = ({to,text,className,icon}:{text:string,to:string,className?:string,icon?:boolean}) => {
  return (
    <Link href={to} className={`btn-secondary hover:border-green-[#62F6B5] hover:bg-transparent hover:backdrop-blur-md hover:text-[#62F6B5] hover:border hover:transition-all hover: lg:px-8 justify-evenly items-center gap-2 lg:py-4 px-4 py-3 flex ${className}`}>
                <p className=''>{text}</p>
                {icon && <div className='flex items-center ml-1.5'>
               <DotTrail/>
        </div>   
                }
                
    </Link>
  )
}

export default SecondaryButton