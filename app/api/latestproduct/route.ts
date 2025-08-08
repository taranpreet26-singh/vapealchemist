import { PrismaClient } from "@/app/generated/prisma"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()
export async function GET(req:NextRequest) {
    try {
        const {searchParams} =  new URL(req.url)
        const status = searchParams.get('status')
        console.log(status)
        if(status){
            const response = await prisma.product.findMany({
                where:{
                    status:status as "Latest" | "Old"
                },
                orderBy:{
                    name:"asc"
                }
            })   
            return NextResponse.json({
                msg:response
            })     
        }
    } catch (error) {
        console.log(error)
    }
}