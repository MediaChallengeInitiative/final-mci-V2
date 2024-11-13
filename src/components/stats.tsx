import React from "react";

export default function Stats() {
  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="bg-black">
        <div className="md:flex">
          <div className="md:w-6/12 text-white bg-amber-500 p-8 sm:rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg rounded-tl-lg flex items-center">
            <div>
              <h1 className="text-6xl mb-5 font-bold">
                Our <span className="text-green-500">Cause</span>
              </h1>
              <h2 className="text-lg mb-12">
                We provide crucial support in areas such as food security,
                nutrition, health, water, sanitation, and education. By
                partnering with us, you can help thousands of children access
                the essential services they need to thrive.
              </h2>
              <div className="flex">
                <div className="mr-8">
                  <p className="text-2xl text-green-500 font-bold">5,000+</p>
                  <p className="text-lg pt-2">
                    Served Over
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-6/12 relative">
            <div className="bg-slate-700 w-full h-full opacity-60 absolute sm:rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg" />
            <img
              className="h-full w-full object-cover sm:rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg"
              src="/assets/images/hero/h1.jpg"
              alt="Global Stats Image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
