"use client";

import { motion } from "framer-motion";
import { getTheme } from "@/lib/themes";

export function BackgroundEffects({ themeId, style }: { themeId: string, style?: "solid" | "bubbles" | "dots" | "waves" }) {
  if (!style || style === "solid") return null;

  const theme = getTheme(themeId);
  const color = theme.buttonBg === "transparent" ? theme.text : theme.buttonBg;

  if (style === "dots") {
    return (
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(${theme.text} 2px, transparent 2px)`,
          backgroundSize: '32px 32px'
        }}
      />
    );
  }

  if (style === "waves") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10 mix-blend-overlay">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full object-cover">
          <path fill={theme.text} fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,85.3C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill={theme.text} fillOpacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated glowing orbs / bubbles */}
      <motion.div
        className="absolute -left-[20%] top-[5%] h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] rounded-full blur-[80px]"
        style={{ background: color, opacity: 0.35 }}
        animate={{
          x: [0, 40, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute -right-[15%] top-[35%] h-[45vw] w-[45vw] max-h-[400px] max-w-[400px] rounded-full blur-[60px]"
        style={{ background: theme.buttonBorder !== "transparent" ? theme.buttonBorder : theme.text, opacity: 0.2 }}
        animate={{
          x: [0, -30, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div
        className="absolute -bottom-[10%] left-[20%] h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] rounded-full blur-[90px]"
        style={{ background: color, opacity: 0.25 }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Premium Texture Noise Overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-[0.08]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}
