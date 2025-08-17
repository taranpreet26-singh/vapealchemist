"use client"
import { Lens } from "@/components/ui/lens"
import { ShootingStars } from "@/components/ui/shootingStar"
import { StarsBackground } from "@/components/ui/starsBackground"
import { objectVapesTypeSingle } from "@/libs/types"
import axios from "axios"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { easeInOut, motion } from "framer-motion"
import { FeatureSectionGlowingStar } from "@/components/Features"
import { Skeleton } from "@/components/ui/skeleton"
import { AboutUs } from "@/components/AboutUs"
import toast, { Toaster } from "react-hot-toast"
import TopSelling from "@/components/TopSelling"

interface objectVapesType extends objectVapesTypeSingle {
    count: number
}

export default function Product() {
    const router = useParams()
    const navigation = useRouter()
    const [hovering, setHovering] = useState(false);
    const [data, setData] = useState<objectVapesType>()
    async function fetch() {
        try {
            const response = await axios.get(`/api/user/product?id=${router.productId}`)
            setData(response.data.msg)
            console.log(response.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetch()
    }, [])
    function handleLocalStorage() {
        const existingCart = localStorage.getItem('cart');
        let cart = existingCart ? JSON.parse(existingCart) : [];

        const existingIndex = cart.findIndex((item: any) => item.id === data?.id);

        if (data) {
            if (existingIndex !== -1) {
                cart[existingIndex].count += 1;
            } else {
                cart.push({ ...data, count: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event("cartUpdated"));
        }
    }
    return <section className="w-full h-full ">
        {
            data ?
                <div className="py-20 lg:py-10 px-6 lg:px-20">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-15 h-full">
                        <div className="">
                            <Lens hovering={hovering} setHovering={setHovering}>
                                <div className="w-full  flex items-center bg-[#1F2121] rounded-lg p-6 justify-center h-fit  relative">
                                    <Image src={data?.img} alt={data?.name} width={400} height={400} />
                                    <ShootingStars />
                                    <StarsBackground />
                                </div>
                            </Lens>
                            <div className="hidden md:flex w-full flex-col  gap-5">
                                <div className="mt-4 ">
                                    <h2 className={`max-w-7xl text-lg lg:text-xl font-semibold  dark:text-neutral-200 font-sans`}>
                                        Vape Lowdown
                                    </h2>
                                    <ul className="p-2  min-w-xs text-sm lg:text-lg font-normal">
                                        <li className="flex gap-4"><RightArrow /> {data.puffs}</li>
                                        {
                                            data.nicotineStrength !== "" &&
                                        <li className="flex gap-4"><RightArrow /> {data.nicotineStrength} Nicotine Strength.</li>
                                        }
                                        {
                                            data.eLiquidCapacity !== "" &&
                                        <li className="flex gap-4"><RightArrow /> {data.eLiquidCapacity} E-Liquid Capacity.</li>
                                        }
                                        {
                                            data.battery !=="" && 
                                        <li className="flex gap-4"><RightArrow /> {data.battery} Battery Life.</li>
                                        }
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h2 className={`max-w-7xl text-lg lg:text-xl font-semibold  dark:text-neutral-200 font-sans`}>
                                        Core Features
                                    </h2>
                                    <ul className="flex flex-col  gap-2 p-2">
                                        {
                                            JSON.parse(data.features.toString())?.map((element: string, index: string) => {
                                                return <li key={index} className="flex text-sm font-normal lg:text-lg gap-4"><Disk /> {element}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2 mb-4">
                                {data.discount !== "0" &&
                                    <div className="border text-red-400 border-px border-red-400 text-xs rounded-[2px] w-fit h-fit px-1 ">
                                        {data.discount}% OFF
                                    </div>
                                }
                                {
                                    data.status === "Latest" &&
                                    <div className="border text-green-400 border-px border-green-400 text-xs rounded-[2px] w-fit h-fit px-1 ">
                                        New on the Shelf
                                    </div>
                                }
                            </div>
                            <h2 className="max-w-7xl  text-3xl lg:text-5xl font-bold text-neutral-200 font-sans">
                                {data?.name}
                            </h2>
                            <h2 className="max-w-7xl text-xs sm:text-sm lg:text-lg font-medium text-neutral-200/70 font-sans">
                                {data?.shortInfo}
                            </h2>
                            <div className="flex mt-4 gap-4">
                                <h2 className={`max-w-7xl text-lg ${data.discount !== "0" ? "line-through decoration-neutral-300 decoration-[1.5px]" : ""}  lg:text-xl font-bold text-neutral-800 dark:text-neutral-200 font-sans`}>
                                    ${data?.price}
                                </h2>
                                {
                                    data.discount !== "0" &&
                                    <h2 className={`max-w-7xl text-lg lg:text-xl font-bold  dark:text-red-400 font-sans`}>
                                        ${(Number(data?.price) - Number(data.price) * (Number(data.discount) / 100)).toString()} <sup className="text-xs">{data.discount}% off</sup>
                                    </h2>
                                }
                            </div>
                            <div className="mt-4">
                                <h2 className={`max-w-7xl text-lg lg:text-xl font-semibold  dark:text-neutral-200 font-sans`}>
                                    Cloud Flavors
                                </h2>
                                <ul className="flex flex-wrap  flex-row gap-2 p-2">
                                    {
                                        JSON.parse(data.flavors.toString())?.map((element: string, index: string) => {
                                            return <li key={index}><FlavorButton>{element}</FlavorButton></li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2 py-8 lg:py-6">
                                <motion.div
                                    whileTap={{ scale: 0.85 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <ActionButton onClick={handleLocalStorage} key={1} parentClassName="cursor-pointer hover:bg-neutral-900">
                                        <div className="flex  items-center gap-1 justify-center">
                                            Add In Bag
                                        </div>
                                    </ActionButton>
                                </motion.div>
                                <ActionButton parentClassName="cursor-pointer" onClick={() => { handleLocalStorage(); navigation.push('/contact-us') }} key={2}>
                                    <div className="flex items-center gap-1 justify-center">
                                        Order Now
                                        <RightArrow className="mt-1 group-hover:translate-x-1 transition-all ease-in-out duration-500" width="18" height="18" />
                                    </div>
                                </ActionButton>
                            </div>
                            <div className="flex md:hidden w-full flex-col xl:flex-row xl:justify-between xl:items-center gap-5">
                                <div className="mt-4 ">
                                    <h2 className={`max-w-7xl text-lg lg:text-xl font-semibold  text-neutral-200 font-sans`}>
                                        Vape Lowdown
                                    </h2>
                                    <ul className="p-2  min-w-xs text-sm">
                                        <li className="flex gap-4"><RightArrow /> {data.puffs} </li>
                                        {
                                            data.nicotineStrength !== "" &&
                                            <li className="flex gap-4"><RightArrow /> {data.nicotineStrength !== "" && data.nicotineStrength} Nicotine Strength.</li>
                                        }
                                        {
                                            data.eLiquidCapacity !== "" &&
                                            <li className="flex gap-4"><RightArrow /> {data.eLiquidCapacity} E-Liquid Capacity.</li>
                                        }
                                        {
                                            data.battery !== "" &&
                                            <li className="flex gap-4"><RightArrow /> {data.battery} Battery Life.</li>
                                        }
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h2 className={`max-w-7xl text-lg lg:text-xl font-semibold  dark:text-neutral-200 font-sans`}>
                                        Core Features 
                                    </h2>
                                    <ul className="flex flex-col  gap-2 p-2">
                                        {
                                            JSON.parse(data.features.toString())?.map((element: string, index: string) => {
                                                return <li key={index} className="flex text-sm gap-4"><Disk /> {element}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                :
                <div className="py-20 lg:py-10 px-6 lg:px-20">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-15 h-full">

                        <div>
                            <div className="w-full flex items-center bg-[#1F2121] rounded-lg p-6 justify-center h-fit relative">
                                <Skeleton className="w-[400px] h-[400px] rounded-lg" />
                            </div>

                            <div className="hidden md:flex w-full flex-col xl:flex-row xl:justify-between xl:items-center gap-5 mt-4">
                                <div>
                                    <Skeleton className="h-6  w-32 mb-2" />
                                    <ul className="p-2 space-y-2">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-4 w-44" />
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-36" />
                                    </ul>
                                </div>
                                <div>
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <ul className="p-2 space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-44" />
                                        <Skeleton className="h-4 w-40" />
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-2 mb-4">
                                <Skeleton className="h-5 w-16 rounded-sm" />
                                <Skeleton className="h-5 w-20 rounded-sm" />
                            </div>

                            <Skeleton className="h-10 w-3/4 mb-4" />

                            <div className="flex mt-4 gap-4">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                            </div>

                            <div className="mt-4">
                                <Skeleton className="h-6 w-32 mb-2" />
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 py-8 lg:py-6">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div className="flex md:hidden w-full flex-col xl:flex-row xl:justify-between xl:items-center gap-5">
                                <div>
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <ul className="p-2 space-y-2">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-4 w-44" />
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-36" />
                                    </ul>
                                </div>
                                <div>
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <ul className="p-2 space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-44" />
                                        <Skeleton className="h-4 w-40" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
        <TopSelling />
        <FeatureSectionGlowingStar />
        <AboutUs />
        <Toaster position="top-right" />
    </section>
}

const ActionButton = ({ children, parentClassName, onClick }: { onClick: () => void, children: React.ReactNode, parentClassName?: string }) => {
    return <div onClick={onClick} className={`${parentClassName} border relative group border-px border-neutral-800 rounded-sm flex items-center justify-center py-1`}>
        {children}
        <div className="absolute w-0 h-0 group-hover:w-3/4  transition-all ease-in-out duration-500 group-hover:h-[0.6px] bottom-0 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute w-0 h-0 group-hover:w-1/2  transition-all ease-in-out duration-500 group-hover:h-[0.8px] bottom-0 mx-auto bg-gradient-to-r from-transparent via-cyan-300 to-transparent"></div>
        <div className="absolute w-0 h-0 group-hover:w-1/4  transition-all ease-in-out duration-500 group-hover:h-[1px] bottom-0 mx-auto bg-gradient-to-r from-transparent via-cyan-600 to-transparent"></div>
    </div>
}

const Disk = () => {
    return <div className="w-4 md:w-6 border border-px flex items-center justify-center h-4 md:h-6 rounded-full relative z-[-1]">
        <motion.div
            initial={{ filter: `blur(5px)` }}
            animate={{ filter: 'blur(1px)', backgroundColor: ["#6366F1", "#EC4899", "#A855F7"] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 5, delay: 3, ease: easeInOut }} className="w-2 md:w-3 h-2 md:h-3 rounded-full relative z-[1] bg-neutral-700">

        </motion.div>
    </div>
}

const FlavorButton = ({ children }: { children: React.ReactNode }) => {
    return <button className="relative inline-flex h-fit overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 
        py-[4px] text-sm font-bold text-white backdrop-blur-3xl">
            {children}
        </span>
    </button>
}

const RightArrow = ({ width, height, className }: { width?: string, height?: string, className?: string }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={`${width ? width : "20"}`} height={`${height ? height : "20"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right`}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M15 16l4 -4" />
        <path d="M15 8l4 4" />
    </svg>
}