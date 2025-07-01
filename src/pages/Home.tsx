import React from 'react';
import ContentCard from '../components/Content.jsx';

export default function Home() {
  return (
    <>
      {/* Section 1: Elegant & Beautiful */}
      <div className="w-full flex flex-col items-center justify-evenly text-opacity-60 font-roboto bg-[#f5f5f3]">
        <div className="self-start text-6xl relative left-[5vw] text-opacity-100 text-[#e3bd9e] mt-7">
          <b>Elegant.</b>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-evenly">
          <img src="/IMG_4777.jpg" alt="Orchids" className="object-cover h-[50vh] w-[25vw] m-10 rounded-3xl shadow-slate-600 shadow-2xl max-w-full" />
          <img src="/IMG_6856.jpg" alt="Orchids" className="object-cover h-[50vh] w-[25vw] m-10 rounded-3xl shadow-slate-600 shadow-2xl max-w-full" />
          <img src="/IMG_6906.jpg" alt="Orchids" className="object-cover h-[50vh] w-[25vw] m-10 rounded-3xl shadow-slate-600 shadow-2xl max-w-full" />
        </div>

        <div className="self-end text-6xl relative right-[5vw] text-opacity-100 text-[#e3bd9e] m-10">
          <b>Beautiful.</b>
        </div>
      </div>

      {/* Section 2: Vibrant & Premium */}
      <div className="w-full flex flex-col items-center justify-evenly text-opacity-60 font-roboto bg-[#e6e6e2]">
        <div className="self-start w-full px-[5vw] mt-7">
          <h1 className="text-6xl text-[#ccac91] mb-6">
            <b>Vibrant.</b>
          </h1>
          <ContentCard
            renderSize="sm"
            renderArgs={{
              text: `We're committed to delivering only the finest quality orchids, ensuring beauty and elegance in every arrangement.`,
              src: "/bg1.jpg",
              orientation: "IT",
              textSize: "text-2xl",
            }}
            direction="row"
          />
        </div>

        <div className="self-end w-full px-[5vw] mt-10 mb-10">
          <h1 className="text-6xl text-[#ccac91] mb-6">
            <b>Premium.</b>
          </h1>
          <ContentCard
            renderSize="sm"
            renderArgs={{
              text: `Our reputation for quality comes from 20 years of crafting custom orchid arrangements that perfectly match each client’s vision.`,
              src: "/bg1.jpg",
              orientation: "TI",
              textSize: "text-2xl"
            }}
            direction="row"
          />
        </div>
      </div>

      {/* Section 3: Just Nature */}
      <div className="flex flex-col items-center justify-start text-opacity-60 font-roboto bg-[#dcdcdc]">
        <div className="w-full px-[5vw] my-10">
          <h1 className="text-6xl text-[#ccac91] mb-6 text-center">
            <b>It's not just nature...</b>
          </h1>
          <ContentCard
            renderSize="sm"
            renderArgs={{
              text: `Carefully selected from Taiwan's lush landscapes, our orchids are vibrant and beautiful, making them a stunning addition to any setting and occasion.`,
              src: "/bg1.jpg",
              orientation: "IT",
              textSize: "text-2xl",
            }}
            direction="row"
          />
        </div>

        <div className="text-6xl my-10 text-opacity-100 text-[#ccac91] text-center">
          <b>it's <i className="text-[#9fdb4b]">Just Nature</i></b>
        </div>
      </div>
    </>
  );
}
