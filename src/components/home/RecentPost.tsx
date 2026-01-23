



import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

import { LuArrowBigRight } from "react-icons/lu";

const baseUrl = "http://localhost:3000"


export default async function RecentPost() {
  //const [showAll, setShowAll] = useState(false);
//http://localhost:3000/api/posts/recent

 const res = await fetch(`${baseUrl}/api/posts/recent`,{
  cache:"no-store"
 });
 if(!res.ok){
  throw new Error("failed to load recent posts");
 }

 const {posts}:{posts:Post[]} = await res.json()

  //const visiblePosts = showAll ? posts : posts.slice(0, 3);

  return (
    <section className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <h2 className="text-2xl font-semibold text-white">Recent Posts</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  alt="image"
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

        {/* ✅ Show More – correct place */}
        
          <div className="flex justify-center pt-4">
            <button
              
              className="rounded-full border border-white/20 px-6 py-2 text-sm text-white hover:bg-white/10 transition"
            >
              show more
            </button>
          </div>
        
      </div>
    </section>
  );
}
