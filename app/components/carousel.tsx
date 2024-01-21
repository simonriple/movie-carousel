import Image from "next/image";
import { PropsWithChildren } from "react";

export const Carousel = ({ children }: PropsWithChildren) => (
  <ul className="flex overflow-x-auto snap-x my-4 scrollbar-hide">
    {children}
  </ul>
);

export const CarouselItem = ({ children }: PropsWithChildren) => (
  <li className="flex-auto snap-start pl-6 pt-6 pb-6 first:pl-8 last:pr-8">
    <div className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
      {children}
    </div>
  </li>
);

export const CarouselImage = ({ src, alt }: { src: string; alt: string }) => (
  <button className="w-[200px] h-[300px] relative">
    <Image className="rounded-lg" src={src} fill alt={alt} />
  </button>
);
