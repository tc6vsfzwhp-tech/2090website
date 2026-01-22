"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Game() {
  return (
    <section className="min-h-screen bg-white ">
      <div className="bg-[#0B0F14] rounded-t-[3rem] md:rounded-t-[2rem] min-h-screen px-6 md:px-16 py-10 md:py-24 relative overflow-hidden">
        {/* Right Tentacle - Jiggly animation */}
        <motion.div
          className="absolute right-0 -top-[8%] md:-top-[2%] w-24 md:w-40 lg:w-64 h-[300px] md:h-[400px] lg:h-[500px] pointer-events-none origin-top"
          animate={{
            skewX: [0, 2, -2, 1, -1, 0],
            skewY: [0, 1, -1, 0.5, -0.5, 0],
            scaleX: [1, 1.02, 0.98, 1.01, 0.99, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/rightTen.svg"
            alt=""
            fill
            className="object-contain scale-y-[-1]"
          />
        </motion.div>

        {/* Left Tentacle - Jiggly animation */}
        <motion.div
          className="absolute left-0 -top-[20%] md:-top-[12%] w-24 md:w-40 lg:w-64 h-[500px] md:h-[650px] lg:h-[800px] pointer-events-none origin-top"
          animate={{
            skewX: [0, -2, 2, -1, 1, 0],
            skewY: [0, -1, 1, -0.5, 0.5, 0],
            scaleX: [1, 0.98, 1.02, 0.99, 1.01, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Image
            src="/leftTen.svg"
            alt=""
            fill
            className="object-contain scale-y"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header - Small text on top */}
          <motion.h2
            className="text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase mb-3 block text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Flagship Title
          </motion.h2>

          {/* Game Logo - Now prominent in the middle */}
          <motion.div
            className="flex justify-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-48 md:w-120 md:h-60 mb-2 md:mb-10">
              <Image
                src="/MoonfallVoyage_Logo_White_Shadow.png"
                alt="Game Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            A journey through a broken world
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-300 text-center max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            In Moonfall Voyage, sailing is at the heart of exploration. Your
            goal is to free colossal guardians from a powerful curse. Each
            guardian you encounter offers unique sailing challenges and puzzles
            as you uncover the history of this world, and restore balance to the
            fragile realm.
          </motion.p>

          {/* Coming Soon & Steam Link */}
          <motion.div
            className="flex flex-col items-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-sm md:text-base tracking-[0.2em] text-white/60 uppercase">
              Coming Soon
            </span>
            <a
              href="https://store.steampowered.com/app/2552260/Moonfall_Voyage/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 group"
            >
              <Image
                src="/icons/whiteSteam.svg"
                alt="Steam"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-white font-medium group-hover:text-white/90">
                Wishlist on Steam
              </span>
              <svg
                className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
