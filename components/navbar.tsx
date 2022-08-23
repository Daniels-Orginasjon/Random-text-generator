import Layout from "./layout";
import Pages from "./layout";
import Image from 'next/image'

export interface Pages{
    name: string;
    href: string;
}

function Navbar() {
    let navPages: Pages[]= [
        { name: "Home", href: "/" },
        { name: "Quote", href: "/quotes" },
        { name: "wallah2", href: "/wallah2" },
    ]
    return (
        <>
        <nav className="bg-gray-800 h-40px">
                <div className="max-w-7xl  px-6 ">
                    <div className="relative flex items-left">
                        <div className="flex-1 flex items-left justify-left items-stretch justify-start">
                                <div className="flex-shrink-0 flex items-left">
                                <Image className="block h-8 w-auto absolute" src="/openailogo.png"  alt='logo' layout='fixed' height="40px" width="40px" objectFit='contain'/>
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
        
    </>
    )
}
    
    export default Navbar