import { getCurrentUser } from '@/actions/user.actions'
import Agent from '@/components/Agent'
import { redirect } from 'next/navigation'
import React from 'react'

const GenerateCourse = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser) redirect('/sign-in')
  return (
    <Agent type='generate' username={currentUser.username} userId={currentUser.id}/>
  )
}

export default GenerateCourse