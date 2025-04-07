import Link from 'next/link'
import React from 'react'
import EightDotsGrid from './ui/EightDotGrid';

const PrimaryButton = ({ text, to, className, icon }: {
  text: string;
  to: string;
  className?: string;
  icon?: boolean;
}) => {
  return (
    <Link
      href={to}
      className={`group btn-primary flex items-center justify-evenly rounded-4xl text-3xl lg:px-8 lg:py-4 px-4 py-3 ${className}`}
    >
      <p className='text-neutral-200 text-sm'>{text}</p>
      {icon && (
        <div className='flex items-center ml-2 transform transition-transform duration-500 group-hover:rotate-[360deg]'>
          <EightDotsGrid />
        </div>
      )}
    </Link>
  )
}

export default PrimaryButton
