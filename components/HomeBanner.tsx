"use client"
import { useEffect, useRef } from "react"

const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
};

export default function HomeBanner() {
    const videoParentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isSafari() && videoParentRef.current) {
            const player = videoParentRef.current.children[0] as HTMLVideoElement;
            if (player) {
                player.controls = false;
                player.playsInline = true;
                player.muted = true;
                player.setAttribute("muted", "");
                player.autoplay = true;
                setTimeout(() => {
                    const promise = player.play();
                    if (promise.then) {
                        promise
                            .then(() => { })
                            .catch(() => {
                            });
                    }
                }, 0);
            }
        }
    }, []);

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
        <div
            ref={videoParentRef}
            dangerouslySetInnerHTML={{
                __html: ` <video
            autoplay
            muted
            playsinline
            loop 
            preload="metadata"
            style="
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        ">
                <source src="/video/smoke.mp4" type="video/mp4" />
            </video>`}}
            className="w-full h-full absolute  inset-0">

        </div>
    </section>
}