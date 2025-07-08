import { GetImage } from "../../utils/storage";

const orchidVibrant = await GetImage("/handbook/IMG_2577.jpg");
const orchidCloseUp = await GetImage("/handbook/orchid_closeup.JPG");
const flowerFarm = await GetImage("/handbook/flower_farm.jpeg");

export function WhatWeOfferOne() {
    return (
        <>
             <div className="w-full h-full flex flex-col items-center gap-10 p-5 text-sm">
                <h1 className="text-3xl font-bold text-center">What We Offer</h1>
                <div className="w-full h-1/3 flex items-center">
                    <p className="text-[#685749] leading-relaxed text-center">
                    Welcome to the world of orchids — nature’s exquisite masterpiece. Orchids have captivated hearts for centuries with their elegant forms, vibrant colors, and enchanting fragrances.
                    </p>
                    <img className="h-2/3 object-cover ml-5 rounded-lg" src={orchidCloseUp} alt="Orchid Close Up" />
                </div>
                <div className="w-full h-1/3 flex justify-center items-center">
                    <img className="h-2/3 object-cover mr-5 rounded-lg" src={flowerFarm} alt="flower farm" />
                    <p className="text-[#685749] leading-relaxed text-center">
                    We carefully select and arrange popular orchid types such as the graceful Phalaenopsis and delicate Dendrobium to showcase their natural beauty.
                    </p>
                </div>

                
                

            </div>
            
        </>
    )
}

export function WhatWeOfferTwo() {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-evenly p-5 text-sm">
                <div className="w-full h-1/3 flex justify-center items-center">
                    <img className="h-2/3 object-cover mr-5 rounded-lg" src={orchidVibrant} alt="vibrant orchid" />
                    <p className="text-[#685749] leading-relaxed text-center">
                        Orchids bring timeless elegance to any space, enchanting with their unique shapes and vibrant colors — a true celebration of nature’s artistry.
                    </p>
                </div>
                <div className="w-full h-1/3 flex justify-center items-center">
                    <p className="text-[#685749] leading-relaxed text-center">
                        At Just Nature, we create orchid arrangements for every occasion and space — from charming small bouquets perfect for desks or tabletops to grand, impressive displays that become stunning centerpieces.
                    </p>
                    <img className="h-2/3 object-cover ml-5 rounded-lg" src={orchidVibrant} alt="vibrant orchid" />
                </div>
                <div className="w-full h-1/3 flex justify-center items-center">
                    <img className="h-2/3 object-cover mr-5 rounded-lg" src={orchidVibrant} alt="vibrant orchid" />
                    <p className="text-[#685749] leading-relaxed text-center">
                        Our designs blend creativity with care, using only the freshest orchids to craft elegant, vibrant arrangements that bring life and sophistication wherever they go.
                    </p>
                </div>
            </div>
    
        </>
    )
}