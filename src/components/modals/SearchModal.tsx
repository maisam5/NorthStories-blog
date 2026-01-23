'use client'
import { useState } from 'react';
import Modal from './Modal'
import { useModalStore } from '@/store/modalstore'
import { useDebounce } from '@/custom-hooks/usePost';
import { useQuery } from '@tanstack/react-query';
import { searchPosts } from '@/services/post';
import { Post } from '@/types/post';
import { useRouter } from 'next/navigation';


  
export default function SearchModal() {
    const {closeSearch, isSearchOpen} = useModalStore();
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query,400);
    const router = useRouter();

    const {data:results = [], isLoading, isFetching} = useQuery({
      queryKey:["search-posts", debouncedQuery],
      queryFn:()=> searchPosts(debouncedQuery),
      enabled:debouncedQuery.length > 1,

    })
    const handleNavigate = (slug:string)=>{
      router.push(`/articles/${slug}`);
      closeSearch();
      setQuery("")
    }
  return (
    <Modal onClose={closeSearch} isOpen={isSearchOpen}>
      <div className='space-y-4'>
         <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" placeholder='search articles' className='w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white text-lg outline-none focus:border-indigo-500' />
          <div className='max-h-80 overflow-y-auto rounded-xl border border-white/10 divide-y divide-white/10'>
        
        {/*if searching*/}
        {(isLoading || isFetching )&& (
          <div className='px-4 py-3 text-gray-400'>
            Searching...
          </div>
        )}
        {/*no results or empty*/}
        {!isLoading && debouncedQuery && results.length === 0 && (
          <div className='px-4 py-3 text-gray-400'>
            no results found!
          </div>
        )}
      {results.map((result:Post)=>(
        <button onClick={()=> handleNavigate(result.slug)} key={result.id} className='px-4 py-3 cursor-pointer text-gray-300 w-full text-left transition hover:bg-white/5 hover:text-white'>
         {result.title}
        </button>
      ))}

      </div>
      </div>
     
    </Modal>
  )
}
