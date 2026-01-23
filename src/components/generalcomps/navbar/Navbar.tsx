'use client'
import Link from 'next/link'
import { LuMenu, LuNotebookPen, LuSearch, LuX } from 'react-icons/lu'
import MobileNav from './MobileNav'
import { useState } from 'react'
import { useModalStore } from '@/store/modalstore'
import { authClient } from '@/lib/auth-client'

export const navlinks = [
    {url: '/', label: 'Home'},
    {url: '/articles', label: 'Articles'},
    {url: '/about', label: 'About'},
    
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {openSignIn, openSearch} = useModalStore();
  const {data:session,isPending} = authClient.useSession();
  
  const handleLogout = async()=>{
    await authClient.signOut();
  }
  return (
    <nav className='h-18 top-0 left-0 z-50 backdrop-blur-md backdrop-saturate-50 w-full'>
    <div className='flex items-center justify-between h-full w-[90%] mx-auto'>
        {/* logo */}
     <div>
        <Link href="/" className='text-white text-xl font-bold'>
          North<span className="text-primary">Stories</span>
        </Link>
     </div>
     {/* nav links */}
     <ul className='flex items-center gap-4 md:gap-6 text-white font-semibold'>
        <li onClick={openSearch} className='flex items-center cursor-pointer gap-1'>
        <LuSearch size={25} />
        <span className='hidden md:block'>Search</span>
        </li>

       {session && (
         <li className=''>
        <Link href={'/write'} className='flex items-center cursor-pointer gap-1'>
        <LuNotebookPen size={20} />
        <span className='hidden md:block'>Write</span>
        </Link>
        </li>
       ) }
        {navlinks.map((link)=>(
            <li key={link.url} className='hidden md:block'>
                <Link href={link.url} className="text-white hover:text-primary">
                  {link.label}
                </Link>
            </li>
        ))}
        <>
        {!isPending && (
        <>
          {session ? (<li onClick={handleLogout} className='text-white bg-primary px-3 lg:px-5 py-2 rounded-full cursor-pointer'>Logout</li>):(
            <li onClick={openSignIn} className='text-white bg-primary px-3 lg:px-5 py-2 rounded-full cursor-pointer'>Login</li>
          )}
          </>
        )}
        </>

        <li className='md:hidden cursor-pointer z-80' onClick={()=>setMenuOpen(!menuOpen)}>
           {menuOpen ? <LuX size={30} /> : <LuMenu size={30} />}
        </li>
     </ul>
    </div>
    <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </nav>
  )
}

export default Navbar