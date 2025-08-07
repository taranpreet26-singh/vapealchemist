"use client"
import { disposableVapes } from "@/actions/dummydata";
import { LensCard } from "./ui/LensCard";
import { HoverGradientButton } from "./ui/Button";
import { useState } from "react";

export default function TopSelling(){
    const [length,setLength] = useState<number>(3)
    const [onClickButton,setOnClickButton] = useState<boolean>(false)
    return <section className="w-full h-fit py-20 lg:py-10 px-8 lg:px-20">
        <h2 className="max-w-7xl mb-10 pl-4 mx-auto text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        New In
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
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