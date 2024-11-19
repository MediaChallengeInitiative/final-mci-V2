"use client";

import { useEffect, useState } from "react";

interface ModelHeroSectionProps {
  title: string;
  image: any;
}

const ModelHeroSection: React.FC<ModelHeroSectionProps> = ({
  title,
  image
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const [gradient, setGradient] = useState<"sky" | "orange">("sky");
  const [showBadge, setShowBadge] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const badgeTimeout = setTimeout(() => setShowBadge(true), 100);
    const textTimeout = setTimeout(() => setShowText(true), 300);
    const gradientInterval = setInterval(() => {
      setGradient((prev) => (prev === "sky" ? "orange" : "sky"));
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(badgeTimeout);
      clearTimeout(textTimeout);
      clearInterval(gradientInterval);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        style={
          !isMobile
            ? { transform: `translateY(${scrollY * 0.3}px)` }
            : undefined
        }
        className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/90 to-sky-900/70" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated Gradient Accent */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
          gradient === "sky"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15)_0%,transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.15)_0%,transparent_50%)]"
        }`}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto text-center">
          {/* Main Heading with Text Reveal Animation */}
          <div className="mb-8 space-y-4">
            <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              {showText && (
                <div className="text-white block mb-4 transition-transform duration-800 ease-out transform translate-y-0">
                  {title}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelHeroSection;
