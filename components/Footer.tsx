import { NavbarLogo } from "./ui/Navbar";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function Footer() {
    const navItems = ["Pricing", "Blog", "Contact"];
    const policies = ['Privancy Policy', 'Terms of Service']
    const socialMedia = ['Twitter', 'LinkedIn', 'GitHub']
    return <footer className="border-t-[1px] relative  border-neutral-700 w-full h-1/2 lg:h-full px-4 lg:px-20 py-20">
        <div className="w-full h-fit flex flex-col lg:flex-row gap-6 lg:gap-40">
            <div className="flex items-start w-full  mb-4 lg:mb-0 lg:items-center gap-2">
                <NavbarLogo/>
            </div>
            <div className="grid grid-cols-3 justify-end  w-full lg:w-1/2  ">
                <div className="w-full h-full">
                    {
                        navItems.map((element, index) => {
                            return <li key={index} className="text-sm mt-2 list-none text-neutral-400 hover:text-neutral-600 transition-all duration-700 ease-in-out">
                                {element}
                            </li>
                        })
                    }
                </div>
                <div className="w-full flex flex-col items-center h-full">
                    {
                        policies.map((element, index) => {
                            return <li key={index} className="text-sm mt-2 list-none text-neutral-400 hover:text-neutral-600 transition-all duration-700 ease-in-out">
                                {element}
                            </li>
                        })
                    }
                </div>
                <div className="w-full flex flex-col items-end h-full">
                    {
                        socialMedia.map((element, index) => {
                            return <li key={index} className="text-sm mt-2 list-none text-neutral-400 hover:text-neutral-600 transition-all duration-700 ease-in-out">
                                {element}
                            </li>
                        })
                    }
                </div>
            </div>
        </div>
        <TextHoverEffect text="ZENVAPE ZONE" />
    </footer>
}