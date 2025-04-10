import { getCurrentUser } from '@/actions/user.actions'
import Agent from '@/components/Agent'
import React from 'react'

const GenerateCourse = async () => {
    const currentUser = await getCurrentUser()
  return (
    <Agent type='generate' username={currentUser.username} userId={currentUser.id}/>
  )
}

export default GenerateCourse