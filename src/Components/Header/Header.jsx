import { NavLink } from "react-router-dom";
import './Header.css'

export default function Header() {
    return (
        <header className="px-2 flex flex-col">
            <nav className="h-12 border-b flex items-center justify-between border-neutral-100">
                <div className="cursor-pointer flex items-center justify-center rounded-[4px] text-black p-1 hover:bg-neutral-100">mob</div>
                <ul className="hidden h-full items-center justify-center gap-1 lg:flex">
                    <NavLink to={'/'} className="h-full border-[#3B368E] flex items-center justify-center">
                        <span className="rounded-[4px] text-sm hover p-1 hover:bg-neutral-100">ایجاد</span>
                    </NavLink>
                    <i className="">
                        <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h8v8H0z"></path><path stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d="m5.5 7-3-3 3-3"></path></g></svg>
                    </i>
                    <NavLink to={'/send'} className="h-full border-[#3B368E] flex items-center justify-center">
                        <span className="rounded-[4px] text-sm hover p-1 hover:bg-neutral-100">ارسال</span>
                    </NavLink>
                    <i className="">
                        <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h8v8H0z"></path><path stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d="m5.5 7-3-3 3-3"></path></g></svg>
                    </i>
                    <NavLink to={'/report'} className="h-full border-[#3B368E] flex items-center justify-center">
                        <span className="rounded-[4px] text-sm hover p-1 hover:bg-neutral-100">گزارش</span>
                    </NavLink>
                </ul>
                <div className="cursor-pointer flex items-center gap-3">
                    <NavLink to={'/preview'} className="rounded-[4px] p-1 hover:bg-neutral-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M3 12s3.273-7 9-7 9 7 9 7-3.273 7-9 7-9-7-9-7z" stroke="#3E434D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><ellipse fill="#3E434D" cx="12" cy="12" rx="2.455" ry="3.5"></ellipse></g></svg>
                    </NavLink>
                </div>
            </nav>
            <ul className="h-12 border-b border-neutral-100 flex items-center justify-center gap-1 lg:hidden">
                <NavLink to={'/'} className="h-full border-[#3B368E] flex items-center justify-center">
                    <span className="rounded-[4px] text-sm hover p-1 hover:bg-neutral-100">ایجاد</span>
                </NavLink>
                <i className="">
                    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h8v8H0z"></path><path stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d="m5.5 7-3-3 3-3"></path></g></svg>
                </i>
                <NavLink to={'/send'} className="h-full border-[#3B368E] flex items-center justify-center">
                    <span className="rounded-[4px] text-sm hover p-1 hover:bg-neutral-100">ارسال</span>
                </NavLink>
                <i className="">
                    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h8v8H0z"></path><path stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" d="m5.5 7-3-3 3-3"></path></g></svg>
                </i>
                <NavLink to={'/report'} className="h-full border-[#3B368E] flex items-center justify-center">
                    <span className="rounded-[4px] text-sm hover p-1 hover:bg-neutral-100">گزارش</span>
                </NavLink>
            </ul>
        </header>
    )
}
