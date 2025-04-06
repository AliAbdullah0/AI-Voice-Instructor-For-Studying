import { NextRequest, NextResponse } from "next/server"
import {generateText} from 'ai'
import {google} from '@ai-sdk/google'
import { prisma } from "@/lib/prisma"

export const GET = async ()=>{
    return NextResponse.json({
        success:true,
        data:'Thank You',
    },{status:200})
}

export const POST = async (request:NextRequest)=>{
    const { subject,level,topics,lessons,prompt,userId } = await request.json()
    
    try{
        const {text} = await generateText({
            model:google('gemini-2.0-flash-001'),
            prompt:`Prepare lessons for a education course.
            The course subject is ${subject}.
            The course experience level is ${level}.
            The topics to include in course are: ${topics}.
            The number of lessons required are: ${lessons}.
            The optional course by user is: ${prompt}.
            Please return only the lessons, without any additional text.
            The lessons are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return the lessons formatted like this:
            ["Lesson 1", "Lesson 2", "Lesson 3"]
            
            Thank you <3`
        })

        const courseData = {
            name: subject,              // 'subject' maps to 'name'
            level,                      // Store the level
            topics: topics.split(","),  // Convert comma-separated string to array
            lessons: JSON.parse(text),  // Parse AI-generated lessons array
            prompt: prompt || null,     // Optional prompt, null if not provided
            ownerId:userId ?? '',        // Link to the authenticated user
          };

        await prisma.course.create({
            data:courseData
        })

        return NextResponse.json({
            sucess:true,
            data:courseData
        },{status:201})
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success:false,
            error:error
        },{status:500})
    }
}