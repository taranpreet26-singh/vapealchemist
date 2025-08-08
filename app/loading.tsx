import { Loader } from "@/components/ui/Loader";

export default function Loading() {
    return <section className="w-full h-screen flex items-center justify-center" >
        <Loader text="Preparing your puffs....." />
    </section>
}