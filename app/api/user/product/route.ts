import { PrismaClient } from "@/app/generated/prisma"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()
export async function GET(req:NextRequest) {
    try {
        const {searchParams} =  new URL(req.url)
        const id = searchParams.get('id')
        if(id){
            const response = await prisma.product.findUnique({
                where:{
                    id:id
                }
            })   
            return NextResponse.json({
                msg:response
            })     
        }
    } catch (error) {
    }
}