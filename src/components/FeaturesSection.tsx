import React, { useRef, useState } from "react";
import {
  Video as VideoIcon,
  Users,
  Sparkles,
  MonitorPlay,
  Building2,
  Lightbulb,
  GraduationCap,
  Globe
} from "lucide-react";
import type { FeatureCardProps } from "@/interface/features";

interface CardSpotlight {
  x: number;
  y: number;
  opacity: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  benefits = [],
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<CardSpotlight>({
    x: 0,
    y: 0,
    opacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlight({ x, y, opacity: 1 });
    }
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-gray-900 backdrop-blur-sm rounded-2xl p-8 flex flex-col h-full 
                 hover:shadow-xl transition-all duration-500 ease-out"
    >
      {/* Animated border gradient effect */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 
                    opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"
      />

      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, 
            rgba(255,255,255,0.1), 
            transparent 40%)`,
          opacity: spotlight.opacity
        }}
      />

      {/* Large Icon Background */}
      <div
        className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5 transition-all duration-700 
                    group-hover:scale-150 group-hover:opacity-10 group-hover:rotate-12"
      >
        <div className="w-64 h-64">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-full h-full text-sky-400"
          })}
        </div>
      </div>

      {/* Main Icon */}
      <div className="relative mb-6">
        <div
          className="w-16 h-16 transform transition-all duration-500 
                     group-hover:scale-110 group-hover:-rotate-3"
        >
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-full h-full text-sky-400 group-hover:text-sky-300"
          })}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3
          className="text-2xl font-light text-gray-200 group-hover:text-sky-400 
                     transition-colors duration-300"
        >
          {title}
        </h3>

        <p
          className="text-gray-400 group-hover:text-gray-300 
                   transition-all duration-300 text-sm leading-relaxed"
        >
          {description}
        </p>

        {/* Benefits List */}
        {benefits.length > 0 && (
          <ul className="space-y-3 pt-4">
            {benefits.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 group/item 
                           transition-all duration-300 hover:translate-x-1"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full 
                             bg-sky-500 group-hover:bg-sky-400
                             transition-colors duration-300"
                />
                <span
                  className="text-gray-400 group-hover/item:text-gray-200
                             transition-colors duration-300 text-sm"
                >
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 
                   bg-gradient-to-br from-sky-900/20 to-transparent 
                   rounded-tl-full opacity-0 group-hover:opacity-100 
                   transition-all duration-500 -z-10"
      />
    </div>
  );
};

export const FeaturesSection: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <Building2 />,
      title: "Office Space & Infrastructure",
      description:
        "Dedicated workspace in our collaborative media hub environment.",
      benefits: [
        "Fully equipped office space",
        "High-speed internet connectivity",
        "Meeting and collaboration areas",
        "24/7 access to facilities"
      ],
      index: 0
    },
    {
      icon: <MonitorPlay />,
      title: "Media Production Support",
      description:
        "Access to professional media production facilities and equipment.",
      benefits: [
        "Professional studio access",
        "Video production equipment",
        "Audio recording facilities",
        "Post-production support"
      ],
      index: 1
    },
    {
      icon: <GraduationCap />,
      title: "Training & Mentorship",
      description:
        "Comprehensive training and professional development programs.",
      benefits: [
        "Expert-led workshops",
        "One-on-one mentorship",
        "Skills development sessions",
        "Industry networking events"
      ],
      index: 2
    },
    {
      icon: <Lightbulb />,
      title: "Incubation Support",
      description:
        "Tailored support to help your media innovation grow and succeed.",
      benefits: [
        "Business development guidance",
        "Strategic planning support",
        "Funding opportunity access",
        "Market research assistance"
      ],
      index: 3
    },
    {
      icon: <VideoIcon />,
      title: "Content Production",
      description: "Professional content creation and production services.",
      benefits: [
        "Documentary production",
        "Social media content creation",
        "Live event streaming",
        "Multimedia storytelling"
      ],
      index: 4
    },
    {
      icon: <Globe />,
      title: "Network & Partnerships",
      description: "Connect with industry leaders and potential collaborators.",
      benefits: [
        "Industry events access",
        "Partnership opportunities",
        "Community engagement",
        "Media exposure"
      ],
      index: 5
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gray-50">
      {/* Enhanced Background Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#4b5563_1px,transparent_1px),linear-gradient(to_bottom,#4b5563_1px,transparent_1px)] 
                    bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] 
                    opacity-[0.03]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6
                       bg-blue-50 rounded-full"
          >
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">
              Innovation Support
            </span>
          </div>
          <h2
            className="text-5xl font-bold text-gray-900 mb-6 
                       tracking-tight leading-tight"
          >
            Empowering Media Innovators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our collaborative space and access comprehensive support to
            accelerate your media innovation journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
