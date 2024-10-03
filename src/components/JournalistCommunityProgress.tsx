import Image from "next/image";

const JournalistCommunityProgress = () => {
  return (
    <section className="bg-white pt-3 lg:pt-0">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* How it started */}
          <div>
            <h2 className="text-3xl px-2 font-bold text-sky-500 mb-4">
              How it started
            </h2>
            <div className="relative h-64 md:h-80 mb-4">
              <Image
                style={{ objectPosition: "50% 15%" }}
                src="/assets/images/history/history.png"
                alt="How it started"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-2xl px-2 font-semibold text-orange-400 mb-2">
              Our story
            </h3>
            <div className="space-y-4 text-sm px-2">
              <p>
                <span className="font-semibold">Issue:</span> In 2012, our
                co-founder was denied an internship at a television station
                because he "didn't know anyone" there.
              </p>
              <p>
                <span className="font-semibold">Response:</span> Tired by the
                present quo, he organized a group of journalism students to
                change it. The motivating idea holds that every young
                journalist, regardless of background, deserves an internship and
                an employment opportunity. No amount of nepotism should prevent
                that. Rather than "technical-know-who," the industry must
                embrace "technical-know-how" as a recruitment and internship
                program.
              </p>
              <p>
                <span className="font-semibold">The Creative Fix:</span> an
                annual inter-university media challenge, similar to America Got
                Talent, except for journalism students as contestants and
                editors/managers as judges.
              </p>
            </div>
          </div>

          {/* How it is going */}
          <div>
            <h2 className="text-3xl font-bold text-sky-500 mb-4">
              How it is going
            </h2>
            <div className="relative h-[500px] md:h-[600px]">
              <Image
                src="/assets/images/community/community.png"
                alt="How it is going"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl lg:text-4xl font-bold text-center px-4">
                  A Community of young journalists using journalism to make the
                  world a better place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalistCommunityProgress;
