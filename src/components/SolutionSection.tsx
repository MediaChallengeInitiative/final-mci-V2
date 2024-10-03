import React from "react";

export default function SolutionSection() {
  return (
    <>
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white">
        <div className="container mx-auto px-2 py-2 md:py-3 lg:py-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl capitalize sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              How we solve the challenge
            </h1>
            <p className="text-lg capitalize md:text-2xl lg:text-3xl font-light leading-relaxed">
              Our blueprint of creating a humane and healthy media ecosystem
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
