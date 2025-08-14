"use client"
import { disposableVapes } from "@/actions/dummydata";
import { LensCard } from "./ui/LensCard";
import { useEffect, useState } from "react";
import { HoverGradientButton } from "./ui/Button";
import axios from "axios";
import {  objectVapesType } from "@/libs/types";
import { SkeletonCard } from "./ui/CardSkeleton";



export default function TopSelling() {
  const [length, setLength] = useState<number>(3)
  const [onClickButton, setOnClickButton] = useState<boolean>(false)
  const [data, setData] = useState<objectVapesType>([])
  const [loading,setLoading] = useState<boolean>(false)

  async function fetch() {
    try {
      const resposne = await axios.get('/api/latestproduct?status=Old')
      console.log(resposne)
      setData(resposne.data.msg)
      setLoading(true)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  return <section className="w-full h-fit py-20 lg:py-10 px-4 lg:px-20">
    <h2 className="max-w-7xl  mb-10 text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
      Keep shopping for
    </h2>
    <div className="md:grid flex flex-wrap flex-col items-center justify-center md:grid-cols-2 lg:grid-cols-3 ">
     { loading ?
             data.map((element, index) => {
               if (index < length)
                 return <LensCard key={index} data={element} />
             }):
             Array.from({length:3}).map((_,index)=>{
               return <SkeletonCard key={index}/>
             })
           }
    </div>
    {
      !onClickButton && data.length > 3 &&
      <HoverGradientButton onClick={() => { setLength(disposableVapes.length); setOnClickButton(true); }} />
    }
  </section>
}