import Image from "next/image";
import React from "react";

async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Blogs() {
  const blogsData = await getBlogs();
  const blogs = blogsData.data.data;
  console.log(blogs);
  return (
    <>
      {blogsData.data.data.map((blog: any, index: number) => (
        <div
          key={index}
          className="lg:pt-15 pt-12 relative z-1 bg-gradient-to-t to-[#FFF1EC] from-white"
        >
          <div className="container pb-24 mx-auto">
            <div className="mt-10 lg:mt-[50px] first:mt-0 first:lg:mt-0">
              <div className="overflow-hidden">
                <Image
                  className="w-full"
                    src={`http://localhost:1337${blog.attributes.image.data[index].attributes.url}`}
                  width={500}
                  height={500}
                  alt="blog-image"
                />

                {/* <Image src="http://localhost:1337" + blog.attributes.image.data[0].attributes.url, width="500" height="500" /> */}
                {/* {blog.attributes.image.data?.map((item: any, id: number) => {
                  return (
                    <div key={id}>
                      <Image
                        src={`http://localhost:1337/${item.attributes.name}`}
                        width={500}
                        height={500}
                        alt="blog-image"
                      />
                    </div>
                  );
                })} */}
              </div>
              <div className="lg:mt-[34px] mt-6">
                <ul className="flex items-center text-[13px] font-medium text-dark-2">
                  <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">
                    <i className="bi bi-calendar-date text-[15px]" />
                    <span className="ml-2">{blog.attributes.date}</span>
                  </li>
                  {/* <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 ">
                    250 View
                  </li> */}
                </ul>
                <h2 className="text-dark-1 font-medium leading-[1.43] lg:text-2xl md:text-xl text-[28px] mt-[14px]">
                  {blog.attributes.title}
                </h2>
                <p className="regular-text-v1 leading-1.6 mt-[14px]">
                  {blog.attributes.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

