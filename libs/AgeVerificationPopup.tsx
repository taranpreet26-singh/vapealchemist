"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AgeVerificationPopup() {
    const [showPopup, setShowPopup] = useState(false)
    const router = useRouter()

    const handleVerify = () => {
        localStorage.setItem("ageVerified", "true")
        setShowPopup(false)
    }

    useEffect(() => {
        const verified = localStorage.getItem("ageVerified")
        if (verified === null) {
            setShowPopup(true)
        } 
    }, [])
    
    if (!showPopup) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-neutral-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4 text-white">Age Verification</h1>
                <p className="text-white mb-6">
                    You must be <span className="font-semibold">18 years or older</span> to enter this site.
                </p>

                <div className="flex justify-center gap-4">

                    <button
                        onClick={handleVerify}
                        className="px-6 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
                    >
                        I&apos;m 18+
                    </button>
                </div>
            </div>
        </div>
    )
}
