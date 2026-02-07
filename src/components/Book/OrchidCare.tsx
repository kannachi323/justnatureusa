import { GetImage } from "../../utils/storage";

const orchidVibrant = await GetImage("/handbook/IMG_2577.jpg");

export function OrchidCareOne() {
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

export function OrchidCareTwo() {
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