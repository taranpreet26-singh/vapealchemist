"use client"
import { ButtonBorder } from "@/components/ui/Button";
import { Pencil, Trash, Upload } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { GridPattern } from "@/components/ui/GridPattern";
import { LensCard } from "@/components/ui/LensCard";
import { Category, objectVapesType } from "@/libs/types";

enum ProductStatus {
  Latest = "Latest",
  Old = "Old"
}




export default function UploadComponent() {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [update, setUpdate] = useState<boolean>(false)
    const [fileUpdate, setFileUpdate] = useState<string | null>(null)
    const [name, setName] = useState<string>("")
    const [shortInfo, setShortInfo] = useState<string>("")
    const [puff, setPuff] = useState<string>("")
    const [nicotineStrength, setNicotineStrength] = useState<string>("")
    const [eLiquidCapacity, setEliquidCapacity] = useState<string>("")
    const [battery, setBattery] = useState<string>("")
    const [loading, setLoading] = useState<string | null>(null)
    const [allComponent, setAllComponent] = useState<objectVapesType | null>(null)
    const [features, setFeatures] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState<string>("");
    const [flavorArr, setFlavorArr] = useState<string[]>([])
    const [price,setPrice] = useState<number | string>("")
    const [discount,setDiscount] = useState<number | string>("")
    const [flavor, setFlavor] = useState<string>("")
    const fileRef = useRef<HTMLInputElement>(null)
    const [status,setStatus] = useState<ProductStatus>()
    const [category,setCategory] = useState<Category>()
    const [file, setFile] = useState<File | null>(null)
    const onFileClick = () => {
        fileRef.current?.click()
        setUpdate(false)
    }
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const img = new window.Image();
        const objectUrl = URL.createObjectURL(file);

        img.src = objectUrl;

        img.onload = () => {
            const width = img.width;
            const height = img.height;

            const requiredWidth = 470;
            const requiredHeight = 480;

            if (width === requiredWidth && height === requiredHeight) {
                setFile(file);
            } else {
                toast.error(`Image must be exactly ${requiredWidth}x${requiredHeight}px`);
            }

            URL.revokeObjectURL(objectUrl);
        };

        img.onerror = () => {
            toast.error("Invalid image file.");
            URL.revokeObjectURL(objectUrl);
        };
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/*": []
        }
    });
   

    async function fetchAllComponent() {
        try {
            const response = await axios.get("/api/admin/uploads")
            setAllComponent(response.data.msg)
        } catch (error) {
        }
    }


    useEffect(() => {
        fetchAllComponent()
    }, [refresh,loading])


    async function uploadComponent() {
        try {
            setLoading("Loading....")
            if ((file || fileUpdate) && name != "" && price !== 0 && price !== "" && discount !== ""  && status && category  && shortInfo != "" && puff != ""  && features.length > 0 && flavorArr.length > 0) {
                const formData = new FormData()
                alert("Process is begin")
                if (update && fileUpdate) {
                    formData.append("stringFile", fileUpdate)
                } else if (!update && file) {
                    formData.append("file", file)
                }
                formData.append("name", name)
                formData.append("price", price.toString())
                formData.append("discount", discount.toString())
                formData.append("shortInfo", shortInfo)
                formData.append("status",status.toString())
                formData.append("category",category.toString())
                formData.append("puff", puff)
                formData.append("nicotineStrength", nicotineStrength)
                formData.append("eLiquidCapacity", eLiquidCapacity)
                formData.append("battery", battery)
                formData.append("features", JSON.stringify(features))
                formData.append("flavors", JSON.stringify(flavorArr))
                const response = await axios.post('/api/admin/uploads', formData)
                toast.success(response.data.msg)
                setRefresh(true)
            } else {
                toast.error("Please fill all the fields")
            }
        } catch (error) {
            toast.error("Some Error Occur")
        } finally {
            setLoading(null)
            setRefresh(true)
        }
    }

    useEffect(()=>{

    },[refresh])

    async function deleteComponent(currentName:string) {
        try {
            setRefresh(false)
            if (currentName) {
                const response = await axios.delete('/api/admin/uploads', {
                    data: { currentName }
                })
                if (response.status) {
                    toast.success(response.data.msg)
                } else {
                    toast.error(response.data.msg)
                }
            }
            setRefresh(true)
        } catch (error) {
            toast.error("Error")
        } finally {
            setRefresh(true)
        }
    }

    const addFeature = () => {
        if (featureInput.trim() !== "") {
            setFeatures((prev) => [...prev, featureInput.trim()]);
            setFeatureInput("");
        }
    };
    function addFlavor() {
        if (flavor.trim() !== "") {
            setFlavorArr(prev => [...prev, flavor.trim()])
            setFlavor("")
        }
    }

    const removeFeature = (index: number) => {
        setFeatures((prev) => prev.filter((_, i) => i !== index));
    };
    const removeFlavor = (index: number) => {
        setFlavorArr((prev) => prev.filter((_, i) => i !== index));
    };

    function handleStatus(e:ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value
        if(value != ""){
            setStatus(value as ProductStatus)
        }else{
            toast.error('Please provide the status')
        }
    }
    function handleCategory(e:ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value
        if(value != ""){
            setCategory(e.target.value as Category)
        }else{
            toast.error('Please provide the Category')
        }
    }

    function handlePrice(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        const onlyNumbers = /^[0-9]+$/;
        if(onlyNumbers.test(value)){
            setPrice(Number(value))
        }else if(!value){
            setPrice("")
        }else{
            toast.error('Please Enter only number in price')
        }
    }
    function handleDiscount(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        const onlyNumbers = /^[0-9]+$/;
        if(onlyNumbers.test(value)){
            setDiscount(Number(value))
        }else if(!value){
            setDiscount("")
        }
        else{
            toast.error('Please Enter only number in discount')
        }
    }
    return <section className="px-4 mt-8   max-w-full h-fit overflow-hidden">
        <div className="w-full py-20 rounded-2xl relative z-[10] flex  justify-center h-full ">
            <div className="w-full h-full rounded-lg border-[1px] flex flex-col items-center p-4 lg:p-8 bg-black/50 backdrop-blur-xs border-neutral-800">
                <h1 className="text-xl font-bold text-white">Add / Update Product</h1>
                {file?.name}
                <div className="flex flex-col lg:flex-row  gap-4 w-full h-full ">
                    <div {...getRootProps()} onClick={onFileClick} className="w-full group  rounded-lg flex items-center justify-center relative overflow-hidden  mt-6 p-4 flex-col gap-2  max-h-[40rem] min-h-[18em]">
                        <label htmlFor="file" className="text-lg mb-10 font-semibold ">Upload Image</label>
                        {
                            file ? "" : <p className="text-xs text-white/70">
                                {isDragActive
                                    ? "Drop the files here ..."
                                    : "Drag and drop files here, or click to select"}
                            </p>
                        }
                        {
                            update && <div className="w-3/4 h-fit flex">
                                <div className="w-full h-fit rounded-sm overflow-hidden flex items-center justify-center ">
                                    <Image width={150} height={150} alt={fileUpdate!} className="w-3/4 h-3/4 object-contain" src={fileUpdate!} />
                                </div>
                            </div>
                        }
                        {
                            !update &&
                            <div className="h-full  w-full flex items-center justify-center ">
                                {
                                    file ?
                                        <div className="w-3/4 h-fit flex">
                                            <div className="w-full h-fit rounded-sm overflow-hidden flex items-center justify-center">
                                                <Image width={150} height={50} alt={file.name} className="w-3/4 h-3/4 object-contain" src={URL.createObjectURL(file)} />
                                            </div>
                                        </div>
                                        :
                                        <div className="w-1/2  relative h-[5rem] lg:h-3/4">
                                            <div className=" absolute inset-0  border-dashed border-[0.5px] border-zinc-700  rounded-lg">
                                            </div>
                                            <div className="absolute flex items-center justify-center w-full h-full left-4 top-4 transition-all ease-in-out duration-500 group-hover:inset-0  bg-zinc-800/70 drop-shadow-2xl p-[1px]  rounded-lg">
                                                <Upload size={14} />
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                        <input {...getInputProps()} type="file" name="file" id="file" ref={fileRef} className="" />
                        <GridPattern />
                    </div>
                    <div className="w-full  h-full">
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="name" className="text-lg font-semibold ">Name</label>
                            {
                                update?
                                    <input type="text" name="name" id="name" value={name} disabled onChange={(e) => { setName(e.target.value) }} className="border-[0.5px] p-1 cursor-not-allowed  border-neutral-800 rounded-sm bg-transparent text-white" />
                                    :
                                    <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} className="border-[0.5px] p-1  border-neutral-800 rounded-sm bg-transparent text-white" />
                            }
                        </div>
                        <div className="flex gap-4">
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="price" className="text-lg font-semibold ">Price</label>
                            <input name="price" type="text" value={price.toString()} onChange={handlePrice} id="shortInfo " className="border-[0.5px] p-1 border-neutral-800 rounded-sm bg-transparent text-white" />
                        </div>
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="discount" className="text-lg font-semibold ">Discount</label>
                            <input name="discount" type="text" value={discount} onChange={handleDiscount} id="shortInfo " className="border-[0.5px] p-1 border-neutral-800 rounded-sm bg-transparent text-white" />
                        </div>
                        </div>
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="status" className="text-lg font-semibold ">Category</label>
                            <select name="category" id="category" onChange={handleCategory} value={category}  className="border-[0.5px] p-1 bg-black  border-neutral-800 rounded-sm  text-white">
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={""}>Select</option>
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={Category.Accessories}>Accessories</option>
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={Category.Devices}>Devices</option>
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={Category.Disposables}>Disposables</option>
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={Category.Ejuices}>E-Juices</option>
                            </select>
                        </div>
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="shortInfo" className="text-lg font-semibold ">Short Info</label>
                            <input name="shortInfo" value={shortInfo} onChange={(e) => { setShortInfo(e.target.value) }} id="shortInfo " className="border-[0.5px] p-1 border-neutral-800 rounded-sm bg-transparent text-white" />
                        </div>
                    <div className="flex gap-4">
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="puff" className="text-lg font-semibold ">Puff/Other Info</label>
                            <input type="text" name="puff" id="puff" value={puff} onChange={(e) => { setPuff(e.target.value) }} className="border-[0.5px] p-1  border-neutral-800 rounded-sm bg-transparent text-white" />
                        </div>
                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                            <label htmlFor="status" className="text-lg font-semibold ">Status</label>
                            <select name="status" id="status" onChange={handleStatus} value={status}  className="border-[0.5px] p-1 bg-black  border-neutral-800 rounded-sm  text-white">
                                
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={""}>Select</option>
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={ProductStatus.Latest}>Latest</option>
                                <option className="border-[0.5px] p-1   border-neutral-800 rounded-sm bg-transparent text-white" value={ProductStatus.Old}>Old</option>
                            </select>
                        </div>
                    </div>
                        <div className="flex gap-4">
                            <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                                <label htmlFor="nicotineStrength" className="text-lg font-semibold ">NicotineStrength</label>
                              
                                        <input type="text" name="nicotineStrength" id="nicotineStrength" value={nicotineStrength} onChange={(e) => { setNicotineStrength(e.target.value) }} className="border-[0.5px] p-1  border-neutral-800 rounded-sm bg-transparent text-white" />
                            </div>
                            <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                                <label htmlFor="eLiquidCapacity" className="text-lg font-semibold ">EliquidCapacity</label>
                                    <input type="text" name="eLiquidCapacity" id="eLiquidCapacity" value={eLiquidCapacity} onChange={(e) => { setEliquidCapacity(e.target.value) }} className="border-[0.5px] p-1  border-neutral-800 rounded-sm bg-transparent text-white" />
                            </div>
                            <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                                <label htmlFor="battery" className="text-lg font-semibold ">Battery</label>
                                    <input type="text" name="battery" id="battery" value={battery} onChange={(e) => { setBattery(e.target.value) }} className="border-[0.5px] p-1  border-neutral-800 rounded-sm bg-transparent text-white" />
                            </div>
                        </div>

                        <div className="w-full mt-6 flex flex-col gap-2 h-fit">
                        </div>
                        <div>
                            <label htmlFor="features" className="text-lg font-semibold">Features</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="features"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addFeature();
                                        }
                                    }}
                                    className="border-[0.5px] p-1 border-neutral-800 rounded-sm bg-transparent text-white w-full"
                                    placeholder="Add a feature and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="text-white bg-neutral-700 px-2 rounded"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {features.map((f, index) => (
                                    <span
                                        key={index}
                                        className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                    >
                                        {f}
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="text-red-400 font-bold"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="flavors" className="text-lg font-semibold">Flavors</label>
                            <div className="flex gap-2">
                                <input type="text" name="flavor" id="flavor" value={flavor} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addFlavor();
                                    }
                                }} className="border-[0.5px] p-1 border-neutral-800 rounded-sm bg-transparent text-white w-full"
                                    placeholder="Add a flavor and press Enter" onChange={(e) => { setFlavor(e.target.value) }} />
                                <button
                                    type="button"
                                    onClick={addFlavor}
                                    className="text-white bg-neutral-700 px-2 rounded"
                                >
                                    Add
                                </button>

                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {flavorArr.map((f, index) => (
                                    <span
                                        key={index}
                                        className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                    >
                                        {f}
                                        <button
                                            type="button"
                                            onClick={() => removeFlavor(index)}
                                            className="text-red-400 font-bold"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    file &&
                    <div className="w-fit  rounded-b-sm h-fit flex gap-4  lg:flex-row flex-col text-white p-2 text-xs">
                        <span className="bg-zinc-900 w-fit rounded-full p-1 text-sm flex items-center justify-between font-semibold">Name  {" "}<span className="bg-zinc-700 text-xs p-1 font-medium ml-1 rounded-full"> {file.name}</span></span>
                        <span className="bg-zinc-900 w-fit rounded-full p-1 flex items-center justify-between text-sm font-semibold">Size {" "} <span className="bg-zinc-700 p-1 text-xs font-medium ml-1 rounded-full"> {(file.size / (1024 * 1024)).toFixed(2)}MB</span></span>
                        <span className="bg-zinc-900 w-fit rounded-full p-1 flex items-center justify-between text-sm font-semibold">Type {" "} <span className="bg-zinc-700 p-1 text-xs font-medium ml-1 rounded-full"> {file.type}</span></span>
                    </div>
                }
                <div className="mt-8 w-full h-fit flex items-center cursor-pointer justify-center hover:-translate-y-0.5 transition-all duration-1000 ease-in-out">
                    {
                        loading === null ? <ButtonBorder onClick={() => { uploadComponent() }} className={`px-4 py-1  text-lg font-semibold`}>
                            Upload
                        </ButtonBorder> :
                            <ButtonBorder className={`px-4 py-1 cursor-not-allowed text-lg font-semibold`}>
                                {loading}
                            </ButtonBorder>
                    }
                </div>
            </div>
        </div>
        <div className="mt-10 py-20 lg:p-10">
            <h1 className="text-3xl font-bold">All Component</h1>

            {
                !allComponent ? <motion.div className="w-full h-full flex items-center justify-center">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-tabler-loader animate-spin"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 6l0 -3" />
                        <path d="M16.25 7.75l2.15 -2.15" />
                        <path d="M18 12l3 0" />
                        <path d="M16.25 16.25l2.15 2.15" />
                        <path d="M12 18l0 3" />
                        <path d="M7.75 16.25l-2.15 2.15" />
                        <path d="M6 12l-3 0" />
                        <path d="M7.75 7.75l-2.15 -2.15" />
                    </motion.svg>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                        className="text-lg font-medium tracking-wide"
                    >
                        Loading, please wait...
                    </motion.p>
                </motion.div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:p-5 lg:grid-cols-3 gap-4 lg:gap-10">
                    {
                        allComponent?.map((element, index) => {
                            return <div className="w-full h-full" key={index}>
                                <div className="flex gap-2 justify-end px-6 w-full">
                                    <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" });  setUpdate(true); setCategory(element.category); setPrice(element.price); setDiscount(element.discount); setName(element.name); setStatus(element.status as ProductStatus); setShortInfo(element.shortInfo); setFileUpdate(element.img) ; setPuff(element.puffs); setEliquidCapacity(element.eLiquidCapacity); setNicotineStrength(element.nicotineStrength); setBattery(element.battery); setFeatures(JSON.parse(element.features.toString())); setFlavorArr(JSON.parse(element.flavors.toString())) }} className="relative group border border-px border-neutral-700 rounded-full p-1">
                                        <Pencil size={20} className="cursor-pointer" />
                                        <motion.span
                                            className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-black rounded">
                                            Update
                                        </motion.span>
                                    </div>
                                    <div onClick={()=>{deleteComponent(element.name) }} className="relative border border-px border-neutral-700 rounded-full p-1 group">
                                        <Trash size={20} className="cursor-pointer" />
                                        <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-black rounded">
                                            Delete
                                        </span>
                                    </div>
                                </div>
                                <LensCard key={index} data={element} />
                            </div>
                        })
                    }
                </div>
            }


        </div>
        <Toaster position="top-right" />
    </section>
}



