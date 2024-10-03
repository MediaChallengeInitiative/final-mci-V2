import React from "react";
import Image from "next/image";
import { StaffData } from "@/interface/interface";
import { getSingleStaff } from "@/utils/get-single-staff";
import { urlFor } from "@/lib/sanity";

export default async function Page({ params }: { params: { slug: string } }) {
  const staff: StaffData = await getSingleStaff(params.slug);
  return (
    <>
      {/* <section className="w-full py-12 md:py-24 lg:py-32 lg:mt-auto mt-3">
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="group relative overflow-hidden rounded-xl lg:h-auto h-96">
              <img
                alt="Featured blog post"
                className="h-full w-full object-cover object-top transition-all duration-300 group-hover:scale-105"
                height="400"
                src="/assets/images/team/team-5.jpg"
                style={{
                  aspectRatio: "800/400",
                  objectFit: "cover"
                }}
                width="800"
              />
            </div>
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="group relative overflow-hidden rounded-xl">
                  <div className="flex h-full flex-col justify-end">
                    <div className="space-y-2">
                      <div className="inline-block rounded-lg py-1 text-md lg:text-2xl w-full text-gray-50">
                        EMMANUEL BAHINDI
                      </div>
                      <h2 className="text-lg italic font-bold tracking-tight lg:text-left sm:text-left text-center text-sky-800 md:text-3xl lg:text-xl lg:pb-4">
                        Multimedia Web Developer
                      </h2>
                      <p className="text-gray-200 text-2md text-justify">
                        Emmanuel Bahindi is a skilled Multimedia Web Developer
                        at the Media Challenge Initiative, bringing a blend of
                        technical expertise and interpersonal communication
                        skills to the table. With a passion for creating
                        engaging and user-friendly web experiences, Emmanuel is
                        proficient in a range of programming languages and
                        frameworks including Next.js, React, JavaScript, HTML &
                        CSS, Bootstrap, and Tailwind CSS.
                      </p>
                      <p className="text-gray-200 text-2md text-justify">
                        Emmanuel's ability to effectively communicate and
                        collaborate with teams and clients ensures that projects
                        are not only technically sound but also aligned with
                        stakeholder expectations. Whether it's developing
                        responsive and intuitive user interfaces or optimizing
                        website performance, Emmanuel's dedication to excellence
                        shines through in every aspect of his work.
                      </p>
                      <p className="text-gray-200 text-2md text-justify">
                        Outside of work, Emmanuel enjoys staying updated with
                        the latest trends and advancements in web development,
                        constantly refining his skills and exploring innovative
                        ways to enhance digital experiences. With a strong
                        foundation in multimedia web development and a
                        commitment to continuous learning, Emmanuel Bahindi is
                        poised to make significant contributions to the field
                        and drive impactful projects forward.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="relative  h-[400px] sm:h-[600px] lg:h-[700px]">
        <img
          alt="Cover Image"
          className="h-full w-full object-cover"
          height="300"
          src={urlFor(staff.image).url()}
          style={{
            aspectRatio: "1200/500",
            objectFit: "cover",
            objectPosition: "50% 20%"
          }}
          width="300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent lg:p-6 p-3">
          <div className="flex items-end lg:gap-4 gap-2">
            <div className="flex items-center justify-center h-20 w-20 rounded-full ring-2 ring-sky-500 bg-black">
              <span className="lg:text-3xl text-xl text-sky-500">
                {staff?.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </span>
            </div>
            <div>
              <h1 className="lg:text-2xl text-lg font-bold lg:text-gray-200 text-white">
                {staff?.name}
              </h1>
              <p className="text-md pt-3 italic text-gray-300">
                {staff?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <p className="lg:text-lg text-2md leading-loose text-gray-400 dark:text-gray-300 lg:text-justify">
            {staff?.bio?.map((paragraph: any, index: number) => (
              <span key={index}>{paragraph.children[0].text}</span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
