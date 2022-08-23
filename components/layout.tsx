import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from './navbar'
import Image from 'next/image'

export interface LayoutProps{
    children:JSX.Element
}



const Layout = ({ children }: LayoutProps) => {

    return (
        <>
        <Navbar></Navbar>
        <div>{children}</div>
    </>
    )
}

export default Layout
