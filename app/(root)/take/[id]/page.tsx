import { getCourseById } from '@/actions/course.actions';
import { getCurrentUser } from '@/actions/user.actions'
import Agent from '@/components/Agent'
import { CourseType, RouteParams } from '@/types';
import React from 'react'


const TakeCourse = async ({params}:RouteParams) => {
    const { id } = await params;
    const userId = (await getCurrentUser()).id;
    const course:CourseType = await getCourseById(id)
  return (
    <Agent type='study' lesson={course.lessons} level={course.level} subject={course.name} topics={course.topics} userId={userId}  />
  )
}

export default TakeCourse