"use client";

import { useRef, useEffect, useState, useCallback, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// Doodle shapes for Sub-section 1
const Doodle = ({
  style,
  type,
  mousePos,
  index,
}: {
  style: React.CSSProperties;
  type: "circle" | "squiggle" | "star" | "wave" | "dot";
  mousePos: { x: number; y: number };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [wobble, setWobble] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(
      Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2),
    );
    if (dist < 150) {
      const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
      const strength = (150 - dist) / 150;
      setWobble({
        x: Math.cos(angle + Math.PI) * strength * 8,
        y: Math.sin(angle + Math.PI) * strength * 8,
      });
    } else {
      setWobble({ x: 0, y: 0 });
    }
  }, [mousePos]);

  const shapes: Record<string, ReactNode> = {
    circle: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 2"
          opacity="0.4"
        />
      </svg>
    ),
    squiggle: (
      <svg viewBox="0 0 60 30" className="w-full h-full">
        <path
          d="M5 15 Q15 5 25 15 Q35 25 45 15 Q55 5 55 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M20 5 L23 17 L35 17 L25 24 L28 35 L20 28 L12 35 L15 24 L5 17 L17 17 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>
    ),
    wave: (
      <svg viewBox="0 0 50 20" className="w-full h-full">
        <path
          d="M0 10 Q12.5 0 25 10 Q37.5 20 50 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.25"
        />
      </svg>
    ),
    dot: (
      <svg viewBox="0 0 20 20" className="w-full h-full">
        <circle cx="10" cy="10" r="4" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  };

  return (
    <motion.div
      ref={ref}
      className="absolute text-black/60"
      style={style}
      animate={{
        x: [0, 5, -3, 3, 0].map((v) => v + wobble.x),
        y: [0, -5, 3, 5, 0].map((v) => v + wobble.y),
        rotate: [0, 2, -1, 1, 0],
      }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5,
      }}
    >
      {shapes[type]}
    </motion.div>
  );
};

// Cluster Eye component that looks at cursor and spreads on hover
const ClusterEye = ({
  mousePos,
  isVisible,
  position,
  size,
  index,
}: {
  mousePos: { x: number; y: number };
  isVisible: boolean;
  position: { x: number; y: number };
  size: number;
  index: number;
}) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!eyeRef.current || !isVisible) return;

    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
    // Convert to degrees - the eye looks toward the cursor
    setRotation((angle * 180) / Math.PI + 90);

    // Calculate distance from cursor
    const dist = Math.sqrt(
      Math.pow(mousePos.x - eyeCenterX, 2) +
        Math.pow(mousePos.y - eyeCenterY, 2),
    );

    // Spread away from cursor when nearby
    const spreadRadius = 150;
    if (dist < spreadRadius) {
      const strength = (spreadRadius - dist) / spreadRadius;
      // Move away from cursor
      setOffset({
        x: Math.cos(angle + Math.PI) * strength * 60,
        y: Math.sin(angle + Math.PI) * strength * 60,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mousePos, isVisible]);

  return (
    <motion.div
      ref={eyeRef}
      className="absolute cursor-pointer"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.005,
        x: { type: "spring", stiffness: 150, damping: 15 },
        y: { type: "spring", stiffness: 150, damping: 15 },
      }}
    >
      <motion.img
        src="/HowWeBuildGames/sub-section1/Eye.svg"
        alt="Eye"
        className="w-full h-full object-contain"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </motion.div>
  );
};

// Editing/Iterating Doodle for Sub-section 2
const EditingDoodle = ({
  position,
  type,
  size,
  isVisible,
  index,
}: {
  position: { x: number; y: number };
  type:
    | "pencil"
    | "eraser"
    | "arrow"
    | "loop"
    | "checkmark"
    | "cross"
    | "scribble"
    | "bracket"
    | "controller"
    | "pc";
  size: number;
  isVisible: boolean;
  index: number;
}) => {
  const shapes: Record<string, ReactNode> = {
    pencil: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M8 32 L28 12 L32 16 L12 36 L6 38 L8 32 M28 12 L30 10 L34 14 L32 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    eraser: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect
          x="10"
          y="15"
          width="20"
          height="12"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-15 20 21)"
        />
        <line
          x1="15"
          y1="27"
          x2="25"
          y2="27"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-15 20 27)"
        />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 50 30" className="w-full h-full">
        <path
          d="M5 15 Q15 5 25 15 Q35 25 40 15 M35 10 L40 15 L35 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    loop: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M20 8 A12 12 0 1 1 8 20 M8 15 L8 22 L15 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    checkmark: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M10 20 L17 27 L30 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    cross: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M12 12 L28 28 M28 12 L12 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    scribble: (
      <svg viewBox="0 0 60 30" className="w-full h-full">
        <path
          d="M5 15 Q10 8 15 15 Q20 22 25 15 Q30 8 35 15 Q40 22 45 15 Q50 8 55 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    bracket: (
      <svg viewBox="0 0 30 40" className="w-full h-full">
        <path
          d="M20 5 L10 5 L10 35 L20 35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    controller: (
      <svg viewBox="0 0 60 40" className="w-full h-full">
        {/* Controller body */}
        <path
          d="M15 12 Q5 12 5 22 Q5 32 15 32 L20 32 Q25 32 28 28 L32 28 Q35 32 40 32 L45 32 Q55 32 55 22 Q55 12 45 12 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* D-pad */}
        <path
          d="M14 20 L14 24 M12 22 L16 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Buttons */}
        <circle
          cx="44"
          cy="20"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="48"
          cy="24"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Joysticks */}
        <circle
          cx="22"
          cy="26"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="38"
          cy="26"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
    pc: (
      <svg viewBox="0 0 50 50" className="w-full h-full">
        {/* Monitor */}
        <rect
          x="8"
          y="5"
          width="34"
          height="26"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Screen */}
        <rect
          x="11"
          y="8"
          width="28"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Stand */}
        <path
          d="M25 31 L25 37 M18 37 L32 37"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Keyboard */}
        <rect
          x="12"
          y="41"
          width="26"
          height="6"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="15"
          y1="44"
          x2="35"
          y2="44"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      className="absolute text-black/50"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{
        opacity: isVisible ? 0.6 : 0,
        scale: isVisible ? 1 : 0,
        rotate: isVisible ? 0 : -20,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 3, -3, 2, 0],
          y: [0, -3, 2, -2, 0],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {shapes[type]}
      </motion.div>
    </motion.div>
  );
};

// Static doodle component for mobile - no animation
const StaticDoodle = ({
  position,
  type,
  size,
  isVisible,
  index,
}: {
  position: { x: string; y: string };
  type:
    | "pencil"
    | "eraser"
    | "arrow"
    | "loop"
    | "checkmark"
    | "cross"
    | "scribble"
    | "controller"
    | "pc";
  size: number;
  isVisible: boolean;
  index: number;
}) => {
  const shapes: Record<string, ReactNode> = {
    pencil: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M8 32 L28 12 L32 16 L12 36 L6 38 L8 32 M28 12 L30 10 L34 14 L32 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    eraser: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect
          x="10"
          y="15"
          width="20"
          height="12"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-15 20 21)"
        />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 50 30" className="w-full h-full">
        <path
          d="M5 15 Q15 5 25 15 Q35 25 40 15 M35 10 L40 15 L35 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    loop: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M20 8 A12 12 0 1 1 8 20 M8 15 L8 22 L15 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    checkmark: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M10 20 L17 27 L30 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    cross: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M12 12 L28 28 M28 12 L12 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    scribble: (
      <svg viewBox="0 0 60 30" className="w-full h-full">
        <path
          d="M5 15 Q10 8 15 15 Q20 22 25 15 Q30 8 35 15 Q40 22 45 15 Q50 8 55 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    controller: (
      <svg viewBox="0 0 60 40" className="w-full h-full">
        <path
          d="M15 12 Q5 12 5 22 Q5 32 15 32 L20 32 Q25 32 28 28 L32 28 Q35 32 40 32 L45 32 Q55 32 55 22 Q55 12 45 12 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 20 L14 24 M12 22 L16 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="44"
          cy="20"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="48"
          cy="24"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
    pc: (
      <svg viewBox="0 0 50 50" className="w-full h-full">
        <rect
          x="8"
          y="5"
          width="34"
          height="26"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="8"
          width="28"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M25 31 L25 37 M18 37 L32 37"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="12"
          y="41"
          width="26"
          height="6"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      className="absolute text-black/50"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 0.6 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
    >
      {shapes[type]}
    </motion.div>
  );
};

// Fixed doodle positions for mobile (percentage-based)
const mobileDoodlePositions: {
  x: string;
  y: string;
  size: number;
  type:
    | "pencil"
    | "eraser"
    | "arrow"
    | "loop"
    | "checkmark"
    | "cross"
    | "scribble"
    | "controller"
    | "pc";
}[] = [
  { x: "5%", y: "10%", size: 30, type: "pencil" },
  { x: "80%", y: "8%", size: 35, type: "controller" },
  { x: "8%", y: "30%", size: 28, type: "loop" },
  { x: "85%", y: "25%", size: 32, type: "checkmark" },
  { x: "3%", y: "55%", size: 30, type: "arrow" },
  { x: "88%", y: "50%", size: 28, type: "eraser" },
  { x: "6%", y: "75%", size: 35, type: "pc" },
  { x: "82%", y: "72%", size: 30, type: "scribble" },
  { x: "15%", y: "88%", size: 26, type: "cross" },
  { x: "75%", y: "90%", size: 28, type: "loop" },
];

// Main Curious Eye component (larger, in corner)
const CuriousEye = ({
  mousePos,
  isVisible,
}: {
  mousePos: { x: number; y: number };
  isVisible: boolean;
}) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!eyeRef.current || !isVisible) return;

    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
    // Convert to degrees - the eye rotates to look at cursor
    setRotation((angle * 180) / Math.PI + 90);
  }, [mousePos, isVisible]);

  return (
    <motion.div
      ref={eyeRef}
      className="absolute left-8 md:left-12 top-8 md:top-12 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.img
        src="/HowWeBuildGames/sub-section1/Eye.svg"
        alt="Curious Eye"
        className="w-full h-full object-contain filter drop-shadow-lg"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      />
    </motion.div>
  );
};

// Floating asset component for Sub-section 2
const FloatingAsset = ({
  src,
  alt,
  isVisible,
  delay,
  position,
}: {
  src: string;
  alt: string;
  isVisible: boolean;
  delay: number;
  position: { x: string; y: string; rotate: number };
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 32,
        rotate: isVisible ? position.rotate : 0,
      }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay / 1000,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

// Looping arrows animation
const LoopingArrows = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <motion.div
      className="absolute"
      style={{ right: "15%", top: "60%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <svg viewBox="0 0 120 60" className="w-32 h-16 md:w-48 md:h-24">
        <motion.path
          d="M10 30 Q30 10 60 10 Q90 10 100 30 Q90 50 60 50 Q30 50 10 30"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeDasharray="8 4"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.polygon
          points="95,30 105,25 105,35"
          fill="rgba(255,255,255,0.5)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

// Environmental particle for Sub-section 3
const Particle = ({
  mousePos,
  basePos,
}: {
  mousePos: { x: number; y: number };
  basePos: { x: number; y: number };
}) => {
  const [pos, setPos] = useState(basePos);

  useEffect(() => {
    const dist = Math.sqrt(
      Math.pow(mousePos.x - basePos.x, 2) + Math.pow(mousePos.y - basePos.y, 2),
    );
    if (dist < 200) {
      const angle = Math.atan2(mousePos.y - basePos.y, mousePos.x - basePos.x);
      const strength = (200 - dist) / 200;
      setPos({
        x: basePos.x + Math.cos(angle) * strength * 30,
        y: basePos.y + Math.sin(angle) * strength * 30,
      });
    } else {
      setPos(basePos);
    }
  }, [mousePos, basePos]);

  return (
    <motion.div
      className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-black/20"
      animate={{ left: pos.x, top: pos.y }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    />
  );
};

// Static eye component for mobile - no movement, fixed positions
const StaticEye = ({
  position,
  size,
  isVisible,
  index,
}: {
  position: { x: string; y: string };
  size: number;
  isVisible: boolean;
  index: number;
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
    >
      <img
        src="/HowWeBuildGames/sub-section1/Eye.svg"
        alt="Eye"
        className="w-full h-full object-contain"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
      />
    </motion.div>
  );
};

// Fixed eye positions for mobile (percentage-based for responsiveness)
const mobileEyePositions = [
  { x: "5%", y: "8%", size: 28 },
  { x: "75%", y: "5%", size: 32 },
  { x: "88%", y: "15%", size: 24 },
  { x: "8%", y: "25%", size: 22 },
  { x: "80%", y: "30%", size: 30 },
  { x: "3%", y: "45%", size: 26 },
  { x: "85%", y: "50%", size: 28 },
  { x: "10%", y: "65%", size: 24 },
  { x: "78%", y: "68%", size: 32 },
  { x: "5%", y: "82%", size: 30 },
  { x: "82%", y: "85%", size: 26 },
  { x: "20%", y: "12%", size: 20 },
  { x: "60%", y: "88%", size: 22 },
  { x: "35%", y: "5%", size: 18 },
  { x: "92%", y: "40%", size: 20 },
];

export default function How() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSubsection, setActiveSubsection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [assetsVisible, setAssetsVisible] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sentencesVisible, setSentencesVisible] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [clusterEyes, setClusterEyes] = useState<
    { position: { x: number; y: number }; size: number }[]
  >([]);
  const [editingDoodles, setEditingDoodles] = useState<
    {
      position: { x: number; y: number };
      size: number;
      type:
        | "pencil"
        | "eraser"
        | "arrow"
        | "loop"
        | "checkmark"
        | "cross"
        | "scribble"
        | "bracket"
        | "controller"
        | "pc";
    }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use requestAnimationFrame to continuously check position (more reliable than scroll events)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTop = 0;

    const checkPosition = () => {
      if (!container) {
        animationFrameId = requestAnimationFrame(checkPosition);
        return;
      }

      const rect = container.getBoundingClientRect();

      // Only update state if position has changed significantly
      if (Math.abs(rect.top - lastTop) > 0.5) {
        lastTop = rect.top;

        const sectionHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate progress based on how far the section has scrolled up
        // When rect.top is at viewport top (0), progress starts
        // When section is scrolled up by (sectionHeight - viewportHeight), progress is 1
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;

        let progress = 0;
        if (totalScrollable > 0 && scrolled >= 0) {
          progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
        }

        setScrollProgress(progress);

        // Determine active subsection
        if (progress < 0.33) {
          setActiveSubsection(0);
        } else if (progress < 0.66) {
          setActiveSubsection(1);
        } else {
          setActiveSubsection(2);
        }

        // Reveal assets for subsection 2
        if (progress >= 0.25 && progress < 0.75) {
          const subProgress = (progress - 0.25) / 0.5;
          setAssetsVisible([
            subProgress > 0,
            subProgress > 0.15,
            subProgress > 0.3,
            subProgress > 0.45,
            subProgress > 0.6,
          ]);
        } else if (progress >= 0.75) {
          setAssetsVisible([true, true, true, true, true]);
        } else {
          setAssetsVisible([false, false, false, false, false]);
        }

        // Reveal sentences one at a time in subsection 2
        if (progress >= 0.33 && progress < 0.66) {
          const subProgress = (progress - 0.33) / 0.33; // 0 to 1 within subsection 2
          setSentencesVisible([
            subProgress > 0, // "We test early." shows immediately
            subProgress > 0.3, // "We test often." shows at 30%
            subProgress > 0.6, // "We listen." shows at 60%
          ]);
        } else if (progress >= 0.66) {
          setSentencesVisible([true, true, true]);
        } else {
          setSentencesVisible([false, false, false]);
        }
      }

      animationFrameId = requestAnimationFrame(checkPosition);
    };

    // Start the animation frame loop
    animationFrameId = requestAnimationFrame(checkPosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Track mouse position (only on desktop)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [isMobile],
  );

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove, isMobile]);

  // Play video when in subsection 3
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeSubsection === 2) {
      // Force muted state for autoplay on mobile
      video.muted = true;
      
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          // If autoplay fails, try to play on first user interaction
          const playOnInteraction = () => {
            video.play().catch(() => {});
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("click", playOnInteraction);
          };
          document.addEventListener("touchstart", playOnInteraction, { once: true });
          document.addEventListener("click", playOnInteraction, { once: true });
        }
      };
      
      playVideo();
    } else {
      video.pause();
    }
  }, [activeSubsection]);

  // Generate random positions on client only to avoid hydration mismatch
  // Skip on mobile - we use fixed positions instead
  useEffect(() => {
    // Skip generating random eyes on mobile
    if (isMobile) {
      setClusterEyes([]);
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Generate cluster eyes
    const eyes: { position: { x: number; y: number }; size: number }[] = [];
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    const exclusionWidth = 500;
    const exclusionHeight = 300;

    const isInExclusionZone = (x: number, y: number) => {
      return (
        x > centerX - exclusionWidth / 2 &&
        x < centerX + exclusionWidth / 2 &&
        y > centerY - exclusionHeight / 2 &&
        y < centerY + exclusionHeight / 2
      );
    };

    const numClusters = 15;
    const eyesPerCluster = 10;

    for (let cluster = 0; cluster < numClusters; cluster++) {
      let clusterX, clusterY;
      let attempts = 0;
      do {
        clusterX = Math.random() * screenWidth;
        clusterY = Math.random() * screenHeight;
        attempts++;
      } while (isInExclusionZone(clusterX, clusterY) && attempts < 20);

      const clusterRadius = 80 + Math.random() * 100;

      for (let i = 0; i < eyesPerCluster; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * clusterRadius;
        const x = clusterX + Math.cos(angle) * dist;
        const y = clusterY + Math.sin(angle) * dist;

        if (isInExclusionZone(x, y)) continue;

        const size = 20 + Math.random() * 55;
        eyes.push({ position: { x, y }, size });
      }
    }

    for (let i = 0; i < 60; i++) {
      let x, y;
      let attempts = 0;
      do {
        x = Math.random() * screenWidth;
        y = Math.random() * screenHeight;
        attempts++;
      } while (isInExclusionZone(x, y) && attempts < 20);

      if (!isInExclusionZone(x, y)) {
        const size = 15 + Math.random() * 50;
        eyes.push({ position: { x, y }, size });
      }
    }

    setClusterEyes(eyes);

    // Generate editing doodles
    const doodleTypes: (
      | "pencil"
      | "eraser"
      | "arrow"
      | "loop"
      | "checkmark"
      | "cross"
      | "scribble"
      | "bracket"
      | "controller"
      | "pc"
    )[] = [
      "pencil",
      "eraser",
      "arrow",
      "loop",
      "checkmark",
      "cross",
      "scribble",
      "bracket",
      "controller",
      "pc",
    ];

    const doodles: {
      position: { x: number; y: number };
      size: number;
      type: (typeof doodleTypes)[number];
    }[] = [];

    const doodleExclusionWidth = 600;
    const doodleExclusionHeight = 350;

    const isInDoodleExclusionZone = (x: number, y: number) => {
      return (
        x > centerX - doodleExclusionWidth / 2 &&
        x < centerX + doodleExclusionWidth / 2 &&
        y > centerY - doodleExclusionHeight / 2 &&
        y < centerY + doodleExclusionHeight / 2
      );
    };

    for (let i = 0; i < 40; i++) {
      let x, y;
      let attempts = 0;
      do {
        x = Math.random() * screenWidth;
        y = Math.random() * screenHeight;
        attempts++;
      } while (isInDoodleExclusionZone(x, y) && attempts < 20);

      if (!isInDoodleExclusionZone(x, y)) {
        const size = 30 + Math.random() * 50;
        const type =
          doodleTypes[Math.floor(Math.random() * doodleTypes.length)];
        doodles.push({ position: { x, y }, size, type });
      }
    }

    setEditingDoodles(doodles);
  }, [isMobile]);

  const doodles = [
    {
      type: "circle" as const,
      style: { top: "20%", left: "10%", width: "40px", height: "40px" },
    },
    {
      type: "squiggle" as const,
      style: { top: "30%", right: "15%", width: "60px", height: "30px" },
    },
    {
      type: "star" as const,
      style: { bottom: "25%", left: "20%", width: "35px", height: "35px" },
    },
    {
      type: "wave" as const,
      style: { top: "60%", right: "25%", width: "50px", height: "20px" },
    },
    {
      type: "dot" as const,
      style: { top: "15%", right: "30%", width: "20px", height: "20px" },
    },
    {
      type: "dot" as const,
      style: { bottom: "35%", right: "10%", width: "15px", height: "15px" },
    },
    {
      type: "circle" as const,
      style: { bottom: "20%", right: "35%", width: "30px", height: "30px" },
    },
  ];

  return (
    <div className="relative bg-[#0B0F14]">
      <div
        ref={containerRef}
        className="relative bg-white rounded-t-[3rem] md:rounded-t-[4rem]"
        style={{ height: "300vh" }}
      >
        {/* Sticky container for all content */}
        <div className="sticky top-0 h-screen overflow-hidden rounded-t-[3rem] md:rounded-t-[4rem]">
          {/* Subtle section title */}
          <motion.div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-40">
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 uppercase mb-3 block">
              How We Build Games
            </span>
          </motion.div>

          {/* ===================== SUB-SECTION 1: PLAY ===================== */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: activeSubsection === 0 ? 1 : 0,
              y: activeSubsection === 0 ? 0 : -50,
            }}
            transition={{ duration: 0.7 }}
            style={{ pointerEvents: activeSubsection === 0 ? "auto" : "none" }}
          >
            {/* Static eyes for mobile - fixed positions, no movement */}
            {isMobile &&
              mobileEyePositions.map((eye, i) => (
                <StaticEye
                  key={`mobile-eye-${i}`}
                  position={{ x: eye.x, y: eye.y }}
                  size={eye.size}
                  isVisible={activeSubsection === 0}
                  index={i}
                />
              ))}

            {/* Random clusters of Eyes for desktop */}
            {!isMobile &&
              clusterEyes.map((eye, i) => (
                <ClusterEye
                  key={i}
                  mousePos={mousePos}
                  isVisible={activeSubsection === 0}
                  position={eye.position}
                  size={eye.size}
                  index={i}
                />
              ))}

            {/* Content */}
            <div className="text-center px-6 max-w-3xl z-20">
              <span
                className="block text-xs md:text-sm tracking-[0.25em] text-black/40  mb-8 transition-all duration-600"
                style={{
                  opacity: activeSubsection === 0 ? 1 : 0,
                  transform:
                    activeSubsection === 0
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "100ms",
                }}
              >
                1—how we start
              </span>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-light text-black/90 leading-tight mb-6 transition-all duration-600"
                style={{
                  opacity: activeSubsection === 0 ? 1 : 0,
                  transform:
                    activeSubsection === 0
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "200ms",
                }}
              >
                We design fun mechanics{" "}
                <span className="text-black/70">
                  that make people feel like children again.
                </span>
              </h2>
              <p
                className="text-sm md:text-base text-black/30 tracking-wide transition-all duration-600"
                style={{
                  opacity: activeSubsection === 0 ? 1 : 0,
                  transform:
                    activeSubsection === 0
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "300ms",
                }}
              >
                Curiosity comes first. Rules come later.
              </p>
            </div>
          </motion.div>

          {/* ===================== SUB-SECTION 2: TESTING ===================== */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: activeSubsection === 1 ? 1 : 0,
            }}
            transition={{ duration: 0.7 }}
            style={{ pointerEvents: activeSubsection === 1 ? "auto" : "none" }}
          >
            {/* Static doodles for mobile - fixed positions, no animation */}
            {isMobile &&
              mobileDoodlePositions.map((doodle, i) => (
                <StaticDoodle
                  key={`mobile-doodle-${i}`}
                  position={{ x: doodle.x, y: doodle.y }}
                  type={doodle.type}
                  size={doodle.size}
                  isVisible={activeSubsection === 1}
                  index={i}
                />
              ))}

            {/* Animated doodles for desktop */}
            {!isMobile &&
              editingDoodles.map((doodle, i) => (
                <EditingDoodle
                  key={i}
                  position={doodle.position}
                  type={doodle.type}
                  size={doodle.size}
                  isVisible={activeSubsection === 1}
                  index={i}
                />
              ))}

            {/* Content */}
            <div className="text-center px-6 max-w-3xl z-10">
              <span
                className="block text-xs md:text-sm tracking-[0.25em] text-black/40  mb-8 transition-all duration-600"
                style={{
                  opacity: activeSubsection === 1 ? 1 : 0,
                  transform:
                    activeSubsection === 1
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "100ms",
                }}
              >
                2—how we shape it
              </span>
              <div className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed mb-6">
                <motion.div
                  className="text-black/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: sentencesVisible[0] ? 1 : 0,
                    y: sentencesVisible[0] ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  We test early.
                </motion.div>
                <motion.div
                  className="text-black/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: sentencesVisible[1] ? 1 : 0,
                    y: sentencesVisible[1] ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  We test often.
                </motion.div>
                <motion.div
                  className="text-black/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: sentencesVisible[2] ? 1 : 0,
                    y: sentencesVisible[2] ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  We listen.
                </motion.div>
              </div>
              <p
                className="text-sm md:text-base text-black/30 tracking-wide transition-all duration-600"
                style={{
                  opacity: activeSubsection === 1 ? 1 : 0,
                  transform:
                    activeSubsection === 1
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "300ms",
                }}
              >
                Every mechanic earns its place through play.
              </p>
            </div>
          </motion.div>

          {/* ===================== SUB-SECTION 3: LIVING WORLDS ===================== */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            animate={{
              opacity: activeSubsection === 2 ? 1 : 0,
            }}
            transition={{ duration: 0.7 }}
            style={{ pointerEvents: activeSubsection === 2 ? "auto" : "none" }}
          >
            {/* Video background - full opacity */}
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                src="https://vaaomblbmlkknefc.public.blob.vercel-storage.com/moonfall.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore - webkit-playsinline for older iOS
                webkit-playsinline="true"
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
              />
            </div>

            {/* Content */}
            <div className="text-center px-6 max-w-4xl z-10">
              <span
                className="block text-xs md:text-sm tracking-[0.25em] text-white/60  mb-8 transition-all duration-600"
                style={{
                  opacity: activeSubsection === 2 ? 1 : 0,
                  transform:
                    activeSubsection === 2
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "100ms",
                }}
              >
                3—how it feels
              </span>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-relaxed mb-6 transition-all duration-600"
                style={{
                  opacity: activeSubsection === 2 ? 1 : 0,
                  transform:
                    activeSubsection === 2
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "200ms",
                }}
              >
                Our worlds feel alive
                <br />
                <span className="text-white/80">
                  responding to every movement.
                </span>
              </h2>
              <p
                className="text-sm md:text-base text-white/50 tracking-wide transition-all duration-600"
                style={{
                  opacity: activeSubsection === 2 ? 1 : 0,
                  transform:
                    activeSubsection === 2
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transitionDelay: "300ms",
                }}
              >
                Interaction isn&apos;t a feature. It&apos;s the foundation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
