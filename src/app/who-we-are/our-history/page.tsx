import Breadcrumb from "@/components/breadcrumb";
import OurHistory from "@/components/our-history";
import Subscribe from "@/components/subscribe";
import React from "react";

export default function Page() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 lg:mt-0 mt-4">
        <Breadcrumb title={"Our History"} />
        <OurHistory />
        <div className="w-full grid h-full lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 px-4 md:px-6 lg:mt-2 mt-0">
          <div className="group relative overflow-hidden rounded-xl lg:mb-0 mb-6">
            <img
              alt="Recent blog post"
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
              height="200"
              src="/assets/images/blog/blog-1.jpg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover"
              }}
              width="300"
            />
          </div>
          <div className="lg:px-2 px-0 text-justify">
            <p className="lg:text-lg lg:leading-8 text-gray-400 text-2md">
              The Media Challenge Initiative (MCI) is a not-for-profit
              organization building the next generation of journalists,
              storytellers, and leaders in Uganda and Africa who are equipped to
              create change in their communities using media; and runs the MCI
              Media Hub, a media entrepreneurship incubation center in Kampala.
            </p>
            <p className="mt-6 lg:text-lg lg:leading-8 text-gray-400 text-2md">
              Since 2012, MCI has worked with journalism students and
              early-career journalists in Uganda, providing practical journalism
              skills training and recruitment opportunities in the media
              industry. This has been made possible through MCI’s flagship Next
              Gen Journalist program that nurtures young journalists as leaders
              and promotes solutions-based journalism for social change. MCI has
              trained 3,000+ students from over 15 universities through various
              training programs, including 103 young journalists from the Media
              Challenge Fellowship Program for the past six years. Many of these
              fellows have been employed in media houses across Africa, while
              others have created media organizations covering under-reported
              stories about Africa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
