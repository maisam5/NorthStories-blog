import Blogview from "@/components/blog-view/Blogview";
import Postviewskeleton from "@/components/skletons/Postviewskeleton";
import { getPostBySlug } from "@/server-actions/getpost";
import { Suspense } from "react";

export default async function PostViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const postPromise = getPostBySlug(slug);

  return (
    <Suspense fallback={<Postviewskeleton />}>
      <Blogview postPromise={postPromise} />
    </Suspense>
  );
}

