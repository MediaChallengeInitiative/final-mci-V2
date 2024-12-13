import React from "react";
import Image from "next/image";

export default function AlumniWorkLogos() {
  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto">
        <Image
          src="/assets/images/where-alumni-work.png"
          alt="Where Media Challenge Fellowship Alumni Work - Class of 2024"
          width={800}
          height={500}
          priority
          className="w-full h-auto"
          sizes="(min-width: 1280px) 1200px, (min-width: 768px) 800px, 100vw"
          quality={90}
        />
      </div>
    </section>
  );
}

// import React from "react";
// import Image from "next/image";

// export default function AlumniWorkLogos() {
//   return (
//     <>
//       <div className="w-full bg-white">
//         <Image
//           width={800}
//           height={500}
//           className="w-full h-auto block"
//           src="/assets/images/where-alumni-work.png"
//           alt="Media Challenge Fellowship 2024"
//         />
//       </div>
//     </>
//   );
// }
