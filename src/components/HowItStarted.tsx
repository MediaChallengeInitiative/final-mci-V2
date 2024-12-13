import React from "react";
import Image from "next/image";

export default function HowItStarted() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-500">
            How it started
          </h2>
          <Image
            width={700}
            height={400}
            src="/assets/images/projects/p1.jpg"
            alt="Image"
            className="aspect-video w-full overflow-hidden rounded-xl object-cover"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-orange-500">
            Our story
          </h3>
          <p className="text-gray-200 md:text-xl/relaxed">
            <span className="text-orange-500 pr-2">Issue:</span> In 2012, our
            co-founder was denied an internship at a television station because
            he &quot;didn&apos;t know anyone&quot; there.
          </p>
          <p className="text-gray-200 md:text-xl/relaxed">
            <span className="text-orange-500 pr-2">Response:</span> Tired by the
            present quo, he organized a group of journalism students to change
            it. The motivating idea holds that every young journalist,
            regardless of background, deserves an internship and an employment
            opportunity. No amount of nepotism should prevent that. Rather than
            &quot;technical-know-who,&quot; the industry must embrace
            &quot;technical-know-how&quot; as a recruitment and internship
            program.
          </p>
          <p className="text-gray-200 md:text-xl/relaxed">
            <span className="text-orange-500 pr-2">The Creative Fix:</span> an
            annual inter-university media challenge, similar to America Got
            Talent, except for journalism students as contestants and
            editors/managers as judges.
          </p>
        </div>
      </div>
    </section>
  );
}
