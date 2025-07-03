export default function Home() {
  return (
    <div className="w-full box-border overflow-x-hidden">
      {/* Hero image */}
      <div className="relative w-full">
        <img
          src={'/2.jpeg'}
          alt="orchid"
          className="w-full h-[60vh] object-cover"
        />
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
