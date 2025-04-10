"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "./user.actions"

export const getCourseById = async (id:string)=>{
    try {
        const response = await prisma.course.findUnique({
            where:{
                id:id
            }
        })
        return response
    } catch (error) {
        throw new Error("Error Fetching Course")
    }
}

export const getCurrentUserCourses = async ()=>{
    const userId = (await getCurrentUser()).id;
    try {
        const courses = await prisma.course.findMany({
            where:{
                ownerId:userId
            }
        })

        if(!courses) throw new Error("You haven't created any courses yet!")

        return courses
    } catch (error) {
        throw new Error("Error fetching User courses!")        
    }
}

export const getAllCourses = async ()=>{
    try {
        const courses = await prisma.course.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        if(!courses.length) throw new Error('No Courses Found!')
        return courses
    } catch (error) {
        throw new Error("Error fetching all courses!")        
    }
}

export const deleteCourse = async(id:string)=>{
    const userId = (await getCurrentUser()).id
    try {
        const response = await prisma.course.delete({
            where:{
                id:id,
                AND:{
                    ownerId:id
                }
            }
        })
        return {
            success:true,
            status:200
        }
    } catch (error) {
        throw new Error("Error deleting course.")        
    }
}

export const addMemberToCourse = async (userId:string,courseId:string)=>{
    try {
        const response = await prisma.members.create({
            data:{
                courseId:courseId,
                studentId:userId
            }
        })

        return {
            success:true,
            status:200
        }
    } catch (error) {
        throw new Error(`Error occured while adding member ${userId} to course ${courseId}`)        
    }
}

export const getLengthOfEnrolledUsers = async (courseId:string)=>{
    try {
        const course = await getCourseById(courseId)
        if(!course) throw new Error("Course Not Found!")

        const enrolledUsers = await prisma.members.findMany({
            where:{
                courseId:courseId
            }
        })

        if(enrolledUsers.length > 0) return enrolledUsers.length
        else return 0
    } catch (error) {
        return 0
    }
}