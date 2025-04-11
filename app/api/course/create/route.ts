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
            The optional detail of the course by user is: ${prompt}.
            Please return only the lessons, without any additional text. Produce courses according to prompt only if the prompt is provided else create a detailed lesson for the course each lesson should be detailed and specific moreover every lesson should have more than 120 words . 
            The lessons are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return ONLY a raw JSON array like ["Lesson 1", "Lesson 2"]. Do NOT wrap it in triple backticks.
            
            Thank you <3`
        })
        const cleanText = text
  .trim()
  .replace(/^```json/, '')
  .replace(/^```/, '')
  .replace(/```$/, '')
  .trim();
        const courseData = {
            name: subject,              
            level,                      
            topics: topics.split(","), 
            lessons: JSON.parse(cleanText), 
            prompt: prompt || null,    
            ownerId:userId ?? '', 
          };
        console.log(text)
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