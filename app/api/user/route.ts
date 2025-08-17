import { PrismaClient } from "@/app/generated/prisma"
import { Category } from "@/libs/types"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const category = url.searchParams.get('category')
        if(category){
            if(category !== "all"){

                const response = await prisma.product.findMany({
                    where: {
                        category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() as Category
                    },
                    orderBy: {
                        name: "asc"
                    }
                })
                return NextResponse.json({
                    status: 200,
                    msg: response
                })
            }else{
                const response = await prisma.product.findMany({
                    orderBy: {
                        name: "asc"
                    }
                })
                return NextResponse.json({
                    status: 200,
                    msg: response
                })
            }
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            msg: "Server Error"
        })
    }
}
