"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const generateToken = async (id:string)=>{
    const cookie = cookies()
    const token = (await cookie).set('session_token',id,{
       httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    console.log(token.get('session_token')?.value);
    
    return token;
}

export const getUserId = async () => {
    const cookie = await cookies(); 
    const ownerId = cookie.get("session_token")?.value;
    console.log("Owner ID:", ownerId); 
    return ownerId;
};

export const verifyToken = async ()=>{
    const cookie = await cookies()
    const token = cookie.get('session_token')

    if(!token) return { success:false,status:403 }

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:token.value
            }
        })

        if(!user) throw new Error('User not found')

        return {
            success:true,
            status:200
        }
    } catch (error) {
        return {
            success:false,
            status:500
        }
    }
}


export const createUser = async (formData:FormData) => {
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string   

    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser) throw new Error('User already exists')
        const hashedPassword = await bcrypt.hash(password, 10)
        const response = await prisma.user.create({
            data:{
                username,
                email,
                password:hashedPassword
            }
        })

        return {
            success:true,
            status:201
        }
    } catch (error) {
        return {
            success:false,
            status:500
        }
    }
}

export const loginUser = async (formData:FormData)=>{
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user) throw new Error('User not found')

        const verifyUserPassword = await bcrypt.compare(password, user.password)

        if(verifyUserPassword){
            await generateToken(user.id)

            return {
                success:true,
                status:200
            }

        }else{
            return {
                success:false,
                status:403
            }
        }
    } catch (error) {
        return {
            success:false,
            status:500
        }
    }

}



export const signOutUser = async ()=>{
    const cookie = await cookies()
    const token = cookie.delete('session_token')
}

export const getCurrentUser = async ()=>{
    const cookie = await cookies()
    const userId = cookie.get('session_token')?.value

    if(!userId) redirect('/sign-in')

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        return user
    } catch (error) {
        redirect('/sign-in')
    }
}

export const updateUser = async (formData:FormData)=>{
    const user = await getCurrentUser()
    const userId = user?.id
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                username,
                email,
                password,
                ...user
            }
        })
    }catch(err){
        throw new Error(`Error Updating User ${err}`)
    }

}