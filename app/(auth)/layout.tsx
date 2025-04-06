import { getCurrentUser } from '@/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout =async ({children}:{
    children:React.ReactNode
}) => {
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout