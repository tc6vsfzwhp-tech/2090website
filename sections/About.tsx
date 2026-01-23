"use client";

import Image from "next/image";

export default function About() {
  const logos = [
    "/logos/1.jpg",
    "/logos/2.jpg",
    "/logos/3.jpg",
    "/logos/4.jpg",
    "/logos/5.jpg",
    "/logos/6.jpg",
    "/logos/7.jpg",
    "/logos/8.jpg",
    "/logos/9.jpg",
    "/logos/10.jpg",
    "/logos/11.jpg",
    "/logos/12.jpg",
    "/logos/13.jpg",
    "/logos/14.jpg",
    "/logos/15.jpg",
    "/logos/16.jpg",
  ];

  return (
    <section className="relative h-screen bg-[#0B0F14]">
      {/* White container with rounded top edges only */}
      <div className="relative bg-white h-screen overflow-hidden flex flex-col z-10">
        {/* Meet the Team Section */}
        <div className="relative z-20 px-6 md:px-12 lg:px-24 pt-12 md:pt-16 lg:pt-20 flex-grow flex flex-col justify-center">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 uppercase mb-3 block">
              The People
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-blue-500">
              a small team, deeply invested in play.
            </h2>
          </div>

          {/* Team Grid */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* CEO */}
            <div className="group flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 mb-2 md:mb-4 overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
                <Image
                  src="/About/CEO.png"
                  alt="CEO"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 176px, 208px"
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-light text-black/90 mb-0.5 md:mb-1">
                Melisa Cetinalp
              </h3>
              <span className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] text-black/40 uppercase">
                CEO
              </span>
            </div>

            {/* CTO */}
            <div className="group flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 mb-2 md:mb-4 overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
                <Image
                  src="/About/CTO.png"
                  alt="CTO"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 176px, 208px"
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-light text-black/90 mb-0.5 md:mb-1">
                Deniz Cetinalp
              </h3>
              <span className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] text-black/40 uppercase">
                CTO
              </span>
            </div>

            {/* COO */}
            <div className="group flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 mb-2 md:mb-4 overflow-hidden rounded-xl md:rounded-2xl bg-gray-100">
                <Image
                  src="/About/COO.png"
                  alt="COO"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 176px, 208px"
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-light text-black/90 mb-0.5 md:mb-1">
                Renad Alharbi
              </h3>
              <span className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] text-black/40 uppercase">
                COO
              </span>
            </div>
          </div>
        </div>

        {/* Trusted By Header */}
        <div className="text-center mb-4 md:mb-6">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 uppercase">
            Trusted By
          </span>
        </div>

        {/* Marquee Banner */}
        <div className="w-full py-6 md:py-10 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-3 sm:mx-5 md:mx-6 flex items-center justify-center relative"
              >
                <Image
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-3 sm:mx-5 md:mx-6 flex items-center justify-center relative"
              >
                <Image
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50%));
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
