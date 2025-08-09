"use client";
import React from "react";
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from "./ui/glowing-card";


export function FeatureSectionGlowingStar() {
    return (
        <section className="w-full h-fit py-20 lg:py-10 px-8 lg:px-20">
            <h2 className="max-w-7xl pl-4 mx-auto mb-10 text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                What Makes Us Different
            </h2>
            <div className=" py-10 flex flex-wrap items-center justify-center md:grid md:grid-cols-2  gap-5 lg:grid-cols-3 antialiased">
                <GlowingStarsBackgroundCard>
                    <GlowingStarsTitle>Customer First</GlowingStarsTitle>
                    <div className="flex justify-between items-end">
                        <GlowingStarsDescription>
                            Your experience comes first with friendly support and a focus on your satisfaction.                        </GlowingStarsDescription>
                        <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                            <Icon />
                        </div>
                    </div>
                </GlowingStarsBackgroundCard>
                <GlowingStarsBackgroundCard>
                    <GlowingStarsTitle>Premium Quality</GlowingStarsTitle>
                    <div className="flex justify-between items-end">
                        <GlowingStarsDescription>
                            Only top-tier, lab-tested vape products—safe, consistent, and satisfying.
                        </GlowingStarsDescription>
                        <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                            <Icon />
                        </div>
                    </div>
                </GlowingStarsBackgroundCard>
                <GlowingStarsBackgroundCard>
                    <GlowingStarsTitle>Explore | Enjoy | Elevate</GlowingStarsTitle>
                    <div className="flex justify-between items-end">
                        <GlowingStarsDescription>
                            Discover premium vapes, enjoy bold flavors, and elevate every puff.
                        </GlowingStarsDescription>
                        <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                            <Icon />
                        </div>
                    </div>
                </GlowingStarsBackgroundCard>
            </div>
        </section>
    );
}

const Icon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-white stroke-2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
        </svg>
    );
};
