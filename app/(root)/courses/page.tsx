import { getAllCourses } from '@/actions/course.actions'
import CourseCard from '@/components/CourseCard'
import React from 'react'

const Courses = async () => {
  const courses = await getAllCourses()
  return (
    <div className={`w-full mt-20 ${courses.length < 3 ? `justify-start`: `justify-start`} md:flex-row flex-col flex-wrap gap-3 flex p-3`}>
        { courses.length > 0 ?
          courses.map((course)=>(
            <CourseCard cour id={course.id} key={course.id} createdAt={course.createdAt.toLocaleDateString().toString()} name={course.name} topics={course.topics}/>
          )):'No Courses Found!'
        }
    </div>
  )
}

export default Courses