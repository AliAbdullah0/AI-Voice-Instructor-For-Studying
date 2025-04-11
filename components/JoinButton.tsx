"use client"
import { addMemberToCourse } from '@/actions/course.actions'
import { toast } from 'sonner'
import { startTransition, useState } from 'react'
import { Loader2 } from 'lucide-react'
import ShinyText from '@/blocks/TextAnimations/ShinyText/ShinyText'

const JoinButton = ({ courseId, userId, onJoinOptimistic }: { userId: string, courseId: string,onJoinOptimistic:() => void }) => {
  const [isEnrolling, setIsEnrolling] = useState(false)

  const handleSubmit = async () => {
    setIsEnrolling(true)
    startTransition(()=>(
      onJoinOptimistic()
    ))
    try {
        const response = await addMemberToCourse(userId, courseId)
        if (response.success) {
      toast.success("Successfully Enrolled in the course.")
    } else {
      toast.error("Error Enrolling in the course.")
    }
    setIsEnrolling(false)
} catch (error) {
    toast.error("Already Enrolled in this course.")
    setIsEnrolling(false)
    }
  }

  return (
      <button onClick={handleSubmit} className='flex w-fit items-center justify-center hover:bg-white/20 hover:transition-all rounded-3xl text-sm border border-gray-800 bg-white/10 px-5 py-1.5' type="submit" disabled={isEnrolling}>
        {
            isEnrolling ? <Loader2 className='text-[#62F6B5] h-5 animate-spin'/> : <ShinyText text="Enroll" />
        }
    </button>
  )
}
export default JoinButton