import Image from 'next/image';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
  isEven: boolean;
}

export default function TimelineItem({ year, title, description, image, isEven }: TimelineItemProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Year */}
      <div className={`absolute ${isEven ? '-top-12' : '-bottom-12'} lg:block hidden`}>
        <span className="text-[32px] font-bold text-sky-500 whitespace-nowrap">
          {year}
        </span>
      </div>
      
      {/* Content */}
      <div className={`w-[140px] ${isEven ? 'lg:-mb-20' : 'lg:-mt-20'}`}>
        <div className="rounded-full overflow-hidden w-[140px] h-[140px] relative">
          <Image 
            src={image} 
            alt={title}
            width={140}
            height={140}
            className="object-cover"
          />
        </div>
        <div className="mt-2 text-center px-1">
          <h3 className="text-[11px] font-medium text-orange-500 line-clamp-2">{title}</h3>
          <p className="text-[10px] text-gray-600 mt-1 leading-tight line-clamp-2">{description}</p>
        </div>
      </div>
      
      {/* Timeline node */}
      <div className="absolute top-1/2 -translate-y-1/2">
        <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-md" />
      </div>
    </div>
  );
}