import { getCourseById } from '@/actions/course.actions';
import { getCurrentUser } from '@/actions/user.actions'
import Agent from '@/components/Agent'
import { CourseType, RouteParams } from '@/types';
import React from 'react'

export async function generateMetadata({ params }: RouteParams) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) {
    return {
      title: "Course Not Found",
      description: "The course you are looking for does not exist.",
    };
  }
  return {
    title: `${course.name}`,
    description: course.description || `Learn ${user.name}'s using Brain Wave's Voice AI Instructors.`,
  };
}

const TakeCourse = async ({params}:RouteParams) => {
    const { id } = await params;
    const userId = (await getCurrentUser()).id;
    const course:CourseType = await getCourseById(id)
  return (
    <Agent type='study' lesson={course.lessons} level={course.level} subject={course.name} topics={course.topics} userId={userId}  />
  )
}

export default TakeCourse