import { useEffect, useState } from "react";

import { fetchItemsV2 } from "../utils/db";

type HomeImage = {
  src: string;
  id: number;
  [key: string]: unknown;
}

export default function Home() {
  const [homeImages, setHomeImages] = useState<HomeImage[]>();
  const [imageIdx, setImageIdx] = useState<number>(0);

  useEffect(() => {
    fetchItemsV2('home', setHomeImages)
  }, []);

  useEffect(() => {
    if (!homeImages || homeImages.length === 0) return;

    const interval = setInterval(() => {
      setImageIdx((prevIdx) =>
        prevIdx === homeImages.length - 1 ? 0 : prevIdx + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [homeImages]);

  if (!homeImages || homeImages.length === 0) {
    return <div className="h-screen flex bg-white"></div>
  }

  return (
    <div className="w-full min-h-full box-border overflow-x-hidden">
      {/* Hero image */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {homeImages.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={`Slide ${idx}`}
            className={`
              absolute top-0 left-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out
              ${imageIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
            style={{ objectPosition: "10% 20%" }}
          />
        ))}

        <div className="absolute flex justify-evenly left-1/2 bottom-0 -translate-x-1/2 mb-2 w-[128px] z-20">
          {homeImages.map((_, idx) => (
            <div
              key={idx}
              className={`
                w-[12px] h-[12px] rounded-full transition-colors duration-500
                ${imageIdx === idx ? 'bg-[#4e3d2f]' : 'bg-[#987c61]'}
              `}
            />
          ))}
        </div>
      </div>

      {/* Elegant Section */}
      <div className="relative w-full bg-[#f8f8f3] flex flex-row flex-wrap justify-center items-center p-5 box-border">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-red-50 p-5">
          <b className="text-[#e3bc9e] text-7xl text-center">Elegant.</b>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-5">
          <img
            src={'/2.jpeg'}
            alt="orchid"
            className="w-3/4 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Beautiful Section */}
      <div className="relative w-full bg-[#f8f8f3] flex flex-row flex-wrap justify-center items-center p-5 box-border">
        <div className="w-full md:w-1/2 flex justify-center items-center p-5">
          <img
            src={'/2.jpeg'}
            alt="orchid"
            className="w-3/4 object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-5">
          <b className="text-[#e3bc9e] text-7xl text-center">Beautiful.</b>
        </div>
      </div>

      {/* Vibrant Section */}
      <div className="relative w-full bg-[#e6e7e2] flex flex-col justify-center items-center p-5 box-border">
        <div className="w-full flex justify-center items-center p-5">
          <b className="text-7xl text-center">Vibrant.</b>
        </div>
        <div className="w-full flex flex-wrap justify-evenly items-center p-5 gap-5">
          <img
            src={'/flower_farm.jpeg'}
            alt="orchid"
            className="w-1/3 min-w-[200px] object-cover rounded-lg"
          />
          <p className="w-1/4 min-w-[200px] text-center text-2xl leading-relaxed">
            We're committed to delivering only the finest quality orchids,
            ensuring beauty and elegance in every arrangement.
          </p>
        </div>
      </div>

      {/* Premium Section */}
      <div className="relative w-full bg-[#e6e7e2] flex flex-col justify-center items-center p-5 box-border">
        <div className="w-full flex justify-center items-center p-5">
          <b className="text-7xl text-center">Premium.</b>
        </div>
        <div className="w-full flex flex-wrap justify-evenly items-center p-5 gap-5">
          <p className="w-1/4 min-w-[200px] text-center text-2xl leading-relaxed">
            Our reputation for quality comes from 20 years of crafting custom
            orchid arrangements that perfectly match each customer's vision.
          </p>
          <img
            src={'/flower_farm.jpeg'}
            alt="orchid"
            className="w-1/3 min-w-[200px] object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Closing Section */}
      <div className="relative w-full bg-[#f8f8f3] flex flex-col justify-center items-center p-5 box-border">
        <div className="w-full flex justify-center items-center p-5">
          <b className="text-7xl text-center">It's not just nature...</b>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center p-5 gap-10">
          <img
            src={'/flower_farm.jpeg'}
            alt="orchid"
            className="w-1/3 min-w-[200px] object-cover rounded-lg"
          />
          <p className="w-1/4 min-w-[200px] text-center text-2xl leading-relaxed">
            Carefully selected from Taiwan's lush landscapes, our orchids are
            vibrant and beautiful, making them a stunning addition to any
            setting and occasion.
          </p>
        </div>
        <div className="w-full flex justify-center items-center p-5">
          <b className="text-7xl text-center">
            it's <span className="text-[#a3d94b]">Just Nature</span>
          </b>
        </div>
      </div>
    </div>
  );
}
