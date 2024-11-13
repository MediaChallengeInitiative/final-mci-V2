import TimelineItem from "./TimelineItem";
import TimelineArrow from "./TimelineArrow";

const timelineData = [
  {
    year: "2012",
    title: "The Media Challenge Begins",
    description:
      "The first ever inter-university news anchoring and reporting competition in Uganda",
    image:
      "https://images.unsplash.com/photo-1557758478-51f7e76eaed9?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2016",
    title: "Launched Media Challenge Initiative + Academy",
    description: "To skill young journalists",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2018",
    title: "Fellowship Program",
    description:
      "A fellowship program skilling market ready graduates passionate about solutions and narrative change",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2020",
    title: "Media Hub",
    description:
      "A media incubator hub amplifying media innovation and building media capacity for viability",
    image:
      "https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2023",
    title: "MCI SDGs Media Van",
    description:
      "Taking journalism to hard to reach communities to promote local journalism and fix",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "2024",
    title: "Africa...",
    description: "",
    image:
      "https://images.unsplash.com/photo-1516838773544-987a2e35a3cf?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Timeline() {
  return (
    <div className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-orange-500 
                         md:w-0.5 md:h-full md:top-0 md:left-1/2 md:-translate-x-1/2"
          />

          {/* Timeline items */}
          <div
            className="flex flex-row justify-between items-center relative
                         md:flex-col md:items-center md:space-y-12 lg:space-y-0"
          >
            {timelineData.map((item, index) => (
              <div key={item.year} className="flex items-center">
                <TimelineItem
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  isEven={index % 2 === 0}
                />
                {index < timelineData.length - 1 && <TimelineArrow />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
