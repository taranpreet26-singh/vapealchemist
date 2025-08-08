import { AboutUs } from "@/components/AboutUs";
import { FeatureSectionGlowingStar } from "@/components/Features";
import Footer from "@/components/Footer";
import LatestProduct from "@/components/LatestProducts";
import TopSelling from "@/components/TopSelling";
import { ReactNode } from "react";

export default function ProductLayout( { children }:{children :ReactNode} ){
    return <section>
        <div>
            {children}
        </div>
        <FeatureSectionGlowingStar/>
        <LatestProduct/>
        <TopSelling/>
        <AboutUs/>
    </section>
}