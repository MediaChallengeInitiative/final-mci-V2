import React from "react";
import Image from "next/image";
import { format } from "date-fns";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="px-4 py-6 sm:py-12 lg:py-16">
        <div className="space-y-2 md:space-y-5 pt-12 lg:pt-24 lg:w-[80%] w-[100%] mx-auto pb-4">
          <h1 className="text-white leading-snug font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-xl md:leading-[3.5rem]">
            Media Challenge Initiative CEO Mpindi Abaas Wins Elevate Prize,
            Advocates for Elevating Changemakers
          </h1>
          <figure>
            <Image
              alt="Cover image"
              className="aspect-video overflow-hidden rounded-lg object-cover lg:h-auto h-96"
              height={340}
              src="/assets/images/awards/elevate-prize-2024.png"
              width={1250}
            />
            <figcaption>
              <div className="flex lg:flex-row flex-col items-center text-left justify-between space-x-2">
                <div className="space-y-1 inline-flex items-center justify-between">
                  <p className="text-md text-gray-200 dark:text-gray-100">
                    Posted on :
                  </p>
                  <i className="text-md ml-2 text-sky-500 dark:text-sky-500">
                  April 10, 2024
                  </i>
                </div>
                <div className="space-y-1 inline-flex items-center justify-between">
                  <p className="text-md text-gray-200 dark:text-gray-100">
                    Published by :
                  </p>
                  <i className="text-md ml-2 text-sky-500 dark:text-sky-500">
                    Emmanuel Bahindi
                  </i>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
        <article className="prose prose-gray mx-auto max-w-6xl dark:prose-invert lg:prose-lg">
          <p className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300">
            Our CEO, Mpindi Abaas, has been announced as a winner of the
            prestigious Elevate Prize, recognizing his outstanding contributions
            to empowering the next generation of journalists in Africa. In his
            online acceptance remarks, Abaas emphasized the importance of
            elevating changemakers and social leaders to the same platforms as
            celebrities from other fields.
          </p>
          <blockquote className="text-2md lg:text-lg text-left lg:text-justify italic py-3 text-sky-700">
            &quot;I share this with firm belief that entrepreneurs,
            changemakers, community problem fixers, social leaders, and
            designers of our future deserve to be on the same platforms as other
            superstars like actors and athletes,&quot; said Abaas.
          </blockquote>
          <p className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300">
            His words reflect a powerful sentiment about the need to recognize
            and celebrate individuals who are making a tangible difference in
            their communities and beyond.
          </p>
          <p className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300">
            Abaas and his co-founders, Ivan Kimuli Kigozi, Simon Peter Ssenyondo
            and Antonio Kisembo have been instrumental in providing professional
            journalism and multimedia training to the next generation of
            journalists in Uganda and across Africa since 2012. Under his
            leadership, MCI has become a beacon of hope for young journalists
            seeking to improve their skills and make a positive impact through
            their work.
          </p>
          <p className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300">
            Abaas's commitment to #MakeGoodFamous echoes the mission of the
            Elevate Prize, which seeks to celebrate and support individuals who
            are driving positive change in the world. By advocating for the
            elevation of changemakers, Abaas is not only inspiring the next
            generation of journalists but also encouraging society as a whole to
            prioritize uplifting content that promotes positive social change.
          </p>
          <blockquote className="text-2md lg:text-lg text-left lg:text-justify italic py-3 text-sky-700">
            &quot;We must #MakeGoodFamous in any way we can, so that the next
            generation can find a better world and also have a lot of great and
            uplifting content to consume,&quot; remarked Abaas.
          </blockquote>
          <p className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300">
            His vision underscores the importance of amplifying stories of hope,
            resilience, and progress, particularly in a world where negative
            narratives often dominate the headlines.
          </p>
          <p className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300">
            As Abaas continues to lead MCI in its mission to empower young
            journalists and shape the future of media in Africa, his recognition
            as a winner of the Elevate Prize serves as a testament to the impact
            of his work and the importance of uplifting individuals who are
            dedicated to making a difference in their communities and beyond.
          </p>
        </article>
      </div>
    </>
  );
}
