"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-white">
      <footer
        ref={footerRef}
        className="relative bg-gray-100 pt-24 md:pt-32 pb-16 px-4 rounded-t-[3rem] md:rounded-t-[4rem]"
      >
        {/* Big Contact Us Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-black/90">
            Contact Us!
          </h2>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Links - now horizontal */}
          <div className="flex flex-wrap gap-6 md:gap-8 text-gray-700 text-lg font-medium items-center justify-center md:justify-start">
            <a href="#about" className="hover:text-black transition">
              About
            </a>
            <a href="#games" className="hover:text-black transition">
              Games
            </a>
            <a href="#how" className="hover:text-black transition">
              Process
            </a>
            <a href="#team" className="hover:text-black transition">
              Team
            </a>
            <a href="#contact" className="hover:text-black transition">
              Contact
            </a>
          </div>
          {/* Social Icons */}
          <div className="flex gap-8 mt-8 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
              className="hover:opacity-70 transition"
            >
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="hover:opacity-70 transition"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition"
            >
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://store.steampowered.com/app/2552260/Moonfall_Voyage/"
              target="_blank"
              rel="noopener"
              aria-label="Steam"
              className="hover:opacity-70 transition"
            >
              <Image
                src="/icons/steam.svg"
                alt="Steam"
                width={32}
                height={32}
              />
            </a>
            <a
              href="mailto:contact@twentyninety.com"
              aria-label="Email"
              className="hover:opacity-70 transition"
            >
              <Image
                src="/icons/email.svg"
                alt="Email"
                width={32}
                height={32}
              />
            </a>
          </div>
        </motion.div>
        <motion.div
          className="text-center text-gray-500 text-base mt-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          &copy; {new Date().getFullYear()} Twenty Ninety Creative. All rights
          reserved.
        </motion.div>
      </footer>
    </div>
  );
}
