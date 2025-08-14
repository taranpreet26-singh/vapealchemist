import Link from "next/link";
import { NavbarLogo } from "./ui/Navbar";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function Footer() {
    const navItems = [
        {name:"All Product",href:"/products/all"},
        {name:"Disposables",href:"/products/disposables"},
        {name:"E-Juice",href:"/products/ejuices"},
        {name:"Devices",href:"/products/devices"},
        {name:"Accessories",href:"/products/accessories"},
    ];
    const policies = [{name:"Contact-us",href:"/contact-us"},{name:"Email",href:"mailto:vapealchemist01@gmail.com"},{name:"Phone",href:"tel:604-491-0935"}]
    const socialMedia = [{name:'Instagram',href:"https://www.instagram.com/vape.alchemist/"}]
    return <footer className="border-y-[1px] relative  border-neutral-700 w-full h-1/2 lg:h-full px-4 lg:px-20 py-10"> 
        <div className="w-full h-fit flex flex-col lg:flex-row gap-6 lg:gap-40">
            <div className="flex items-start flex-col w-full  mb-4 lg:mb-0  gap-2">
                <NavbarLogo/>
            </div>
            <div className="grid grid-cols-3 justify-end  w-full lg:w-1/2">
                <div className="w-full flex flex-col h-full">
                    {
                        navItems.map((element, index) => {
                            return <Link href={element.href} key={index} className="text-sm mt-2 list-none text-neutral-400 hover:text-neutral-600 transition-all duration-700 ease-in-out">
                                {element.name}
                            </Link>
                        })
                    }
                </div>
                <div className="w-full flex flex-col items-center lg:items-start h-full">
                    {
                        policies.map((element, index) => {
                            return <Link href={element.href} key={index} className="text-sm mt-2 list-none text-neutral-400 hover:text-neutral-600 transition-all duration-700 ease-in-out">
                                {element.name}
                            </Link>
                        })
                    }
                </div>
                <div className="w-full flex flex-col items-end lg:items-start h-full">
                    {
                        socialMedia.map((element, index) => {
                            return <Link href={element.href} key={index} className="text-sm mt-2 list-none text-neutral-400 hover:text-neutral-600 transition-all duration-700 ease-in-out">
                                {element.name}
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
        <TextHoverEffect text="Vape Alchemist" />
    </footer>
}