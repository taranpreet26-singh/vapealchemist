"use client";

import React from "react";
import { WobbleCard } from "./ui/wobble.card";
import Image from "next/image";

export function AboutUs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 py-20 lg:py-10 px-4 lg:px-20 gap-4  w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2  h-full bg-pink-800 min-h-[fit] md:min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs ">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Committed to Quality
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            At Vape Alchemist, we deliver premium vapes and accessories while building lasting connections. Your satisfaction is our foundation.
          </p>
        </div>
        <Image
          src="/images/accessories.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute hidden md:block -right-4 md:-right-[20%] lg:-right-[40%] grayscale filter md:-bottom-20 lg:-bottom-60 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Blending Flavor, Trust, and Value.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        We offer curated flavors to suit your taste, with fair pricing and transparent service premium quality without compromise.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[fit] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Your Experience, Our Priority
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Your experience is our priority with expert guidance, top-quality products, and unbeatable value.
          </p>
        </div>
        <Image
          src="/images/new-arrival.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute hidden md:block -right-10 md:-right-[20%] lg:-right-[20%] md:-bottom-30 lg:-bottom-40 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
