import React from "react"
import {motion} from "framer-motion"
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "./hover-gradeint-button";
export default function Button({children,type,className,onClick}:{onClick?:()=>void,children:React.ReactNode,type:string,className:string}){
    
    const buttonType = {
        "primary":"w-fit h-fit px-3 text-white py-1 text-sm rounded-lg bg-black border-zinc-800 border border-px",
        "secondary":"w-fit h-fit px-3 py-1 text-sm rounded-lg bg-white text-black border-zinc-800 border border-px"
    }
    
    return <button onClick={onClick} className={`${type === "primary"?buttonType.primary:buttonType.secondary} ${className}`}>
            {children}
    </button>
}

export const GradientHoverButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-3 text-white font-semibold rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 group"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <span className="relative z-10 flex items-center gap-2">
        Discover Now
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </motion.button>
  );
};

export  function HoverButton({children,className}:{children:React.ReactNode,className:string}){
    return <div className= {`${className} hover:bg-neutral-500  rounded-full px-2 py-1 transition-all ease-in-out duration-700`}>
        {children}
    </div>
}


export function ButtonBorder({children,className,onClick}:{onClick?:()=>void,children:React.ReactNode,className:string}){
    return <div onClick={onClick}  className= {` dark:bg-neutral-500  bg-black w-fit h-fit py-[1px]  rounded-full  transition-all ease-in-out duration-700`}>
        <div className={`${className} dark:bg-neutral-800 bg-black w-full h-full  rounded-full `}>
        {children}
        </div>
    </div>
}


export function BoxButton(){
  return <button className="px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
  Brutal
</button>
}


export function HoverGradientButton({onClick}:{onClick:()=>void}) {
  return (
    <div className="mt-5 flex justify-center text-center" onClick={onClick}>
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>Show More</span>

      </HoverBorderGradient>
    </div>
  );
}
