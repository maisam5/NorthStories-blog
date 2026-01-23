import RecentPost from "@/components/home/RecentPost";
import Cardsk from "@/components/skletons/Cardsk";
import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  return (
 <ContainerLayout>
  <h1 className="text-3xl lg:text-5xl xl:text-7xl text-center text-gray-200 tracking-wide leading-snug lg:leading-tight">
    <span className="font-bold">Welcome To NorthStories</span><br /> Discover amzing stories from the North
  </h1>
  <div className="py-12 lg:py-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
  <div className="relative px-2">
  <Image src="/images/mountain.jpg" alt="About image" width={600} height={600} className="rounded-2xl border border-white/10" />
  {/*glow*/}
  <div>
    <div className="absolute -inset-4 rounded-2xl bg-indigo-500/10 blur-3xl -z-10 "/>
  </div>
  </div>
  {/*content*/}

  <div className="max-w-xl px-2 md:px-0">
   <span className="text-sm uppercase tracking-widest text-indigo-300">
    About NorthStories
   </span>
    <h3 className="mt-3 font-semibold text-2xl lg:text-3xl xl:text-4xl tracking-tight text-white">
    Experience North through narratives and stunning visuals.
    </h3>
    <p className="mt-5 text-gray-300">
    At NorthStories, we believe in the power of storytelling to bridge cultures and inspire wanderlust. Our platform is dedicated to sharing captivating stories, breathtaking photography, and insightful travel guides that highlight the unique beauty and culture of Northern regions. Whether you are an avid traveler or simply curious about the North, NorthStories offers a window into its enchanting landscapes and rich traditions.
    </p>
    <div className="mt-10">
      <Link href={'/about'} className="inline-flex items-center rounded-xl bg-secondary-background gap-2 py-3 px-7 border border-white/10 text-gray-200 font-semibold hover:bg-white/10 transition-colors ">
      Learn more
      <LuArrowRight size={15} />
      </Link>
    </div>
  </div>
  </div>
  </div>
  <Suspense fallback={<Cardsk />}>
    <RecentPost />
  </Suspense>
 </ContainerLayout>
  );
}
