import { Category, PrismaClient } from "@/app/generated/prisma";
import cloudinary from "@/libs/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

enum ProductStatus {
  Latest,
  Old
}
export async function POST(req: NextRequest) {
    try {
        console.log("enter")
        const formData = await req.formData()
        const file = formData.get('file') as File
        const name = formData.get('name')
        const status = formData.get('status')
        const category = formData.get('category')
        const shortInfo = formData.get('shortInfo')
        const puff = formData.get('puff')
        const nicotineStrength = formData.get('nicotineStrength')
        const eLiquidCapacity = formData.get('eLiquidCapacity')
        const battery = formData.get('battery')
        const features = formData.get('features')
        const flavors = formData.get('flavors')
        const stringFile = formData.get("stringFile") as string
        console.log(stringFile)
        console.log(category)
        if (file) {
            if (!file || typeof name !== "string"  || typeof name !== "string" || typeof category !== "string"  || typeof shortInfo !== "string" || typeof puff !== "string" || typeof nicotineStrength !== "string"
                || typeof eLiquidCapacity !== "string" || typeof battery !== "string" || typeof features !== "string" || typeof flavors !== "string"
            ) {
                return NextResponse.json({ msg: "Invalid form data" }, { status: 400 });
            }
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const uploadedResponse: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ resource_type: "image" }, (error, result) => {
                        if (result)
                            if (error) reject(error);
                            else resolve(result);
                    })
                    .end(buffer);
            });

            const response = await prisma.product.upsert({
                update: {
                    img: uploadedResponse?.secure_url,
                    shortInfo,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:Number(status) === 0 ? "Latest" : "Old",
                    category:category as Category
                },
                create: {
                    name: name,
                    img: uploadedResponse?.secure_url,
                    shortInfo,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:Number(status) === 0 ? "Latest" : "Old",
                    category:category as Category
                },
                where: {
                    name: name
                },
                select: {
                    id: true,
                    status:true
                }
            })
            console.log(response)
            if (response.id) {
                return NextResponse.json({
                    status: 200,
                    msg: `${name} Uploaded`
                })
            } else {
                return NextResponse.json({
                    status: 401,
                    msg: "Process hung Or Server Error"
                })
            }
        } else {
            if (!stringFile || typeof name !== "string" || typeof shortInfo !== "string" || typeof category !== "string" || typeof puff !== "string" || typeof nicotineStrength !== "string"
                || typeof eLiquidCapacity !== "string" || typeof battery !== "string" || typeof features !== "string" || typeof flavors !== "string") {
                return NextResponse.json({ msg: "Invalid form data" }, { status: 400 });
            }


            const response = await prisma.product.upsert({
                where: {
                    name
                },
                update: {
                    img: stringFile,
                    shortInfo,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:Number(status) === 0 ? "Latest" : "Old",
                    category:category as Category

                },
                create: {
                    name: name,
                    img: stringFile,
                    shortInfo,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:Number(status) === 0 ? "Latest" : "Old",
                    category:category as Category
                },
                select: {
                    id: true,
                    status:true,
                    category:true
                }
            })
            console.log(response)
            if (response.id) {
                return NextResponse.json({
                    status: 200,
                    msg: `${name} Uploaded`
                })
            } else {
                return NextResponse.json({
                    status: 401,
                    msg: "Process hung Or Server Error"
                })
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            msg: "Server Error"
        })
    }
}


export async function GET(req: NextRequest) {
    try {
        const response = await prisma.product.findMany({
            orderBy: {
                name: "asc"
            }
        })
        return NextResponse.json({
            status: 200,
            msg: response
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            msg: "Server Error"
        })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { name } = await req.json()
        console.log(name)
        const response = await prisma.product.findFirst({
            where: { name },
            select: { id: true }
        })

        if (!response?.id) {
            return NextResponse.json({
                msg: "No such component present in server"
            })
        } else {
            const deleteResponse = await prisma.product.delete({
                where: { name },
                select: { name: true }
            })
            if (deleteResponse.name) {
                return NextResponse.json({
                    msg: `${name} is Deleted`
                })
            } else {
                return NextResponse.json({
                    msg: `Unexpected Error Occur`
                })
            }
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            msg: "Server Error"
        })
    }
}