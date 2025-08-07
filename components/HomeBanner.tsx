"use client"
import {  useEffect, useRef } from "react"

export default function HomeBanner() {
    const ref = useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        const video = ref.current
        if(video){
            const playPromise = video.play()
            if(playPromise !== undefined){
                playPromise.then(()=>{

                }).catch(()=>{
                    console.log("erro")
                })
            }
        }
    },[])
    return <section className="w-full relative  h-full min-h-screen mb-20 flex items-center justify-center  overflow-hidden ">
        <div className="relative z-[3] w-full   h-fit bg-transparent">
            <h1 className="text-7xl pt-1  bg-clip-text bg-gradient-to-r from-purple-600 text-transparent via-white to-zinc-800 lg:text-9xl font-bold text-center  relative z-20">
                Zenvape Zone
            </h1>
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0  mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-0 lg:inset-x-60 bottom-0 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-60 bottom-0 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
        <div className="w-full h-full absolute  inset-0">
            <video ref={ref}
            autoPlay
            muted
            playsInline
            preload="auto"
            loop 
            controls={false}
            className="w-full h-full object-cover" src={`/video/smoke.mp4`}></video>
        </div>
    </section>
}