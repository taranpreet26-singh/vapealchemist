import { LensCard } from "./ui/LensCard";

export default function TopSelling(){
    return <section className="w-full h-fit py-20 lg:py-10 px-8 lg:px-20">
        <h2 className="max-w-7xl mb-10 pl-4 mx-auto text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        New In
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          Array.from({length:6}).map((element,index)=>{
            return <LensCard key={index}/>
          })
        }
      </div>
    </section>
}