import { getCurrentUser } from '@/actions/user.actions'
import Image from 'next/image'
import CourseCard from './CourseCard'
import { getCurrentUserCourses, getCurrentUserEnrolledCourses } from '@/actions/course.actions'
import Link from 'next/link'

const Profile = async () => {
  const user = await getCurrentUser()
  const courses = await getCurrentUserCourses()
  const enrolledCourses = await getCurrentUserEnrolledCourses()

  
  return (
    <section className='bg-dark flex-col flex w-full p-4'>
        <div className='flex justify-between md:flex-row md:gap-0 gap-3 flex-col-reverse w-full mt-[4.6rem]'>
            <div className='md:w-[75%] w-full bg-neutral-900 p-4 rounded-2xl'>
              <div className='flex w-full overscroll-x-auto overflow-y-hidden gap-2'>
                {
                  courses.length > 0 ?
                  courses.map((course)=>(
                    <CourseCard key={course.id} id={course.id} name={course.name} topics={course.topics} createdAt={course.createdAt} description={course.description} userId={user.id} membersLength={course.usersEnrolled.length}/>
                  )):<p className='text-center text-primary'>No Courses Created Yet</p>
                }
              </div>
            </div>
            <div className='md:w-[24%] w-full bg-neutral-900 rounded-2xl p-4'>
              <div className='flex flex-col w-full items-center'>
                <div className='rounded-full h-20 w-20 '>
                  <Image src={'/user-avatar.png'} alt={user.username} width={40} height={40} className='object-cover w-full rounded-full'/>
                </div>
                <div className='flex flex-col '>
                  <h2 className='text-[#62F6B5] text-2xl font-bold first-letter:uppercase'>{user.username}</h2>
                  <p className='text-xs text-center text-gray-400'>{user.createdAt.toLocaleDateString().toString()}</p>
                </div>
                <div className='flex items-center md:gap-3 gap-1.5 mt-2'>
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='font-bold text-xs lg:text-sm text-[#62F6B5]'>Courses Created</h2>
                    <p className='text-primary font-bold'>{user.coursesCreated.length || '0'}</p>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='font-bold text-xs lg:text-sm text-[#62F6B5]'>Courses Enrolled In</h2>
                    <p className='text-primary font-bold'>{user.enrollments.length || '0'}</p>
                  </div>
                </div>
                <button className='btn-secondary hover:border-green-[#62F6B5] hover:bg-transparent hover:backdrop-blur-md hover:text-[#62F6B5] hover:border hover:transition-all hover: lg:px-5 justify-evenly items-center gap-2 lg:py-2 px-4 py-2 flex mt-2 w-[60%]'>Update</button>
              </div>
            </div>
        </div>
        <div className='flex gap-2 mt-2 flex-col '>
          <h2 className='text-[#62F6B5] text-2xl font-bold '>Currently Enrolled In:</h2>
          <div className={`w-full ${enrolledCourses.length < 3 ? `justify-start`: `justify-center`} md:flex-row flex-col flex-wrap gap-3 flex`}>
          {
            enrolledCourses.length > 0 ? enrolledCourses.map((course)=>(
              <CourseCard key={course.id} id={course.id} name={course.name} topics={course.topics} createdAt={course.createdAt.toLocaleDateString().toString()} description={course.description} userId={user.id} membersLength={course.usersEnrolled.length}/>
            )):<p className='text-primary'>Not Enrolled in any courses yet! <Link href={'/courses'} className='text-[#62F6B5] ml-1'>Enroll Now!</Link> </p>
          }
          </div>
        </div>
    </section>
  )
}

export default Profile