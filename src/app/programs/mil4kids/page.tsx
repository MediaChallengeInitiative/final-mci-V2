"use client";

import {
  Calendar,
  GraduationCap,
  Users,
  BookOpen,
  Radio,
  School
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070"
          alt="Children learning"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            Media and Information Literacy for Children
          </h1>
          <p className="text-xl mb-8">
            Supporting Children Understand, Produce and Consume Media
            Responsibly
          </p>
          <Button size="lg" className="bg-[#0097d1] hover:bg-[#0097d1]/90">
            Learn More
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            About MIL4KIDS
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                Media and information literacy (MIL) enables children to fully
                use many types of media safely, wisely, and responsibly. Our
                program strengthens children&apos;s knowledge, skills and attitude to
                engage with media as young consumers and producers.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-[#0097d1]" />
                  <span>Targeting children aged 9-12 years</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 text-[#0097d1]" />
                  <span>Certified MIL4KIDS Trainers</span>
                </div>
                <div className="flex items-center gap-3">
                  <School className="h-6 w-6 text-[#0097d1]" />
                  <span>Implementation in 15+ schools</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022"
                alt="Children learning media literacy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <BookOpen className="h-12 w-12 text-[#0097d1] mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                MIL4KIDS Curriculum
              </h3>
              <p className="text-gray-600">
                Comprehensive curriculum designed specifically for children to
                understand and navigate media responsibly.
              </p>
            </Card>
            <Card className="p-6">
              <Radio className="h-12 w-12 text-[#0097d1] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Media Production</h3>
              <p className="text-gray-600">
                Hands-on experience with radio and TV production at our
                state-of-the-art MCI Media Hub.
              </p>
            </Card>
            <Card className="p-6">
              <Calendar className="h-12 w-12 text-[#0097d1] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Boot Camps</h3>
              <p className="text-gray-600">
                Intensive weekend training sessions for children and parents to
                learn media literacy together.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Project Timeline
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[
                {
                  date: "September 2021",
                  title: "Training of Trainers",
                  description:
                    "Conducted training for trainers and curriculum testing"
                },
                {
                  date: "October 2021",
                  title: "Curriculum Launch",
                  description:
                    "Launched MIL4KIDS Curriculum with 45+ stakeholders"
                },
                {
                  date: "January - April 2022",
                  title: "MIL Goes to Schools",
                  description: "Implementation in various schools across Uganda"
                },
                {
                  date: "May - August 2022",
                  title: "MIL Goes Rural",
                  description: "Expanding the program to rural areas"
                }
              ].map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="p-6">
                    <p className="text-[#0097d1] font-semibold mb-2">
                      {item.date}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0097d1] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the MIL4KIDS Program</h2>
          <p className="text-lg mb-8">
            Help your children navigate the digital world safely and
            responsibly.
          </p>
          <button className="px-6 py-3 text-lg font-semibold text-sky-500 bg-white rounded-xl shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}

// import React from 'react';
// import { ArrowRight, Calendar, Book, Users, Target, PlayCircle } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// export default function Page(){
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
//       {/* Hero Section */}
//       <header className="bg-blue-600 text-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center flex-col max-w-7xl text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               Media and Information Literacy for Children
//             </h1>
//             <p className="text-xl md:text-2xl mb-8">
//               Supporting Children Understand, Produce and Consume Media Responsibly
//             </p>
//             <button className="bg-white w-[200px] mx-auto text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors">
//               Join MIL4KIDS <ArrowRight size={20} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* About Section */}
//       <section className="py-16 container mx-auto px-4">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold mb-6">What is MIL4KIDS?</h2>
//             <p className="text-gray-600 leading-relaxed">
//               Media and Information Literacy (MIL) for children strengthens children's knowledge,
//               skills and attitude to engage with media as young consumers and producers. Our program
//               helps children aged 9-12 years understand how media works, increase their online safety,
//               and develop critical thinking skills.
//             </p>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Card className="bg-blue-50 border-none">
//               <CardContent className="pt-6">
//                 <Users className="w-8 h-8 text-blue-600 mb-2" />
//                 <h3 className="font-semibold">Peer Learning</h3>
//               </CardContent>
//             </Card>
//             <Card className="bg-green-50 border-none">
//               <CardContent className="pt-6">
//                 <Book className="w-8 h-8 text-green-600 mb-2" />
//                 <h3 className="font-semibold">MIL Curriculum</h3>
//               </CardContent>
//             </Card>
//             <Card className="bg-purple-50 border-none">
//               <CardContent className="pt-6">
//                 <Target className="w-8 h-8 text-purple-600 mb-2" />
//                 <h3 className="font-semibold">Practical Skills</h3>
//               </CardContent>
//             </Card>
//             <Card className="bg-orange-50 border-none">
//               <CardContent className="pt-6">
//                 <PlayCircle className="w-8 h-8 text-orange-600 mb-2" />
//                 <h3 className="font-semibold">Media Creation</h3>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Programs Section */}
//       <section className="bg-gray-50 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-12 text-center">Our Programs</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>MIL4KIDS Desk</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   A coordinating centre for MIL activities at MCI Media Hub, supporting
//                   implementation across schools and organizations.
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>School Clubs</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   MIL4Kids Clubs in schools coordinated by trained MIL4Kids patrons,
//                   engaging students through activities, games, and competitions.
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Boot Camps</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Weekend training programs for children and parents, featuring practical
//                   learning and family bonding activities.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Timeline Section */}
//       <section className="py-16 container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-12 text-center">Program Timeline</h2>
//         <div className="max-w-3xl mx-auto">
//           <div className="space-y-8">
//             {[
//               {
//                 date: "September 2021",
//                 title: "Training of Trainers",
//                 description: "Conducted training for trainers; worked with designed curriculum"
//               },
//               {
//                 date: "October 2021",
//                 title: "Curriculum Launch",
//                 description: "Launched MIL4KIDS Curriculum with DW Akademie"
//               },
//               {
//                 date: "January - April 2022",
//                 title: "MIL Goes to Schools",
//                 description: "Implementation in schools across Uganda"
//               },
//               {
//                 date: "May - August 2022",
//                 title: "MIL Goes Rural",
//                 description: "Expanding to rural communities"
//               }
//             ].map((item, index) => (
//               <div key={index} className="flex gap-4">
//                 <div className="flex flex-col items-center">
//                   <div className="w-8 h-8 bg-blue-600 rounded-full" />
//                   {index !== 3 && <div className="w-0.5 h-full bg-blue-200" />}
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar size={16} className="text-blue-600" />
//                     <span className="text-blue-600 font-medium">{item.date}</span>
//                   </div>
//                   <h3 className="font-semibold mb-1">{item.title}</h3>
//                   <p className="text-gray-600">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="bg-blue-600 text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
//           <p className="mb-8 max-w-2xl mx-auto">
//             Join us in building an empowered generation of media-literate children.
//             Contact us to learn more about our programs or to become a partner.
//           </p>
//           <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-blue-50 transition-colors">
//             Contact Us <ArrowRight size={20} />
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p>© 2024 Media Challenge Initiative. All rights reserved.</p>
//             <div className="flex gap-6 mt-4 md:mt-0">
//               <a href="#" className="hover:text-blue-400">About</a>
//               <a href="#" className="hover:text-blue-400">Programs</a>
//               <a href="#" className="hover:text-blue-400">Contact</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };
