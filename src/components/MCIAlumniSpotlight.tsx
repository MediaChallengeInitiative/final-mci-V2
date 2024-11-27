"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { BsCamera2, BsCameraReels } from "react-icons/bs";
import { FaMicrophone, FaVideo, FaLightbulb } from "react-icons/fa";
import { PiTelevisionSimpleBold, PiSpeakerHifiBold } from "react-icons/pi";
import { GiFilmProjector } from "react-icons/gi";
import { MdPhotoCameraBack } from "react-icons/md";
import "swiper/css";
import { PortableText } from "@portabletext/react";
// import { PortableText } from "next-sanity";

interface MCIAlumniData {
  name: string;
  currentSlug: string;
  image: any;
  title: string;
  company: string;
  bio: string;
}

const BackgroundObjects = () => (
  <>
    {/* Media Equipment Icons */}
    {[
      { Icon: BsCamera2, top: "10%", left: "5%", size: 30 },
      { Icon: FaMicrophone, top: "20%", right: "10%", size: 25 },
      { Icon: GiFilmProjector, bottom: "15%", left: "15%", size: 40 },
      { Icon: FaLightbulb, top: "30%", left: "50%", size: 25 },
      { Icon: PiTelevisionSimpleBold, bottom: "25%", right: "20%", size: 35 },
      { Icon: BsCameraReels, top: "15%", left: "30%", size: 30 },
      { Icon: FaVideo, bottom: "10%", right: "30%", size: 35 },
      { Icon: MdPhotoCameraBack, top: "40%", right: "15%", size: 30 },
      { Icon: PiSpeakerHifiBold, bottom: "30%", left: "25%", size: 25 }
    ].map(({ Icon, top, left, right, bottom, size }, index) => (
      <motion.div
        key={index}
        className="absolute text-sky-500/10"
        style={{ top, left, right, bottom }}
        animate={{
          y: ["0%", "20%", "0%"],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: index * 0.5
        }}
      >
        <Icon size={size} />
      </motion.div>
    ))}

    {/* Decorative Gradients */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
    </div>
  </>
);

const AlumniSlide: React.FC<{
  alumni: MCIAlumniData;
  onSelect: (alumni: MCIAlumniData) => void;
}> = ({ alumni, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative group cursor-pointer px-4"
    onClick={() => onSelect(alumni)}
  >
    <div className="relative w-48 h-56 mx-auto">
      {/* Border Glow Effect */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 blur-lg opacity-0 
                    group-hover:opacity-50 transition-opacity duration-300"
      />

      {/* Clip Path Container */}
      <div className="relative w-full h-full clip-path-polygon overflow-hidden">
        {/* Main Image Container */}
        <div
          className="relative w-full h-full rounded-xl overflow-hidden border-2 border-white/20 
                     transform group-hover:-translate-y-2 transition-all duration-300"
        >
          <Image
            src={urlFor(alumni.image).url()}
            alt={alumni.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay Gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-blue-500 
                     transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        />
        <div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-500 to-blue-500 
                     transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
        />
      </div>
    </div>

    <div className="mt-4 text-center">
      <h3 className="text-lg font-semibold text-white group-hover:text-sky-500 transition-colors duration-300">
        {alumni.name}
      </h3>
      <p className="text-sm text-gray-400">{alumni.title}</p>
    </div>
  </motion.div>
);

const AlumniDialog: React.FC<{
  alumni: MCIAlumniData | null;
  onClose: () => void;
}> = ({ alumni, onClose }) => (
  <Dialog open={!!alumni} onOpenChange={onClose}>
    <DialogContent
      style={{ borderRadius: "15px" }}
      className="max-w-5xl border-2 border-gray-900 rounded-xl p-0 overflow-hidden"
    >
      <DialogHeader className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative rounded-l-xl min-h-[200px] md:h-[600px]">
            {alumni && (
              <Image
                src={urlFor(alumni.image).url()}
                alt={alumni.name}
                fill
                className="object-cover object-[50%_20%]"
              />
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 bg-white/90 backdrop-blur-sm">
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-4xl font-serif text-gray-800 mb-2 uppercase">
                  MEET {alumni?.name}
                </h2>
                <div className="h-px w-16 bg-yellow-400 mb-4" />
                <p className="text-xl text-gray-600 font-light">
                  {alumni?.title}
                </p>
                <p className="text-gray-500">{alumni?.company}</p>
              </div>

              <div className="mb-6 overflow-auto max-h-[400px]">
                {alumni?.bio && (
                  <div className="prose max-w-none">
                    {Array.isArray(alumni.bio) ||
                    typeof alumni.bio === "object" ? (
                      <PortableText
                        value={alumni.bio}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-gray-600">{children}</p>
                            )
                          },
                          list: {
                            bullet: ({ children }) => (
                              <ul className="list-disc ml-6">{children}</ul>
                            ),
                            number: ({ children }) => (
                              <ol className="list-decimal ml-6">{children}</ol>
                            )
                          }
                        }}
                      />
                    ) : (
                      <p className="text-gray-600">{alumni.bio}</p>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="prose prose-lg text-gray-600 max-w-none flex-grow">
                <p className="font-light leading-relaxed">
                      {alumni?.bio.map((child: any, j: number) => (
                        <span key={j}>{child.text}</span>
                      ))}
                    </p>
              </div> */}

              {/* <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Follow the journey
                  </span>
                  <div className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
                                transition-colors duration-300 cursor-pointer"
                    />
                    <div
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
                                transition-colors duration-300 cursor-pointer"
                    />
                    <div
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
                                transition-colors duration-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

interface AlumniSpotlightProps {
  alumni?: MCIAlumniData[] | null;
}

const MCIAlumniSpotlight: React.FC<AlumniSpotlightProps> = ({
  alumni = []
}) => {
  const [selectedAlumni, setSelectedAlumni] = useState<MCIAlumniData | null>(
    null
  );

  if (!Array.isArray(alumni) || alumni.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-900">
        <p className="text-gray-400">No alumni data available</p>
      </div>
    );
  }

  const duplicatedAlumni = [...alumni, ...alumni, ...alumni];

  return (
    <section className="relative bg-gray-900 py-20 overflow-hidden">
      <BackgroundObjects />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            MCI Alumni Spotlight
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-4 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Meet our extraordinary alumni shaping the future of media
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* First Row - Left to Right */}
          <Swiper
            modules={[Autoplay]}
            slidesPerView={4}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="alumni-slider"
          >
            {duplicatedAlumni.map((person, index) => (
              <SwiperSlide key={`${person.currentSlug}-${index}`}>
                <AlumniSlide alumni={person} onSelect={setSelectedAlumni} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Second Row - Right to Left */}
          <Swiper
            modules={[Autoplay]}
            slidesPerView={4}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="alumni-slider"
          >
            {[...duplicatedAlumni].reverse().map((person, index) => (
              <SwiperSlide key={`${person.currentSlug}-reverse-${index}`}>
                <AlumniSlide alumni={person} onSelect={setSelectedAlumni} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <AlumniDialog
          alumni={selectedAlumni}
          onClose={() => setSelectedAlumni(null)}
        />
      </div>

      <style jsx global>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
        }

        .alumni-slider {
          width: 100%;
          overflow: visible;
          padding: 20px 0;
        }

        .alumni-slider .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default MCIAlumniSpotlight;
