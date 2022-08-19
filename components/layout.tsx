import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
export interface LayoutProps{
    children:JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  
    return (
        <>
            <nav>
            
            </nav>
            <div>{children}</div>
    </>
  )
}

export default Layout
