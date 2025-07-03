
export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <img
          src={'/2.jpeg'}
          alt={`orchid`}
          className="w-screen h-[60vh] object-cover"
        />
      </div>

      <div className="relative w-full bg-[#f8f8f3] flex flex-row justify-center items-center p-5">
        
        <div className="h-full w-1/2 flex justify-center items-center bg-red-50">
          <b className="text-[#e3bc9e] text-7xl">Elegant.</b>
        </div>
        
        <div className="w-1/2 h-full flex justify-center items-center">
          <img
            src={'/2.jpeg'}
            alt={`orchid`}
            className="w-3/4 object-cover rounded-lg"
          />
        
        </div>

      </div>

      <div className="relative w-full bg-[#f8f8f3] flex flex-row justify-center items-center p-5">
        <div className="w-1/2 h-full flex justify-center items-center">
          <img
            src={'/2.jpeg'}
            alt={`orchid`}
            className="w-3/4 object-cover rounded-lg"
          />
        
        </div>
        <div className="h-full w-1/2 flex justify-center items-center">
          <b className="text-[#e3bc9e] text-7xl">Beautiful.</b>
        </div>
      </div>

      <div className="relative w-full bg-[#e6e7e2] flex flex-col justify-center items-center p-5">
        <div className="w-full flex items-center p-5">
         <b className="text-7xl translate-x-20">Vibrant.</b> 
        </div>
        <div className="w-full flex items-center justify-evenly">
          <img
            src={'/flower_farm.jpeg'}
            alt={`orchid`}
            className="w-1/3 object-cover rounded-lg"
          />
          <p className="w-1/4 text-center text-2xl leading-relaxed">We're committed to delivering only the finest quality orchids, ensuring beauty and elegance in every arrangement.</p>
        </div>


      </div>


      <div className="relative w-full bg-[#e6e7e2] flex flex-col justify-center items-center p-5">
        <div className="w-full flex justify-end items-center p-5">
         <b className="text-7xl -translate-x-20">Premium.</b> 
        </div>
        <div className="w-full flex items-center justify-evenly">
          <p className="w-1/4 text-center text-2xl leading-relaxed">Our reputation for quality comes from 20 years of crafting custom orchid arrangements that perfectly match each customer's vision.</p>
          <img
            src={'/flower_farm.jpeg'}
            alt={`orchid`}
            className="w-1/3 object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="realtive w-full bg-[#f8f8f3] flex flex-col justify-center items-center p-5">
        <div className="w-full flex justify-center items-center p-5">
         <b className="text-7xl">It's not just nature...</b> 
        </div>
        <div className="w-full flex justify-center items-center p-5 gap-10">
          <img
            src={'/flower_farm.jpeg'}
            alt={`orchid`}
            className="w-1/3 object-cover rounded-lg"
          />
          <p className="w-1/4 text-center text-2xl leading-relaxed">Carefully selected from Taiwan's lush landscapes, our orchids are vibrant and beautiful, making them a stunning addition to any setting and occasion.</p>
        </div>
        <div className="w-full flex justify-center items-center p-5">
         <b className="text-7xl">it's <b className="text-[#a3d94b]">Just Nature</b></b> 
        </div>
      </div>
      


      
    </>
  )


}