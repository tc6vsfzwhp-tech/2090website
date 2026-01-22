"use client";

import Image from "next/image";

export default function Loop() {
  // 12 background images for 5 columns × 3 rows (middle column empty)
  const bgImages = [
    "/switch/bg1.jpg",
    "/switch/bg2.jpg",
    "/switch/bg3.jpg",
    "/switch/bg4.jpg",
    "/switch/bg1.jpg",
    "/switch/bg2.jpg",
    "/switch/bg3.jpg",
    "/switch/bg4.jpg",
    "/switch/bg1.jpg",
    "/switch/bg2.jpg",
    "/switch/bg3.jpg",
    "/switch/bg4.jpg",
  ];

  // Screen aspect ratio (16:9)
  const SCREEN_ASPECT = 16 / 9;

  return (
    <section className="relative bg-[#0B0F14]">
      {/* Background Grid - Scrolls normally, edges overflow for "more content" illusion */}
      <div className="relative z-10 overflow-hidden pb-0 -mb-[250px] ">
        <div className="pt-10">
          {/* 
            Desktop: 5 columns (2 left | empty | 2 right)
            Mobile: 3 columns (1 left | empty | 1 right)
            Images overflow edges by ~20%
          */}
          <div
            className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4"
            style={{
              width: "130%",
              marginLeft: "-15%",
            }}
          >
            {bgImages.map((src, i) => {
              // Desktop (5 cols): indices 0,1,2,3 → cols 1,2,4,5
              // Mobile (3 cols): indices 0,1 → cols 1,3 (skip middle)
              const indexInRow = i % 4;

              // Desktop column positions
              let smColStart: string;
              if (indexInRow === 0) smColStart = "sm:col-start-1";
              else if (indexInRow === 1) smColStart = "sm:col-start-2";
              else if (indexInRow === 2) smColStart = "sm:col-start-4";
              else smColStart = "sm:col-start-5";

              // Mobile: Only show 2 images per row (left and right)
              // Skip indices 1 and 3 on mobile (they're the "inner" images)
              const mobileColStart =
                indexInRow === 0 || indexInRow === 1
                  ? "col-start-1"
                  : "col-start-3";

              // Hide inner images on mobile
              const hiddenOnMobile =
                indexInRow === 1 || indexInRow === 3 ? "hidden sm:block" : "";

              return (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden ${mobileColStart} ${smColStart} ${hiddenOnMobile}`}
                  style={{ aspectRatio: `${SCREEN_ASPECT}` }}
                >
                  <Image
                    src={src}
                    alt={`Game scene ${i + 1}`}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Console - Scrolls normally first, then sticks to bottom */}
      <div className="sticky bottom-0 flex justify-center z-50 pointer-events-none">
        <div className="relative w-[1000px] max-w-[85vw]">
          {/* Video masked to screen area */}
          <div
            className="absolute z-30 overflow-hidden rounded-sm"
            style={{
              left: "33%",
              top: "10%",
              width: "34%",
              aspectRatio: `${SCREEN_ASPECT}`,
            }}
          >
            <video
              className="w-full h-full object-cover"
              src="/switch/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>

          {/* Console Image */}
          <Image
            src="/switch/switch.png"
            alt="Nintendo Switch handheld console"
            width={1600}
            height={900}
            className="relative z-20 w-full h-auto select-none"
            priority
          />
        </div>
      </div>
    </section>
  );
}
