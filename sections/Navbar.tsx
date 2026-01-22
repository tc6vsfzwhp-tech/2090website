"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      // Change color after scrolling past the hero section (100vh)
      setIsScrolled(target.scrollTop > window.innerHeight - 20);
    };

    // Find the scrollable main element
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget; // Save reference before async operation
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", result);

      if (response.ok) {
        setSubmitStatus("success");
        form.reset(); // Use saved reference
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus("idle");
        }, 2000);
      } else {
        console.error("Response not ok:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] mt-4 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <Image
              src="/WhiteLogo.png"
              alt="Twenty Ninety Creative"
              width={150}
              height={50}
              className="h-8 md:h-12 lg:h-15 w-auto"
              priority
            />
          </Link>

          {/* Center Navigation - Pill Style */}
          <div
            className={`relative hidden md:flex items-center gap-0.5 lg:gap-1 backdrop-blur-md rounded-full px-3 lg:px-6 py-2 lg:py-3 shadow-sm transition-all duration-300 ${
              isScrolled ? "bg-black/90" : "bg-white/90"
            }`}
          >
            <Link
              href="#about"
              className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-full transition-colors text-sm lg:text-base font-medium ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              About Us
            </Link>
            <Link
              href="#games"
              className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-full transition-colors text-sm lg:text-base font-medium ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              Games
            </Link>
            <Link
              href="#how"
              className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-full transition-colors text-sm lg:text-base font-medium ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              Process
            </Link>
            <Link
              href="#team"
              className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-full transition-colors text-sm lg:text-base font-medium ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              Team
            </Link>
            <Link
              href="#contact"
              className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-full transition-colors text-sm lg:text-base font-medium ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`hidden md:flex items-center gap-1.5 lg:gap-2 font-semibold px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base rounded-full shadow-sm transition-all duration-300 hover:shadow-md ${
              isScrolled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className="text-base lg:text-lg">+</span>
            <span>Talk to Us</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors z-[101]"
          >
            <svg
              className={`w-6 h-6 transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg py-4 px-6">
            <div className="flex flex-col gap-2">
              <Link
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                href="#games"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                Games
              </Link>
              <Link
                href="#how"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                Process
              </Link>
              <Link
                href="#team"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                Team
              </Link>
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                Contact Us
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="mt-2 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg">+</span>
                <span>Talk to Us</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 p-12">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-4xl font-bold mb-8">
              Hey! Tell us what you need
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name & Company
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Sara from XYZ"
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sara@xyz.com"
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tell us more about you
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Something about you"
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <p className="text-green-600 text-sm font-medium">
                  ✓ Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-sm font-medium">
                  ✗ Failed to send message. Please try again.
                </p>
              )}

              {/* Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-sm text-gray-400 text-center md:text-left">
                  Our Email{" "}
                  <a
                    href="mailto:ralharbi@me.com"
                    className="text-gray-600 hover:underline"
                  >
                    ralharbi@me.com
                  </a>
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Submit the request"}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
