import { PrismaClient } from "@/app/generated/prisma";
import { Category } from "@/libs/types";

export const vapeProducts = [
    {
        id: "84f98e97-ac03-4531-8817-e95512e73386",
        name: "Fog",
        shortInfo: "High-capacity disposable vape with 2000–5000 puffs and premium flavor range.",
        puffs: "2000–5000",
        nicotineStrength: "20 mg/mL",
        eLiquidCapacity: "6–10 mL",
        battery: "Built-in (non-rechargeable or rechargeable)",
        features: ["Draw-activated", "Leak-resistant", "Sleek and slim design"],
        flavors: [
            "Guava Ice",
            "Blue Razz Ice",
            "Strawberry Kiwi Ice",
            "Raspberry Dragon Fruit Ice",
            "Pink Lemon Ice",
            "Dragonfruit Strawberry Ice",
            "Clouds",
            "Grape Ice",
            "Mint",
            "Strawberry Banana",
            "Double Apple Ice",
            "Kiwi Berry Ice",
            "Pineapple Coconut Ice",
            "Wild Strawberry Ice",
            "Watermelon Ice",
            "Cherry Ice",
            "Peaches & Cream",
            "Raspberry Ice",
            "Nectarine Ice",
            "Peach Blue Raspberry",
            "Orange Fizz",
            "Pineapple Ice",
            "Mango Peach Ice",
            "Mango Ice"
        ],
        img: "https://res.cloudinary.com/dlgxcxkgb/image/upload/v1754472755/ydvvtyx35evewtu4ucmc.png",
        status: "Old",
        category: "Ejuices",
        discount: 25,
        price: 5
    },
    {
        id: "d75cfa2a-31b6-492e-9f45-f14c79c5f66a",
        name: "MaskKing 3500",
        shortInfo: "Premium long-lasting vape with 3500 puffs, ergonomic build, and wide flavor variety.",
        puffs: "3500",
        nicotineStrength: "20 mg/mL",
        eLiquidCapacity: "Not specified",
        battery: "1200mAh (non-rechargeable)",
        features: ["Ergonomic and lightweight", "Leak-resistant", "Pre-filled and pre-charged"],
        flavors: [
            "Mango Peach Tangerine",
            "Cherry Dark Fizz",
            "DragonFruit Strawberry Ice",
            "Polar Ice",
            "Peach Ice",
            "Banana Ice",
            "Lush Ice",
            "Cool Mint",
            "Blueberry Ice"
        ],
        img: "https://res.cloudinary.com/dlgxcxkgb/image/upload/v1754474147/ughjb3u1n7ogd7ggvgmj.png",
        status: "Latest",
        category: "Disposables",
        discount: 50,
        price: 10
    },
    {
        id: "dbfb2348-1ac1-4b0e-9628-ecbd7ccc5946",
        name: "Allo 500",
        shortInfo: "Compact and beginner-friendly vape offering 500 smooth puffs with no refilling or charging.",
        puffs: "500",
        nicotineStrength: "20 mg/mL",
        eLiquidCapacity: "2 mL",
        battery: "350mAh (non-rechargeable)",
        features: ["Draw-activated firing mechanism", "No charging or refilling", "Compact and lightweight"],
        flavors: ["Pink lemon", "Blueberry ice", "Grape ice", "Fuji apple ice", "Pineapple ice", "Spearmint", "Peach"],
        img: "https://res.cloudinary.com/dlgxcxkgb/image/upload/v1754471597/y9ii6ebbr9os3xdz684u.png",
        status: "Latest",
        category: "Disposables",
        discount: 0,
        price: 20
    },
    {
        id: "815a8689-5350-401c-b430-efa6a7589365",
        name: "G Core Intense 3000",
        shortInfo: "Flavor-packed 3000 puff vape with mesh coil and soft drip tip for a smooth experience.",
        puffs: "3000",
        nicotineStrength: "20 mg/mL",
        eLiquidCapacity: "4 mL",
        battery: "850mAh (non-rechargeable)",
        features: ["Mesh coil system", "Food-grade drip tip", "Leak-resistant build"],
        flavors: ["Strawberry Kiwi", "Peach Ice", "R.B.", "Blue Razz", "Classico Ice", "Blueberry Ice", "Triple Berry Ice"],
        img: "https://res.cloudinary.com/dlgxcxkgb/image/upload/v1754474020/smuh6jjrtdtixr6qpvzf.png",
        status: "Old",
        category: "Devices",
        discount: 10,
        price: 30
    },
    {
        id: "33703f03-e852-4f08-b6d8-7b8d2d7b02de",
        name: "King Ice 1000",
        shortInfo: "Sleek disposable vape with up to 1000 puffs and strong flavor delivery in a compact body.",
        puffs: "1000",
        nicotineStrength: "20 mg/mL",
        eLiquidCapacity: "2 mL",
        battery: "400–500mAh (non-rechargeable)",
        features: ["Draw-activated firing", "Matte finish, leak-resistant", "No charging or refilling"],
        flavors: [
            "Sour Apple Ice",
            "Strawberry Pina Clda",
            "Tropical Fruit Ice",
            "Strawberry Watermelon BBG",
            "Frozen Peach",
            "Frozen Mango",
            "Frozen Watermelon",
            "Strawberry Kiwi",
            "Grape Burst"
        ],
        img: "https://res.cloudinary.com/dlgxcxkgb/image/upload/v1754472554/tvlsjldyzfrw4vypu0iy.png",
        status: "Old",
        category: "Ejuices",
        discount: 50,
        price: 100
    },
    {
        id: "fb73e1be-7e49-4891-86a8-5b351706757f",
        name: "O2 Disposable",
        shortInfo: "Portable 600-puff vape with clean and consistent vapor in a ready-to-use design.",
        puffs: "600",
        nicotineStrength: "20 mg/mL",
        eLiquidCapacity: "Not specified",
        battery: "Pre-charged",
        features: ["Draw-activated", "Leak-resistant", "Compact and easy to use"],
        flavors: ["Mexican Mango", "Blue Razz", "Berry Trio Icy", "Peach Lemon", "California Cherry"],
        img: "https://res.cloudinary.com/dlgxcxkgb/image/upload/v1754473095/zzy2zdehk142dmyvdlhn.png",
        status: "Latest",
        category: "Disposables",
        discount: 20,
        price: 4
    }
];

const prisma = new PrismaClient()
async function main() {
    try {
        vapeProducts.forEach(async (element) => {
            const response = await prisma.product.upsert({
                where: {
                    id: element.id
                },
                update: {
                    img: element.img,
                    shortInfo: element.shortInfo,
                    puffs: element.puffs,
                    price: element.price.toString(),
                    discount: element.discount.toString(),
                    nicotineStrength: element.nicotineStrength,
                    eLiquidCapacity: element.eLiquidCapacity,
                    features: JSON.stringify(element.features),
                    flavors: JSON.stringify(element.flavors),
                    battery: element.battery,
                    status: element.status as "Latest" | "Old",
                    category: element.category as Category

                },
                create: {
                    name: element.name,
                    img: element.img,
                    shortInfo: element.shortInfo,
                    puffs: element.puffs,
                    price: element.price.toString(),
                    discount: element.discount.toString(),
                    nicotineStrength: element.nicotineStrength,
                    eLiquidCapacity: element.eLiquidCapacity,
                    features: JSON.stringify(element.features),
                    flavors: JSON.stringify(element.flavors),
                    battery: element.battery,
                    status: element.status as "Latest" | "Old",
                    category: element.category as Category
                },
            })
        })
    } catch (error) {
    }
}


main()