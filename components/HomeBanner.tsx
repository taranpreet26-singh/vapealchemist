"use client"
import { useEffect, useRef, useState } from "react"
import { Loader } from "./ui/Loader";

const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
};

export default function HomeBanner() {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const handleUserInteraction = () => {
            const video = videoRef.current
            if (video) {
                video.play().catch(err => {
                })
            }
            window.removeEventListener("click", handleUserInteraction);
            window.removeEventListener("touchstart", handleUserInteraction);
            window.removeEventListener("keydown", handleUserInteraction);
        }
        window.addEventListener("click", handleUserInteraction);
        window.addEventListener("touchstart", handleUserInteraction);
        window.addEventListener("keydown", handleUserInteraction);
        videoRef.current?.play()
       
        return () => {
            window.removeEventListener("click", handleUserInteraction);
            window.removeEventListener("touchstart", handleUserInteraction);
            window.removeEventListener("keydown", handleUserInteraction);
        };
    }, [])
    return <section className="w-full relative  h-full min-h-screen mb-20 flex flex-col items-center justify-center  overflow-hidden ">
        <div className="relative z-[3] w-full  pb-2 h-fit bg-transparent">
            <h1 className="text-7xl py-1  bg-clip-text bg-gradient-to-r from-purple-600 text-transparent via-white to-zinc-800 lg:text-9xl font-bold text-center  relative z-20">
                Vape Alchemist
            </h1>
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0  mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-20 bottom-0 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-0 lg:inset-x-60 bottom-0 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-0 lg:inset-x-60 bottom-0 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
        <h1 className="text-xs md:text-sm  pt-1 px-4 md:px-6 lg:px-8 bg-clip-text bg-gradient-to-r from-neutral-400 text-transparent via-white to-zinc-800  font-bold text-center  relative z-20">
                Where bold flavors meet smooth clouds. Explore disposables, juices, pods, and accessories that turn every puff into pure magic.
        </h1>
        <div
            className="w-full h-full absolute  inset-0">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                id="player"
                className="w-full h-full absolute inset-0 object-cover z-0"
            >
                <source src="/video/smoke.mp4" type="video/mp4" />
            </video>
        </div>
    </section>
}