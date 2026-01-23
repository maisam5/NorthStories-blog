'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <footer className='border-t border-white/10 mt-16'>
     <div className='max-w-7xl py-10 flex flex-col sm:flex-row mx-auto px-6 items-center justify-between gap-4'>
      <p className='text-sm text-gray-300'>
        &copy; {new Date().getFullYear()} NorthStories. All rights reserved
      </p>
      <div className="flex items-center gap-6 text-sm">
      <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home
      </Link>
      <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About
      </Link>
      <Link href="/articles" className="text-gray-300 hover:text-white transition-colors">Articles
      </Link>
      </div>
     </div>
    </footer>
  )
}
