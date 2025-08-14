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
        const price = formData.get('price')
        const discount = formData.get('discount')
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
        console.log(typeof price)
        console.log(typeof discount)
        if (file) {
            if (!file || typeof name !== "string"  || typeof name !== "string" || typeof price !== "string" || typeof discount !== "string" || typeof status !== "string" || typeof category !== "string"  || typeof shortInfo !== "string" || typeof puff !== "string" || typeof nicotineStrength !== "string"
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
                    price:price,
                    discount:discount,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:status as "Latest" | "Old",
                    category:category as Category
                },
                create: {
                    name: name,
                    img: uploadedResponse?.secure_url,
                    shortInfo,
                    price:price,
                    discount:discount,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:status as "Latest" | "Old",
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
            if (!stringFile || typeof name !== "string" || typeof shortInfo !== "string" || typeof status !== "string" || typeof category !== "string" || typeof puff !== "string" || typeof nicotineStrength !== "string"
                || typeof eLiquidCapacity !== "string" || typeof price !== "string" || typeof discount !== "string" || typeof battery !== "string" || typeof features !== "string" || typeof flavors !== "string") {
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
                    price:price,
                    discount:discount,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:status as "Latest" | "Old",
                    category:category as Category

                },
                create: {
                    name: name,
                    img: stringFile,
                    shortInfo,
                    price:price,
                    discount:discount,
                    puffs: puff,
                    nicotineStrength: nicotineStrength,
                    eLiquidCapacity: eLiquidCapacity,
                    features: features,
                    flavors: flavors,
                    battery: battery,
                    status:status as "Latest" | "Old",
                    category:category as Category
                },
                select: {
                    id: true,
                    status:true,
                    category:true,
                    price:true,
                    discount:true
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
        const { currentName } = await req.json()
        console.log(currentName)
        const response = await prisma.product.findFirst({
            where: { name:currentName },
            select: { id: true }
        })

        if (!response?.id) {
            return NextResponse.json({
                msg: "No such component present in server"
            })
        } else {
            const deleteResponse = await prisma.product.delete({
                where: { name:currentName },
                select: { name: true }
            })
            if (deleteResponse.name) {
                return NextResponse.json({
                    msg: `${deleteResponse.name} is Deleted`
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