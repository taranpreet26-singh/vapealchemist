"use client"
import { GridPattern } from "@/components/ui/GridPattern";
import { LensCard } from "@/components/ui/LensCard";
import { Loader } from "@/components/ui/Loader";
import { objectVapesType } from "@/libs/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {

    const router = useParams()
    const [data, setData] = useState<objectVapesType>([])
    const [nameOfProduct, setNameOfProduct] = useState<string>("")
    const [isLoaded, setLoaded] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    async function fetch() {
        try {
            setLoaded(true)
            const response = await axios.get(`/api/user?category=${router.productId}`)
            if (response.status === 200) {
                setData(response.data.msg)
                setNameOfProduct(router.productId?.toString().charAt(0).toUpperCase() + router.productId?.toString().slice(1)!)
                setLoaded(false)
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const filterData = data.filter(val => val.name.toLowerCase().includes(search) || val.name.includes(search))
    return <section className="w-full pt-22 h-full flex flex-col  overflow-hidden">
        <div className="w-[90%] rounded-2xl mx-auto h-fit relative overflow-hidden z-[1] ">
            <div className="w-full h-full  rounded-2xl shadow-[inset_10px_10px_10px_10px_rgba(0,0,0,0.6)]  p-6 relative z-[10]">
                <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold   font-sans">
                    Search Product
                </h2>
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} name="seach" id="search" className="bg-zinc-800 px-2 w-3/4 lg:w-1/2 mx-5 mt-5 text-xl h-[2rem] rounded-lg text-white " />
                <GridPattern />
            </div>
        </div>

        <div className="w-full p-6 my-8 h-full">
            <h2 className="max-w-7xl pl-4 mx-auto mb-10 text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                {nameOfProduct}
            </h2>
            {
                !isLoaded ?
                    <div className="flex flex-col items-center md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-0 lg:p-10 ">
                        {
                            filterData.map((element, index) => {
                                return <LensCard key={index} data={element} />
                            })
                        }
                    </div>
                    :
                    <div className="w-full h-[20rem] p-10  flex items-center justify-center ">
                        <Loader text="Loading...." />
                    </div>
            }
        </div>
    </section>
}

