import React from "react";
import Image from "next/image";

export default function Gallery() {
  return (
    <>
      <div className="md:flex">
        <div className="lg:w-1/2 md:w-1/2 p-1">
          <div className="group relative overflow-hidden">
            <Image
              width={300}
              height={300}
              src="/assets/images/gallery/g1.jpg"
              alt="placeholder"
              className="w-full"
            />
            <a
              href="/assets/images/gallery/g1.jpg"
              data-fancybox="details"
              className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-300 hover:opacity-100 justify-center items-center"
            >
              <div className="h-11 w-11 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                <i className="bi bi-camera" />
              </div>
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 md:w-1/2">
          <div className="flex">
            <div className="w-1/2 p-1">
              <div className="group relative overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src="/assets/images/gallery/g2.jpg"
                  alt="placeholder"
                  className="w-full h-[260px] object-cover"
                />
                <a
                  href="/assets/images/gallery/g2.jpg"
                  data-fancybox="details"
                  className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-300 hover:opacity-100 justify-center items-center"
                >
                  <div className="h-11 w-11 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                    <i className="bi bi-camera" />
                  </div>
                </a>
              </div>
            </div>
            <div className="w-1/2 p-1">
              <div className="group relative overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src="/assets/images/gallery/g3.jpg"
                  alt="placeholder"
                  className="w-full h-[260px] object-cover"
                />
                <a
                  href="/assets/images/gallery/g3.jpg"
                  data-fancybox="details"
                  className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-300 hover:opacity-100 justify-center items-center"
                >
                  <div className="h-11 w-11 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                    <i className="bi bi-camera" />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 p-1">
              <div className="group relative overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src="/assets/images/gallery/g4.jpg"
                  alt="placeholder"
                  className="w-full h-[260px] object-cover"
                />
                <a
                  href="/assets/images/gallery/g4.jpg"
                  data-fancybox="details"
                  className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-300 hover:opacity-100 justify-center items-center"
                >
                  <div className="h-11 w-11 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                    <i className="bi bi-camera" />
                  </div>
                </a>
              </div>
            </div>
            <div className="w-1/2 p-1">
              <div className="group relative overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src="/assets/images/gallery/g1.jpg"
                  alt="placeholder"
                  className="w-full h-[260px] object-cover"
                />
                <a
                  href="/assets/images/gallery/g1.jpg"
                  data-fancybox="details"
                  className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-300 hover:opacity-100 justify-center items-center"
                >
                  <div className="h-11 w-11 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                    <i className="bi bi-camera" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
