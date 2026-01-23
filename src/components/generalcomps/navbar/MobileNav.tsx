import React from 'react'
import { navlinks } from './Navbar'
import Link from 'next/link'

interface MobileNavProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MobileNav({ menuOpen, setMenuOpen }: MobileNavProps) {
  return (
    <div className='md:hidden'>
    <div className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}/>

    <ul className={`fixed top-18 right-0 z-50 h-[80vh] w-full flex flex-col gap-10 items-center justify-center bg-secondary-background/80 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
     {navlinks.map((link)=>(
        <li key={link.url}>
          <Link onClick={()=>setMenuOpen(false)} href={link.url} className='font-semibold text-xl tracking-wide text-gray-200 hover:text-primary transition-colors'>
          {link.label}
          </Link>
        </li>
     ))}
    </ul>
    </div>
  )
}
