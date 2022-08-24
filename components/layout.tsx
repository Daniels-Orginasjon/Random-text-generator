import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from './navbar'
import Image from 'next/image'
import FooterBar from './footer'
import {useRouter} from 'next/router'

export interface Pages{
    name: string;
    href: string;
}
export interface LayoutProps{
    children:JSX.Element
}

let navPages: Pages[]= [
        { name: "Home", href: "/" },
        { name: "Quote", href: "/quotes" },
        { name: "wallah2", href: "/wallah2" },
]


const Layout = ({ children }: LayoutProps) => {
    let router = useRouter()

    let currentPage = router.pathname
    let thisPage = navPages.find((item) => {
        return item.href.toLowerCase() === currentPage
    })

    return (
        <>
            <Head>
                <title>{thisPage?.name}</title>
            </Head>
            <div className='min-h-screen flex flex-col'>
        <Navbar navPages={navPages}/>
            <div className='min-h-100vh flex'>{children}</div>
                <FooterBar></FooterBar>
                </div>
</>
    )
}

export default Layout
