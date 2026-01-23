'use client'
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import { LuArrowBigLeft, LuPen } from "react-icons/lu";
import Deletepost from "./Deletepost";

interface BlogViewPromise {
  postPromise: Promise<{
    id: string;
    title: string;
    description: string;
    content: string;
    coverImageUrl: string;
    slug: string;
    createdAt: string | Date;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  } | null>;
}

export default function Blogview({ postPromise }: BlogViewPromise) {
  const post = use(postPromise);
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  return (
    <article className="max-w-3xl mx-auto py-20 px-6">
      {/*header*/}
      <header className="mb-10">
        <h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {post?.title}
        </h1>
        <div className="flex gap-4 text-sm items-center text-gray-300">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={post?.author.image || ""}
              alt="author"
              className="object-cover"
              fill
            />
          </div>
          <span>By {post?.author.name}</span>
          <span>.</span>
          <span>
            {new Date(post?.createdAt as string).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      <div className="relative w-full h-55 sm:h-80 lg:h-105 mb-12">
        <Image
          src={post?.coverImageUrl || ""}
          alt="cover-image"
          className="object-cover rounded-2xl"
          fill
        />
      </div>
      {/*content*/}
      {post?.content && (
        <div
          className="max-w-none text-gray-300 leading-relaxed tracking-wide font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
      <div className="border-t border-white/10 my-10" />
      {userId === post?.author.id && (
        <div className="flex items-center gap-2 justify-end">
          <Link
            href={`/write/edit/${post?.id}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-indigo-400 border border-indigo-400/20 hover:border-indigo-400/40 hover:bg-indigo-400/10 transition"
          >
            <LuPen />
            Edit
          </Link>
        {post?.id && <Deletepost postId = {post?.id} />}
        </div>
      )}
      <div className="mt-10 ">
        <Link
          href="/articles"
          className="text-white hover:text-primary font-semibold inline-flex items-center justify-center"
        >
          <LuArrowBigLeft />
          Back to articles
        </Link>
      </div>
    </article>
  );
}
