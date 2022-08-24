import { Pages } from './layout'
import Image from 'next/image'
import {useRouter} from 'next/router'


function Navbar({ navPages }: { navPages: Pages[] }) {
        let router = useRouter()
    console.log(router.pathname)
    let currentPage = router.pathname
    let thisPage = navPages.find((item) => {
        return item.href.toLowerCase() === currentPage
    })
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
                                    {navPages.map((page, i) => {
                                        if(page.name ==thisPage?.name)
                                            return <a href={page.href} className='text-white hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium bg-gray-600' key={i}>{page.name}</a>
                                        else  return <a href={page.href} className='text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium' key={i}>{page.name}</a>
})}
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