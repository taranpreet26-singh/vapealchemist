"use client"
import { Input, Label } from "@/components/ui/InputText";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { objectVapesTypeSingle } from "@/libs/types";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Loader } from "@/components/ui/Loader";
import GoogleMap from "@/components/Map";
import { useRouter } from "next/navigation";
import axios from "axios";

interface objectVapesTypeExtends extends objectVapesTypeSingle {
    count: number
}

export default function ContactUs() {
    const [data, setData] = useState<objectVapesTypeExtends[]>()
    const [isOpen, setOpen] = useState<number | null>(null)
    const PST = 20
    const GST = 6
    const getTotalAmount = () => {
        if (!data || data.length === 0) return 0;

        const subTotal = data.reduce((total, item) => {
            const priceAfterDiscount =
                Number(item.price) - Number(item.price) * (Number(item.discount) / 100);
            return total + priceAfterDiscount * item.count;
        }, 0);
        const afterPST = subTotal * (PST / 100)
        const afterGST = subTotal * (GST / 100)
        return subTotal + afterPST + afterGST
    };
    const total = getTotalAmount()
    useEffect(() => {
        if (total > 0 && total < 100) {
            const remaining = (100 - total).toFixed(2);
            toast.error(`Add $${remaining} more for home delivery!`);
        }
    }, [total]);
    function fetch() {
        try {
            const response = localStorage.getItem('cart')
            if (response) {
                setData(JSON.parse(response))
            } else {
                toast.error('No vapes here yet… even your clouds are looking confused.')
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        fetch()
    }, [])

    function handleDecrement(id: string) {
        try {
            if (data) {
                const updateArr = data.map(element =>
                    element.id === id ? { ...element, count: element.count - 1 } : element
                ).filter(item => item.count > 0)
                localStorage.setItem('cart', JSON.stringify(updateArr))
                setData(updateArr)
                window.dispatchEvent(new Event("cartUpdated"));

            }
        } catch (error) {
        }
    }
    function handleIncrement(id: string) {
        try {
            if (data) {
                const updatedArr = data.map(element =>
                    element.id === id ?
                        { ...element, count: element.count + 1 } : element
                )
                localStorage.setItem('cart', JSON.stringify(updatedArr))
                setData(updatedArr)
                window.dispatchEvent(new Event("cartUpdated"));
            }
        } catch (error) {
        }
    }
    const [formData, setFormData] = useState({ firstName: "", lastName: "", subject: "", email: "", houseAddress: "", content: "",phone:""})
    const ref = useRef<HTMLDivElement>(null)
    function handleSetFormData(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value}))
    }

    useEffect(()=>{

    },[formData])

    const [statusSubmission,setStatusSubmission] = useState<boolean>(false)

    async function submitEmail() {
        try {

            if (formData.firstName !== "" || formData.phone !== "" || formData.lastName !== "" || formData.subject !== "" || formData.email !== "" || formData.houseAddress !== "" || formData.content !== "") {
                if (total >= 0 && total <= 100 && localStorage.getItem('cart')) {
                    const remaining = (100 - total).toFixed(2);
                    toast.error(`Add $${remaining} more for home delivery!`);
                }
                else{
                    setStatusSubmission(true)
                    const response = await axios.post('/api/contact-us',{
                        formData:formData,
                        totalAmount:total,
                        localStorageString:localStorage.getItem('cart')
                    })
                    if(response.data.status){
                        toast.success(response.data.msg)
                    }else{
                        toast.error(response.data.msg)
                    }
                    setStatusSubmission(false)
                }
            }else{
                toast.error("Please ensure all form fields are filled out.")
            }

        } catch (error) {
        }finally{
            setStatusSubmission(false)
        }
    }

    function handlePhone(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        const onlyNumbers = /^[0-9]+$/;
        if(onlyNumbers.test(value)){
            setFormData(prev=>({...prev,phone:value.toString()}))
        }else if(!value){
            setFormData(prev=>({...prev,phone:""}))
        }else{
            toast.error('Please provide valid phone number')
        }
    }
    const router = useRouter()
    return <section className="w-full h-full py-20 mt-20 lg:py-10 px-4 lg:px-20">
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-2">
            <div className="w-full flex flex-col gap-8 h-full">
                <div ref={ref} className="p-4 h-3/4 scrollbar-hidden border border-px border-neutral-700 rounded-lg overflow-y-scroll w-full">
                    {data && data.length > 0 ?
                        data.map((element, index) => {
                            return <motion.div key={index}
                                onClick={()=>{router.push(`/products/product/${element.id}`)}}
                                animate={{ background: `radial-gradient(circle at center,#27272a,transparent 80%),radial-gradient(circle at left ,#27272a,transparent 80%),radial-gradient(circle at right,#27272a,transparent 80%)` }}
                                layout
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={`w-full cursor-pointer h-auto transition-all ease-in-out duration-500 mt-4 rounded-lg flex flex-col justify-center items-center p-1`}>
                                <div onClick={(e)=>e.stopPropagation()} className="flex items-center  h-fit w-full justify-between gap-3 " >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-black w-fit rounded-lg h-fit">
                                            <Image alt={`${element.name}-${index}`} src={element.img} width={50} height={50} />
                                        </div>
                                        <div className="flex flex-col justify-between  h-fit gap-1 pb-2 ">
                                            <h1 className="font-semibold text-sm font-sans">{element.name}</h1>
                                            <p className="font-medium text-xs font-sans text-white/80">${element.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex gap-1 items-center">
                                            <SubTract onClick={() => { handleDecrement(element.id) }} />
                                            <div className="w-fit h-fit bg-black px-1 rounded-lg">
                                                {element.count}
                                            </div>
                                            <Plus onClick={() => { handleIncrement(element.id) }} />
                                        </div>
                                        <div>
                                            {
                                                isOpen === index ?
                                                    <CircleMinus onClick={() => { setOpen(null) }} />
                                                    :
                                                    <CirclePlus onClick={() => { setOpen(index) }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {
                                        isOpen === index &&
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="w-full  h-fit px-4 py-2">
                                            <motion.div
                                                initial={{ opacity: 0, filter: `blur(8px)` }}
                                                animate={{ opacity: 1, filter: `blur(0px)` }}
                                                exit={{ opacity: 0, filter: `blur(8px)` }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                className="text-xs w-full h-fit flex items-center justify-between "
                                            >
                                                <div>
                                                    <p>Price: ${element.price}</p>
                                                    <p>Discount: {element.discount}%</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between gap-2"><p>Discount on per product: </p> <p>${(Number(element.price) * (Number(element.discount) / 100)).toString()}</p></div>
                                                    <div className="flex items-center justify-between gap-2"> <p>After Discount:</p> <p>${(Number(element.price) - Number(element.price) * (Number(element.discount) / 100)).toString()} </p></div>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, filter: `blur(8px)` }}
                                                animate={{ opacity: 1, filter: `blur(0px)` }}
                                                exit={{ opacity: 0, filter: `blur(8px)` }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                className="text-xs w-full h-fit mt-4 flex items-center justify-center "
                                            >
                                                <div className="font-semibold flex items-center justify-between gap-2">
                                                    <p>Total Amount: </p>
                                                    <p>$ {" "}
                                                        {(element.count * (Number(element.price) - Number(element.price) * (Number(element.discount) / 100)))}
                                                    </p>
                                                </div>

                                            </motion.div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </motion.div>
                        })
                        :
                        <div className="w-full h-full flex flex-col items-center justify-center ">
                            <Loader text="Oops, nothing in here. Even the vapor vanished!" />
                        </div>
                    }

                </div>

                <div className="w-full h-fit">
                    <Loader text={`Minimum order must be $100.00`} />
                    <div className="w-full h-px bg-zinc-700"></div>
                    <div className="flex text-xs items-center justify-between px-2 py-1">
                        <div className="flex items-center justify-between gap-2"><p className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">GST</p></div>
                        <div className="flex items-center justify-between gap-2"><p className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">6%</p></div>
                    </div>
                    <div className="flex text-xs items-center justify-between px-2 py-1">
                        <div className="flex items-center justify-between gap-2"><p className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">PST</p></div>
                        <div className="flex items-center justify-between gap-2"><p className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">20%</p></div>
                    </div>
                    <div className="w-full h-px bg-zinc-700"></div>

                    <div className="flex items-center justify-between p-2">
                        <h2 className={`max-w-7xl text-lg lg:text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-sans`}>
                            Total Amount :
                        </h2>
                        <h2 className={`max-w-7xl text-lg lg:text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-sans`}>
                            ${getTotalAmount().toFixed(2).toString()}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:px-8 dark:bg-black">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to Zenvape
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    We&rsquo;re here 24/7 — yes, even when the clouds are thick. Once you
                    <span className="font-bold text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text">
                        {" "}   Submit {" "}
                    </span>
                    your request, our team will get back to you shortly… or faster than you can blow your next vape ring.
                </p>

                <div className="my-8" >
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <LabelInputContainer>
                            <Label htmlFor="firstName">First name</Label>
                            <Input onChange={handleSetFormData} value={formData.firstName} id="firstName" placeholder="Tyler" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input onChange={handleSetFormData} value={formData.lastName} id="lastName" placeholder="Durden" type="text" />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" onChange={handleSetFormData} value={formData.email} placeholder="projectmayhem@fc.com" type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="phone">Phone No</Label>
                        <Input id="phone" onChange={handlePhone} value={formData.phone} placeholder="+1NPANXXXXXX" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="houseAddress">House/Flat Address</Label>
                        <Input id="houseAddress" onChange={handleSetFormData} value={formData.houseAddress} placeholder="1234 West 8th Avenue" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" onChange={handleSetFormData} value={formData.subject} placeholder="Subject to Puff &ndash; No Smoke, Just Fire" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="content">Message</Label>
                        <Input
                            onChange={handleSetFormData}
                            value={formData.content}
                            id="content"
                            placeholder=""
                            type="text"
                        />
                    </LabelInputContainer>
                    {
                        statusSubmission?
                        <button
                        disabled
                        className="group/btn cursor-not-allowed relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    >
                        <Loader text="Loading....."/>
                        <BottomGradient />
                    </button>:
                    <button
                    onClick={submitEmail}
                    className="group/btn cursor-pointer relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    >
                        Submit &rarr;
                        <BottomGradient />
                    </button>
                    }
                </div>
            </div>
        </div>

        <div className="w-full h-full py-10 lg:py-20">
            <GoogleMap />
        </div>
        <Toaster position="top-right" />
    </section>
}


const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const CirclePlus = ({ onClick }: { onClick: () => void }) => {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
}

const CircleMinus = ({ onClick }: { onClick: () => void }) => {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
}

const SubTract = ({ className, onClick }: { className?: string, onClick?: () => void }) => {
    return <motion.svg
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-minus`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></motion.svg>
}
const Plus = ({ className, onClick }: { className?: string, onClick?: () => void }) => {
    return <motion.svg
        whileTap={{ scale: 0.85 }}
        animate={{scale:1}}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-plus`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></motion.svg>
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};


