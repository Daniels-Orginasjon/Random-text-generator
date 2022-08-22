import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
export interface LayoutProps{
    children:JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
    let navPages = [
        { name: "Home", href: "/" },
        { name: "wallah", href: "/wallah" },
        { name: "wallah2", href: "/wallah2" },
    ]
    return (
        <>
        <nav className="bg-gray-800">
                <div className="max-w-7xl  px-6">
                    <div className="relative flex items-left">
                        <div className="flex-1 flex items-left justify-left items-stretch justify-start">
                                <div className="flex-shrink-0 flex items-left">
                                    <img className="hidden lg:block h-8 w-auto" src="./openailogo.png" alt="Workflow"></img>
                                </div>
                                <div className='block ml-6'>
                                    <div className='flex space-x-4'>
                                    {navPages.map((page, i) => (
                                    <a href={page.href} className='text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium' key={i}>{page.name}</a>
                                    ))}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
        </nav>
        <div>{children}</div>
    </>
    )
}

export default Layout
