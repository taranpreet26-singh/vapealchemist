"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NavbarResizable() {
  const navItems = [
    {
      name: "All Product",
      link: "/products/all",
    },
    {
      name: "Disposables",
      link: "/products/disposables",
    },
    {
      name: "E-juices",
      link: "/products/ejuices",
    },
    {
      name: "Devices",
      link: "/products/devices",
    },
    {
      name: "Accessories",
      link: "/products/accessories",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  const router = useRouter()
  const [count, setCount] = useState<number>(0)
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCount(cart.length);
  };

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center ">
            <NavbarButton onClick={() => { router.push('/contact-us') }} variant="secondary">
              <div className="relative  border border-px border-zinc-800 bg-zinc-700 rounded-full p-[5px]">
                <CartButton />
                <div className="absolute top-0 mx-auto px-1 left-2 inset-x-0 bg-amber-50 w-fit h-fit text-black rounded-full text-[10px]">{count}</div>
              </div>
            </NavbarButton>
            <NavbarButton variant="gradient" onClick={() => { router.push('/contact-us') }}>Book a call</NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton> */}
              <NavbarButton
                onClick={() => { setIsMobileMenuOpen(false); router.push('/contact-us') }}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

    </div>
  );
}


const CartButton = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
}
