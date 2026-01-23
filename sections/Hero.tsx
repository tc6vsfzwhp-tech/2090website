"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <section className="relative min-h-screen flex items-center px-6 bg-white overflow-hidden">
        {/* GIF Container with rounded edges */}
        <div className="absolute inset-0 z-0 p-2 md:p-5">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {/* Using native img for better GIF support on mobile */}
            <img
              src="https://vaaomblbmlkknefc.public.blob.vercel-storage.com/Moonfall.gif"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="max-w-3xl relative z-10 pl-8 md:pl-16"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white">
            We craft worlds worth exploring.
          </h1>
          <p className="mt-5 text-base md:text-lg lg:text-xl text-white/80">
            A creative studio bringing games to the next level.
          </p>
        </motion.div>
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
