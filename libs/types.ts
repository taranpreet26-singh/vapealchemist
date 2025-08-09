import { ProductStatus } from "@/app/generated/prisma"

export type objectVapesType = {
    id:string,
    name: string,
    shortInfo: string,
    puffs: string,
    nicotineStrength: string,
    eLiquidCapacity: string,
    battery: string,
    features: string[],
    flavors: string[],
    img: string,
    status : ProductStatus,
    category :Category,
    price : string,
    discount :string
}[]


export type objectVapesTypeSingle = {
    id:string,
    name: string,
    shortInfo: string,
    puffs: string,
    nicotineStrength: string,
    eLiquidCapacity: string,
    battery: string,
    features: string[],
    flavors: string[],
    img: string,
    status : ProductStatus,
    category :Category,
    price : string,
    discount :string
}

export enum Category {
  Disposables= "Disposables",
  Ejuices = "Ejuices",
  Devices = "Devices",
  Accessories = "Accessories"
}
