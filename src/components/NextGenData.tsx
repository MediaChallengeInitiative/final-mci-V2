import React from "react";
import { NextGenCycle } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

const NextGenData: React.FC<NextGenCycle> = ({ stage, image, description }) => {
  return (
    <>
      {/* <div className="h-[100vh] bg-blue-800 w-[100vw] flex justify-center items-center flex-col px-16">
        <h3 className="text-gray-200 font-bold py-6 text-center leading-snug text-7xl font-sans-serif uppercase">
          {stage}
        </h3>
        <div className="space-y-6 bg-transparent">
          <div className="grid gap-0">
            <div className="flex flex-col justify-center items-center">
              <div className="max-w-3xl p-2 mb-10">
                <h2 className="text-white text-2md leading-snug text-center">
                  {description}
                </h2>
              </div>
              <div className="w-[500px] h-[500px] rounded-xl">
                <Image
                  className="block w-full rounded-xl"
                  src={urlFor(image).url()}
                  width={200}
                  height={200}
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div>
        <div className="card relative">
          <h3 className="absolute top-0 text-gray-200 font-bold py-1 text-center leading-snug text-2xl font-sans-serif uppercase">
            {stage}
          </h3>
          <h2 className="text-white text-xl pb-3 leading-snug text-center">
            {description}
          </h2>
          <div className="flex justify-center w-full h-full">
            <Image
              className="w-full rounded-3xl"
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NextGenData;
