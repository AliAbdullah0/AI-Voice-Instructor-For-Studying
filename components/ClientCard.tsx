"use client"
import SpotlightCard from '@/blocks/Components/SpotlightCard/SpotlightCard'
import React, { useOptimistic } from 'react'
import ShinyText from '@/blocks/TextAnimations/ShinyText/ShinyText'
import { CourseType } from '@/types'
import JoinButton from './JoinButton'
import Link from 'next/link'

const ClientCard = ({ id, name, topics, createdAt, description, userId, membersLength, className }: CourseType) => {
    const formatTopics = topics.join(", ");
    const [optimisticEnrollement, setOptimisticEnrollment] = useOptimistic(
        membersLength,
        (current, increment: number) => current + increment
    )

    return (
        <SpotlightCard className={`flex flex-col items-center justify-center w-full lg:w-[32%] md:w-[48%] p-4 rounded-2xl spotlightColor="rgba(0, 229, 255, 0.2) ${className}`}>
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-lg p-2 rounded-xl tracking-wide text-[#62F6B5]'>{name}</h2>
                    <div className="flex gap-1 items-center">
                        <p className='text-sm text-gray-400'>Enrollments: </p>
                        <p className="p-0 text-sm text-[#62F6B5]">{membersLength || '0'} </p>
                    </div>
                </div>
                <div className='flex gap-2 items-center mt-2'>
                    {
                        topics.slice(0, 4).map((topic: string, index: number) => (
                            <Badge key={index} topic={topic.split(' ')[0]} />
                        ))
                    }
                </div>
                <div>
                    <ShinyText className='text-sm mt-2 line-clamp-2' text={description || `Take this course and learn ${formatTopics}`} speed={3} disabled={false} />
                </div>
                <div className="flex items-center justify-between mt-2 w-full">
                    <div className="flex items-center gap-1 lg:gap-2">
                        <JoinButton onJoinOptimistic={() => setOptimisticEnrollment(1)} courseId={id} userId={userId} />
                        <Link href={`/take/${id}`} className='flex w-fit text-[#62F6B5] items-center justify-center hover:bg-white/20 hover:transition-all rounded-3xl text-sm border border-gray-800 bg-white/10 lg:px-5 px-3 py-1.5'><p>Start</p></Link>
                    </div>
                    <p className='text-gray-600 lg:text-sm text-xs'>{createdAt}</p>
                </div>
            </div>
        </SpotlightCard>
    )
}

const Badge = ({ topic, className }: { topic: string, className?: string }) => {
    return (
        <div className={`flex items-center hover:bg-white/20 hover:transition-all rounded-xl text-xs bg-white/10 px-2 py-1.5 ${className}`}>
            <p>{topic}</p>
        </div>
    )
}

export default ClientCard
