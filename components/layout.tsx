import Head from 'next/head'
import Navbar from './navbar'
import FooterBar from './footer'
import {useRouter} from 'next/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Pages {
  name: string;
  href: string;
}
export interface LayoutProps {
  children: JSX.Element;
}

let navPages: Pages[] = [
  { name: 'Home', href: '/' },
  { name: 'Quotes', href: '/quotes' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Pick-up Lines', href: '/pickup' },
  { name: 'Daniels Recipe', href: '/danielsrecipe' },
];

const Layout = ({ children }: LayoutProps) => {
  let router = useRouter();

  let currentPage = router.pathname;
  let thisPage = navPages.find((item) => {
    return item.href.toLowerCase() === currentPage;
  });

    return (
        <>
            <Head>
                <title>{thisPage?.name}</title>
                <link rel="icon" href="./openailogo.png"></link>
            </Head>
            <div className='min-h-screen flex flex-col'>
        <Navbar navPages={navPages}/>
            <div className='min-h-100vh flex'>{children}</div>
                <FooterBar></FooterBar>
                <ToastContainer
                    position='bottom-right'
                    newestOnTop
                    autoClose={5000}
                />
                </div>
</>
    )
}

export default Layout;
