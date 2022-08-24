import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from './navbar'
import Image from 'next/image'
import FooterBar from './footer'
export interface LayoutProps{
    children:JSX.Element
}



const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <div className='min-h-screen flex flex-col'>
        <Navbar></Navbar>
            <div className='min-h-100vh flex'>{children}</div>
                <FooterBar></FooterBar>
                </div>
</>
    )
}

export default Layout
