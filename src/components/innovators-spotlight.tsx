import Image from "next/image";
import Link from "next/link";
import { IoPlayCircleOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function InnovatorsSpotlight() {
  return (
    <>
      <section className="w-full py-2 md:py-6 lg:py-8 bg-white">
        <div className="w-full lg:px-0 px-4 md:px-6">
          <div className="space-y-6">
            <div className="space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="text-4xl text-center text-[#0097d1] font-bold tracking-tighter lg:text-6xl">
                  Innovators Spotlight
                </h2>
              </div>
              <p className="mx-auto text-center max-w-6xl text-[#0097d1] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#0097d1]">
                Meet the visionaries shaping the future. Their stories inspire
                creativity and push the boundaries of what&apos;s possible.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2 rounded-md border border-[#0097d1] bg-[#0097d1] p-4 shadow-sm dark:border-sky-600 dark:bg-[#0097d1]">
                <div className="flex justify-between items-center gap-1">
                  <div className="flex lg:flex-row flex-col items-center">
                    <Image
                      width={100}
                      height={100}
                      src="/assets/images/innovators/nalaw-logo.png"
                      className="h-32 w-32"
                      alt="innovator"
                    />
                    <div className="grid gap-0.5">
                      <div className="font-medium lg:text-2xl lg:text-gray-200 text-sky-100 text-lg">
                        Nalaw Foundation Limited
                      </div>
                    </div>
                  </div>
                  <div className="lg:flex hidden items-center justify-center">
                    <Link
                      href="#"
                      className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-500 dark:focus:ring-white"
                    >
                      Watch Video
                      <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
                    </Link>
                    <Link
                      href="https://nalaw.org/"
                      target="_blank"
                      className="inline-flex items-center text-white hover:text-white border border-black hover:border-black bg-black focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-[#0097d1] dark:hover:text-white dark:hover:bg-black dark:focus:ring-black"
                    >
                      Visit Website
                      <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex lg:hidden items-center justify-center">
                  <Link
                    href="#"
                    className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-500 dark:focus:ring-orange-800"
                  >
                    Watch Video
                    <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
                  </Link>
                  <Link
                    href="https://nalaw.org/"
                    target="_blank"
                    className="inline-flex items-center text-white hover:text-gray-300 border border-black bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-black"
                  >
                    Visit Website
                    <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
                  </Link>
                </div>
                <p className="text-md text-justify text-gray-300 dark:text-gray-200">
                  NALAW Foundation is a Ugandan non-profit that uses media to
                  address legal issues faced by youth. They fight a lack of
                  legal awareness and misconceptions about the justice system.
                  NALAW empowers youth by teaching them their rights and
                  navigating the legal system. Through media, they explain legal
                  concepts and encourage youth to advocate for themselves. They
                  partner with legal professionals to spread accurate and
                  relevant information. NALAW Foundation is an innovator in
                  using media to empower youth and promote justice.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-4 rounded-md border border-[#0097d1] bg-[#0097d1] p-4 shadow-sm dark:border-sky-600 dark:bg-[#0097d1]">
                <div className="flex lg:justify-between justify-center items-center gap-3">
                  <div className="flex lg:flex-row flex-col items-center">
                    <Image
                      width={100}
                      height={100}
                      src="/assets/images/innovators/debunk-logo.png"
                      className="h-auto w-32"
                      alt="innovator"
                    />
                    <div className="grid gap-0.5">
                      <div className="font-medium lg:text-2xl lg:text-gray-200 text-sky-100 text-lg">
                        Debunk Media Initiative
                      </div>
                    </div>
                  </div>
                  <div className="lg:flex hidden items-center justify-center">
                    <Link
                      href="#"
                      className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-500 dark:focus:ring-white"
                    >
                      Watch Video
                      <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
                    </Link>
                    <Link
                      href="https://debunkinitiative.org/about-us/"
                      target="_blank"
                      className="inline-flex items-center text-white hover:text-white border border-black hover:border-black bg-black focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-[#0097d1] dark:hover:text-white dark:hover:bg-black dark:focus:ring-black"
                    >
                      Visit Website
                      <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex lg:hidden items-center justify-center">
                  <Link
                    href="#"
                    className="inline-flex items-center text-white hover:text-white border border-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-500 dark:focus:ring-orange-800"
                  >
                    Watch Video
                    <IoPlayCircleOutline className="px-2 text-xl w-4 h-4" />
                  </Link>
                  <Link
                    href="https://debunkinitiative.org/about-us/"
                    target="_blank"
                    className="inline-flex items-center text-white hover:text-gray-300 border border-black bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-black"
                  >
                    Visit Website
                    <HiOutlineExternalLink className="px-2 text-xl w-4 h-4" />
                  </Link>
                </div>
                <p className="text-md text-justify text-gray-300 dark:text-gray-200">
                  Debunk Media Initiative is a non-profit media start-up in
                  Kampala Uganda that focuses on media literacy and
                  fact-checking to enable young people to make informed
                  decisions. Our areas of focus range from Democracy, Climate
                  Change, and Health. We believe factual information is a
                  fundamental human right that when done correctly, impacts the
                  lives and decisions of many individuals. We are creating tools
                  like the Debunk Information Verifier to ease the process in
                  news and information verification processes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-1">
          <Link
            href="#"
            className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
          >
            <span className="mr-2 group-hover:text-white rounded-md">SEE ALL</span>
            <svg
              className="w-5 h-5 transform group-hover:text-white group-hover:translate-x-1  transition-transform duration-200 ease-in-out"
              fill="#fff"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
