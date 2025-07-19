// import React from 'react'

import { useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentContent } from "../../states/currentQContent";


export default function CreateSection() {

    const [open, setOpen] = useState(true)
    const [page, setPage] = useState('create')
    const { state } = useLocation()
    const navigation = useNavigate()
    const { features, currentQContent } = useSelector((state) => state)
    const dispatch = useDispatch()

    return (
        <>
            {createPortal(
                <section className={`absolute invisible opacity-0 inset-0 w-full h-screen bg-[rgba(0,_0,_0,_.75)] lg:p-6 ${open ? '!opacity-100 !visible' : ''}`}>
                    <div className="size-full overflow-hidden flex bg-white lg:rounded-lg">
                        <div className="relative size-full flex flex-col lg:min-w-[360px] lg:w-[360px]">
                            <div className="min-h-12 border-b flex items-center gap-2 border-neutral-100">
                                <i onClick={() => {
                                    setOpen(false)
                                    navigation('/')
                                    dispatch(clearCurrentContent(''))
                                }} className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" fillRule="evenodd"><g><g><g><path stroke="#3E434D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30 18L18 30M18 18L30 30" transform="translate(-1152.000000, -306.000000) translate(232.000000, 302.000000) translate(920.000000, 4.000000)"></path></g></g></g></g></svg>
                                </i>
                                <div className={`h-8 font-bold rounded ${features[state.index].bg} flex items-center gap-1 pl-1 pr-2`}>{features[state.index].icon}</div>
                                <p className="text-sm font-bold">{features[state.index].title}</p>
                            </div>
                            <div className="min-h-12 border-b flex items-center gap-2 border-neutral-100 lg:hidden">
                                <ul className="flex h-full items-center justify-center gap-1 pr-8">
                                    <li onClick={() => setPage('create')} className={`h-full border-[#3B368E] flex items-center justify-center rounded-[4px] text-sm hover p-1 hover:bg-neutral-100 cursor-pointer ${page === 'create' ? 'font-bold text-[#3B368E] border-b-2 rounded-none' : ''}`}>
                                        ایجاد سوال
                                    </li>
                                    <li onClick={() => setPage('show')} className={`h-full border-[#3B368E] flex items-center justify-center rounded-[4px] text-sm hover p-1 hover:bg-neutral-100 cursor-pointer ${page === 'show' ? 'font-bold text-[#3B368E] border-b-2 rounded-none' : ''}`}>
                                        نمایش سوال
                                    </li>
                                </ul>
                            </div>
                            {page === 'create' ? (
                                <div className="flex flex-col px-4 overflow-y-auto h-[calc(100vh_-_153px)] [&::-webkit-scrollbar]:w-0">{features[state.index].component}</div>
                                /* <div className="z-50 bg-white sticky top-full left-0 right-0 w-full py-3 px-4 flex items-center justify-end gap-4 border-t border-neutral-100">
                                    <button
                                        onClick={() => {
                                            setOpen(false)
                                            navigation('/')
                                        }}
                                        className="text-sm font-bold text-[#3B368E] cursor-pointer min-w-16 h-8 flex items-center justify-center rounded bg-[#f0f2f5] hover:bg-[#d8dbe0]">انصراف</button>
                                    <button className="text-sm font-bold text-white cursor-pointer min-w-16 h-8 flex items-center justify-center rounded bg-[#3b368e]">ذخیره</button>
                                </div> */
                            ) : (
                                <div className="size-full relative flex items-center justify-center bg-[#285975]">
                                    <div className="absolute top-3 left-0 right-0 mx-auto hidden items-center h-8 w-max bg-white rounded lg:flex">
                                        <button className="group w-10 h-full flex items-center justify-center">
                                            <i className="">
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(3.429 4)" stroke="#3E434D" strokeLinejoin="round"><rect className="group-hover:fill-neutral-100 group-active:fill-[#3e434d]" strokeLinecap="round" width="17.143" height="12" rx="2"></rect><path strokeLinecap="round" d="M4.571 16h8"></path><path strokeLinecap="square" d="M8.571 13v3"></path></g></g></svg>
                                            </i>
                                        </button>
                                        <button className="group w-10 h-full flex items-center justify-center">
                                            <i className="">
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(7 5)"><rect className="group-hover:fill-neutral-100 group-active:fill-[#3e434d]" stroke="#3E434D" strokeLinecap="round" strokeLinejoin="round" width="10" height="15" rx="2"></rect><rect fill="#3E434D" x="3" y="12" width="4" height="1" rx=".5"></rect></g></g></svg>
                                            </i>
                                        </button>
                                    </div>
                                    {currentQContent[currentQContent.length - 1] && typeof currentQContent[currentQContent.length - 1] !== 'object' ? (
                                        <div dangerouslySetInnerHTML={{ __html: currentQContent[currentQContent.length - 1] }} className="">
                                        </div>
                                    ) : ''}
                                </div>
                            )}
                        </div>
                        <div className="hidden size-full relative items-center justify-center bg-[#285975] lg:flex">
                            <div className="absolute top-3 left-0 right-0 mx-auto flex items-center h-8 w-max bg-white rounded">
                                <button className="group w-10 h-full flex items-center justify-center">
                                    <i className="">
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(3.429 4)" stroke="#3E434D" strokeLinejoin="round"><rect className="group-hover:fill-neutral-100 group-active:fill-[#3e434d]" strokeLinecap="round" width="17.143" height="12" rx="2"></rect><path strokeLinecap="round" d="M4.571 16h8"></path><path strokeLinecap="square" d="M8.571 13v3"></path></g></g></svg>
                                    </i>
                                </button>
                                <button className="group w-10 h-full flex items-center justify-center">
                                    <i className="">
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(7 5)"><rect className="group-hover:fill-neutral-100 group-active:fill-[#3e434d]" stroke="#3E434D" strokeLinecap="round" strokeLinejoin="round" width="10" height="15" rx="2"></rect><rect fill="#3E434D" x="3" y="12" width="4" height="1" rx=".5"></rect></g></g></svg>
                                    </i>
                                </button>
                            </div>
                            {currentQContent[currentQContent.length - 1] && typeof currentQContent[currentQContent.length - 1] !== 'object' ? (
                                <div
                                    dangerouslySetInnerHTML={{ __html: currentQContent[currentQContent.length - 1] }}
                                    className="flex flex-col gap-4 [&>button]:w-40 [&>button]:h-12 [&>button]:rounded-lg [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:text-black [&>button]:font-bold [&>button]:text-xl [&>button]:bg-[#FBF7BC] text-[#FBF7BC]">
                                </div>
                            ) : ''}
                        </div>
                    </div>
                </section>
                ,
                document.body
            )
            }
        </>
    )
}
