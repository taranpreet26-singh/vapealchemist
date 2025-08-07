"use client";

import React from "react";
import { Card, Carousel } from "./ui/cards-carousel";
import Image from "next/image";

export function OurProductCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our Products.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ title, image }: { title: string; category: string; image: string }) => {
  let description = "";

  switch (title) {
    case "Fresh Drops":
    case "":
      description =
        "Discover the latest and greatest drops in our collection. These just landed, and they're already turning heads. Be the first to flex.";
      break;
    case "Puff & Go":
    case "Puff & Go":
      description =
        "No strings attached — grab and go with our sleek disposable vapes. Smooth puffs, bold flavors, and zero fuss.";
      break;
    case "Drip Central":
    case "Drip Central":
      description =
        "Get juicy with our E-Juice zone — fruity, minty, or dessert-inspired, we’ve got a flavor for every mood and moment.";
      break;
    case "Vape Arsenal":
    case "Vape Arsenal":
      description =
        "Power up your puff with cutting-edge devices. From minimal pods to max-performance mods, your perfect setup awaits.";
      break;
    case "Plug & Play":
    case "":
      description =
        "Complete your vibe with the essential accessories. Fast chargers, pods, cases — all the gear to elevate your vape game.";
      break;
    default:
      description = "Experience the best of modern vaping with top-tier products tailored to your style.";
  }

  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {title || "Explore the Collection"}
          </span>{" "}
          — {description}
        </p>
        <Image
          src={image}
          alt={title}
          height={500}
          width={500}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    </>
  );
};

const data = [
  {
    category: "",
    title: "",
    src: "/images/new-arrival.png",
    content: <DummyContent image="/images/first.png" title="Fresh Drops" category="Fresh Drops" />,
  },
  {
    category: "Disponsals Zone",
    title: "Puff & Go",
    src: "/images/disposals.png",
    content: <DummyContent image="/images/seventh.png" title="Puff & Go" category="" />,
  },
  {
    category: "E-Juice Zone",
    title: "Drip Central",
    src: "/images/e-juice.png",
    content: <DummyContent image="/images/fourth.png" title="Drip Central" category="" />,
  },
  {
    category: "Devices Zone",
    title: "Vape Arsenal",
    src: "/images/devices.png",
    content: <DummyContent image="/images/third.png" title="Vape Arsenal" category="" />,
  },

  {
    category: "",
    title: "",
    src: "/images/accessories.png",
    content: <DummyContent image="/images/fifth.png" title="Vape Arsenal" category="" />,
  },


];

