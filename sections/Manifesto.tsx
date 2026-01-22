"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="min-h-screen snap-start bg-white text-[#E6E8EB] px-6 pt-0 pb-16 overflow-hidden flex flex-col">
      {/* About Us header at top, centered */}
      <motion.span
        className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 uppercase mt-24 md:mt-28 block text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        About Us
      </motion.span>

      <div className="mt-16 md:mt-20 mx-auto max-w-3xl pt-8 flex-grow">
        <motion.h2
          className=" text-3xl md:text-4xl font-semibold tracking-tight text-black"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          Games are journeys.
        </motion.h2>

        <motion.p
          className="mt-8 text-lg md:text-xl leading-relaxed text-[#9AA4B2]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          At Twenty Ninety Creative, we draw inspiration from the 1990s, when
          games sparked imagination, invited exploration and made joy feel
          effortless.
        </motion.p>

        <motion.p
          className="mt-5 text-lg md:text-xl leading-relaxed text-[#9AA4B2]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          Our mission is to make happy memories for everyone we reach. We do so
          by focusing on fun first, and finding unique ways for people to feel
          like children again.
        </motion.p>
      </div>

      {/* Marquee Banner - Now at the bottom */}
      <div className="w-full py-8 overflow-hidden mt-auto">
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          <span className="text-5xl md:text-8xl font-bold text-blue-500 inline-block">
            We don&apos;t rush worlds. We let them
            unfold&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; We don&apos;t rush
            worlds. We let them unfold.&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; We
            don&apos;t rush worlds. We let them
            unfold.&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; We don&apos;t rush
            worlds. We let them unfold.&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          </span>
        </motion.div>
      </div>
    </section>
  );
}
