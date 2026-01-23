'use client'

import { useInfinitePosts } from '@/custom-hooks/usePost';
import ContainerLayout from '@/layouts/ContainerLayout'
import Image from 'next/image';
import Link from 'next/link';
import Cardsk from '@/components/skletons/Cardsk'

import { LuArrowBigRight } from 'react-icons/lu';



export default function ArticlesPage() {
    
const {data,fetchNextPage,hasNextPage, isFetchingNextPage,status} = useInfinitePosts({limit:3});

if(status == "pending"){
  return(
    <ContainerLayout>
      <h2 className='text-xl font-semibold text-white text-center '>All Articles</h2>
      <Cardsk />
    </ContainerLayout>
  )
}
if(status == "error"){
   return(
    <ContainerLayout>
      <p className='text-gray-200'>failed to load articles</p>
    </ContainerLayout>
  )
}
const posts = data.pages.flatMap((page)=>page.posts) ?? [];
    
  return (
    <ContainerLayout>
        <div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 py-2 space-y-6'>
         <h2 className='text-xl font-semibold text-white text-center '>All Articles</h2>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                   {posts.map((post) => (
                     <article
                       key={post.id}
                       className="group rounded-2xl overflow-hidden bg-[#0B0B0B] border border-white/10 hover:border-white/20 transition"
                     >
                       {/* Image */}
                       {post.coverImageUrl && (
                        <div className="relative h-52 sm:h-48 lg:h-56 w-full">
                        <Image
                           src={post.coverImageUrl}
                           alt={post.title}
                           fill
                           className="object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                         <div className="absolute inset-0 bg-black/25" />
                       </div>
                       )}
         
                       {/* Content */}
                       <div className="p-5 space-y-3">
                         <time className="text-xs text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString("en-GB",{day:"2-digit", month:"short", year:"numeric"})}
                         </time>
         
                         <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">
                           {post.title}
                         </h3>
         
                         <p className="text-sm text-gray-400 line-clamp-2">
                           {post.description}
                         </p>
                         <Link
                           href={`/articles/${post.slug}`}
                           className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:underline"
                         >
                           Read article
                           <LuArrowBigRight className="text-base w-6 h-6" />
                         </Link>
                       </div>
                     </article>
                   ))}
                 </div>

        </div>
       {hasNextPage && (
         <div className='flex justify-center mt-4 mb-4'>
           <button onClick={()=>fetchNextPage()}
           disabled={isFetchingNextPage}
           className="px-8 py-2 bg-primary cursor-pointer rounded-xl text-white transition-colors  font-semibold hover:bg-indigo-500">
            {isFetchingNextPage ? "Loading..." : "Load more"}
           </button>
        </div>
       )}
        </div>
    </ContainerLayout>
  )
}
