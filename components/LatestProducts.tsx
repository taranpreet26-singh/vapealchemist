"use client"
import { disposableVapes } from "@/actions/dummydata";
import { LensCard } from "./ui/LensCard";
import { useState } from "react";
import { HoverGradientButton } from "./ui/Button";

export default function LatestProduct(){
    const [length,setLength] = useState<number>(3)
    const [onClickButton,setOnClickButton] = useState<boolean>(false)
    return <section className="w-full h-fit py-20 lg:py-10 px-8 lg:px-20">
        <h2 className="max-w-7xl  mb-10 text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Latest Products
      </h2>
      <div className="md:grid flex flex-wrap flex-col items-center justify-center md:grid-cols-2 lg:grid-cols-3 ">
        {
          disposableVapes.map((element,index)=>{
            if(index < length)
            return <LensCard key={index} data={element}/>
          })
        }
      </div>
      {
        !onClickButton &&
        <HoverGradientButton onClick={()=>{setLength(disposableVapes.length); setOnClickButton(true);}}/>
      }
    </section>
}