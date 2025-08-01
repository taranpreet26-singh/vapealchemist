import { AboutUs } from "@/components/AboutUs";
import { FeatureSectionGlowingStar } from "@/components/Features";
import Footer from "@/components/Footer";
import HomeBanner from "@/components/HomeBanner";
import LatestProduct from "@/components/LatestProducts";
import { LocationImages } from "@/components/LocationImage";
import { OurProductCardsCarouselDemo } from "@/components/OurProducts";
import TopSelling from "@/components/TopSelling";

export default function Home() {
  return ( 
      <section className="">
        <HomeBanner/>
        <OurProductCardsCarouselDemo/>
        <LatestProduct/>
        <TopSelling/>
        <LocationImages/>
        <FeatureSectionGlowingStar/>
        <AboutUs/>
        <Footer/>
      </section>
  );
}
