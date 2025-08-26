import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const text = "VOTELY";

  // Reveal letters one by one
  useEffect(() => {
    if (visibleLetters < text.length) {
      const letterTimer = setTimeout(() => {
        setVisibleLetters(visibleLetters + 1);
      }, 200); // delay between letters
      return () => clearTimeout(letterTimer);
    }
  }, [visibleLetters, text.length]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#d6c5a6] relative">

      {/* Import Google Font (like your logo style: Anton) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />

      {/* Website name reveal with fade-in */}
      <h1
        style={{ fontFamily: "'Anton', sans-serif" }}
        className="text-[120px] md:text-[180px] font-extrabold text-black tracking-wider mb-10 flex"
      >
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className={`transition-all duration-700 transform ${
              index < visibleLetters
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {letter}
          </span>
        ))}
      </h1>
      <div className="justify-centre">
        <h1
          style={{ fontFamily: "'Anton', sans-serif" }}
          className="text-[50px] font-extrabold text-gray-400 tracking-tight"
        >
          Click. Vote. Done.
        </h1>
      </div>
    </div>
  );
}
