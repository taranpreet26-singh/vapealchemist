"use client"
import { NavbarResizable } from "@/components/NavbarResizable";
import { ThemeProvider } from "@/libs/theme-provider";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function BodyWrapper({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number>(0)

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCount(cart.length);
  };
  const router = useRouter()
  useEffect(() => {
    updateCartCount();
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);
  return <div className="w-full h-full">
      <ThemeProvider
        attribute={'class'}
        defaultTheme="dark"
        >
        <NavbarResizable />
        <main>
          {children}
        </main>
        <Footer />
        <div className="flex flex-wrap gap-6 items-center p-2 justify-center">
          <Link className="text-xs flex gap-2" href={'mailto:vapealchemist01@gmail.com'}><p className="text-white/60">Email</p><span className="text-indigo-500">vapealchemist01@gmail.com</span></Link>
          <Link className="text-xs flex gap-2" href={'tel:604-491-0935'}><p className="text-white/60">Phone-1</p><span className="text-indigo-500">604-491-0935</span></Link>
          <Link className="text-xs flex gap-2" href={'tel:778-869-0007'}><p className="text-white/60">Phone-2</p><span className="text-indigo-500">778-869-0007</span></Link>
        </div>
      </ThemeProvider>

      <div onClick={() => { router.push('/contact-us') }} className="fixed z-[100] bottom-4 right-4 block lg:hidden  border border-px border-zinc-800 bg-zinc-700 rounded-full p-[5px]">
        <CartButton />
        <div className="absolute top-0 mx-auto px-1 left-2 inset-x-0 bg-amber-50 w-fit h-fit text-black rounded-full text-[10px]">{count}</div>
      </div>
  </div>
}

const CartButton = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
}
