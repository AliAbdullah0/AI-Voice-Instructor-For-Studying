import { CourseType } from '@/types'
import React from 'react'
import ClientCard from './ClientCard'
import { getCurrentUser } from '@/actions/user.actions'
import { getLengthOfEnrolledUsers } from '@/actions/course.actions'
const CourseCard = async ({id,name,topics,createdAt,description,className}:CourseType) => {
    const userId = (await getCurrentUser()).id
    const membersLength = await getLengthOfEnrolledUsers(id)
  return (
    <ClientCard id={id} name={name} topics={topics} membersLength={membersLength} className={className} createdAt={createdAt} description={description} userId={userId}/>
  )
  }

export default CourseCard