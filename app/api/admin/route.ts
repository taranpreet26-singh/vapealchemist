import { PrismaClient } from "@/app/generated/prisma"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()
        console.log(email, password)
        const response = await prisma.admin.findFirst({
            where: {
                email: email,
                password: password
            },
            select: {
                id: true
            }
        })
        const cookieStore = await cookies();
        cookieStore.set('user-token', '123abc', {
            httpOnly: true,
            secure: true,
            path: '/',
        });

        console.log(response)
        if (response?.id) {
            return NextResponse.json({
                status: 200,
                msg: "Welcome Back Admin",
                token: "Cookies Set"
            })
        } else {
            return NextResponse.json({
                status: 401,
                msg: "Please Check you credentials"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            msg: "Server Error"
        })
    }
}