import { useState } from 'react'

export default function ContentEditor({ className, title, children, open = false, onOpen, error }) {

    const [showContent, setShowContent] = useState(open)

    return (
        <div className={`flex flex-col border-b border-neutral-100 ${className}`}>
            <div className="flex items-center justify-between py-4">
                <p className="text-sm font-bold">{title}</p>
                <div onClick={() => {
                    setShowContent((prev) => !prev)
                    onOpen()
                }} className={`cursor-pointer relative w-10 h-5 bg-[#BBBDC0] rounded-full after:content-[''] after:absolute after:top-[2px] after:end-[2px] after:bg-white after:rounded-full after:size-4 after:transition-all ${showContent ? 'after:-translate-x-[124%] rtl:after:translate-x-[124%] !bg-[#3B368E]' : ''}`}></div>
            </div>
            <div className={`flex flex-col gap-4 overflow-hidden ${showContent ? 'h-max' : 'h-0'}`}>
                {showContent ? children : <></>}
            </div>
        </div>
    )
}
