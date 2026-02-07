import { useEffect, useState, type RefObject } from "react";
import { GetImage } from "../../utils/storage"
import { type HTMLFlipBookRef } from "./helper";


interface TableOfContentsProps {    
  handlePageFlip: (pgNum: number, book: RefObject<HTMLFlipBookRef | null>) => void;
  book: RefObject<HTMLFlipBookRef | null>;
}

export function TableOfContents({handlePageFlip, book}: TableOfContentsProps) {
    return (
        <> 
            <div className="w-full h-full flex flex-col items-center p-5">
                <h1 className="text-5xl font-bold h-1/3 w-full text-center">Table of Contents</h1>
                <div className="text-lg text-[#685749] h-1/3 w-full text-center flex flex-col justify-center space-y-10">
                <button className="hover:underline cursor-pointer" onClick={() => handlePageFlip(3, book)}>1. What We Offer</button>
                <button className="hover:underline cursor-pointer" onClick={() => handlePageFlip(6, book)}>2. How to Take Care of Orchids</button>
                <button>3. Frequently Asked Questions</button>
                </div>
            </div>
    
        </>
    )
}

export function OrchidDefinition() {
  const [orchidDef, setOrchidDef] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchImages = async () => {
      const res = await GetImage("/handbook/orchid_def.jpg");
      setOrchidDef(res || "");
    }

    if (!orchidDef) {
      console.log("Fetching orchid definition image...");
      fetchImages();
    }
   
  }, [orchidDef]);



  if (!orchidDef) {
    return undefined;
  }


  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center p-5">
        <img className="h-[90%] object-cover" src={orchidDef} alt="orchid def" />
        <b className="text-xs">Photo creds: <a className="underline" href={'https://in.pinterest.com/pin/377598750028111220/'}>https://in.pinterest.com/pin/377598750028111220/</a></b>
      </div>
    </>
  )
}


        
        
             
      