import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaXTwitter, FaDiscord, FaRedditAlien } from "react-icons/fa6";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Animate parallax movement, scale, and fade
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <footer
      ref={ref}
      className="relative w-full h-[70vh] overflow-hidden 
             bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400"
    >
      {/* TOP Black Bar */}
      <div className="absolute top-0 z-20 w-full bg-black text-white px-6 py-3 flex items-center justify-between rounded-b-[24px]">
        {/* Left */}
        <p className="text-sm text-gray-300">©2025 Votely. All rights reserved.</p>

        {/* Right */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-1 text-sm text-gray-300 border border-gray-300 rounded-full px-8 py-3 hover:text-white"
        >
          Back to top <ArrowUp size={16} />
        </a>

      </div>

      {/* Animated Parallax VOTELY Logo */}
      <motion.h1
        style={{ y, scale, opacity }}
        initial={{ opacity: 0, y: 200, scale: 3.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 flex justify-center items-center 
                    tracking-tight select-none"
      >
        <img src="/footer.png" alt="VOTELY Logo" className="w-[800px]" />
      </motion.h1>

      {/* Social Icons at Bottom Center */}
      <div className="absolute bottom-0 z-20 w-full flex justify-center gap-6 text-lg text-white pb-4">
        <p>Made By Group 7 IT-5E Students</p>
      </div>
    </footer>
  );
}
