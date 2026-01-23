import Image from 'next/image';
import React from 'react'

export default function page() {
  return (
   <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              About <span className="text-indigo-400">NorthStories</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              NorthStories is a digital journal inspired by the calm, mystery, 
              and raw beauty of the northern world. We share stories that live 
              between mountains, frozen lakes, quiet forests, and endless skies.
            </p>

            <p className="text-gray-400 leading-relaxed">
              This blog is not just about places — it’s about moments, emotions, 
              and the silence that speaks when words fall short.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="/images/m7.jpg"
              alt="About NorthStories"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* Values */}
        <div className="space-y-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            What We Believe In
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Authentic Stories",
                text: "Every article is crafted with honesty, depth, and respect for nature."
              },
              {
                title: "Minimal & Meaningful",
                text: "We believe less noise creates more impact."
              },
              {
                title: "Nature First",
                text: "The north teaches patience, silence, and resilience."
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-6 hover:border-white/20 transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Why NorthStories?
          </h3>
          <p className="text-gray-400 leading-relaxed">
            In a fast world, NorthStories invites you to slow down. 
            To read, reflect, and reconnect with the quiet power of the north.
          </p>
        </div>

      </div>
    </section>
  );
}
