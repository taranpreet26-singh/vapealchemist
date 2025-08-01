import { LensCard } from "./ui/LensCard";

export default function LatestProduct(){
    return <section className="w-full h-fit py-20 lg:py-10 px-8 lg:px-20">
        <h2 className="max-w-7xl pl-4 mx-auto mb-10 text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Latest Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          Array.from({length:6}).map((element,index)=>{
            return <LensCard key={index}/>
          })
        }
      </div>
    </section>
}