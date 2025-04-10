"use client"
import SpotlightCard from '@/blocks/Components/SpotlightCard/SpotlightCard'
import React from 'react'
import ShinyText from '@/blocks/TextAnimations/ShinyText/ShinyText'
import { CourseType } from '@/types'
import JoinButton from './JoinButton'

const ClientCard = ({id,name,topics,createdAt,description,userId,membersLength}:CourseType) => {
    const formatTopics = topics.join(", ");

  return (
    <SpotlightCard className="flex flex-col items-center justify-center w-full md:w-[24%] p-4 rounded-2xl" spotlightColor="rgba(0, 229, 255, 0.2)">
    <div className='flex flex-col gap-1 w-full'>
        <div className='flex justify-between'>
        <h2 className='font-bold text-lg p-2 rounded-xl tracking-wide text-[#62F6B5] '>{name}</h2>
        <div className="flex gap-1 items-center">
            <p className='text-sm text-gray-400'>Enrollments: </p>
            <p  className="p-0 text-sm text-[#62F6B5]">{membersLength || '0'} </p>
        </div>
        </div>
        <div className='flex gap-2 items-center mt-2'>
        {
            topics.map((topic:string,index:number)=>(
                <Badge key={index} topic={topic} />
            ))
        }
        </div>
        <div>
            <ShinyText className='text-sm mt-2' text={description || `Take this course and learn ${formatTopics}`} speed={3} disabled={false} />
        </div>
        <div className="flex items-center justify-between mt-2 w-full">
            <JoinButton courseId={id} userId={userId} />
            <p className='text-gray-600 text-sm'>{createdAt}</p>
        </div>
    </div>
</SpotlightCard>
  )
}

const Badge = ({topic,className}:{topic:string,className?:string})=>{
    return(
        <div className={`flex items-center hover:bg-white/20 hover:transition-all rounded-xl text-xs bg-white/10 px-2 py-1.5 ${className}`}>
            <p>{topic}</p>
        </div>
    )
}

export default ClientCard