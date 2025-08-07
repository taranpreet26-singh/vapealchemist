import { NextRequest, NextResponse } from "next/server";

export default function middleware(req:NextRequest){
    const token = req.cookies.get('user-token')?.value
    console.log(token)

    if(!token){
        return NextResponse.redirect(new URL(`/v1/admin/dashboard`,req.url))
    }
    return NextResponse.next()
}

export const config = {
  matcher: ['/v1/admin/dashboard/(.*)'], 
};