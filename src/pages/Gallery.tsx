import { useState, useEffect } from 'react';
import { FaEye } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import { TiHeartOutline } from "react-icons/ti";
import { IoBookmarkOutline } from "react-icons/io5";

import { Loading } from '../components/Loading';
import { fetchItems, type BaseItem } from '../utils/db';


type GalleryImage = BaseItem & {
  numLikes: number;
  numBookmarks: number;
};


export default function Gallery() {
  const [showImageView, setShowImageView] = useState<boolean>(false);
  
  return (
    <div className="flex flex-row justify-evenly w-full h-[90vh] p-5">
      <Timeline />
      <GalleryImages showImageView={showImageView} setShowImageView={setShowImageView}/>
    </div>
  );
}

function Timeline() {
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

  const year = "2025";

  return (
    <div className="flex flex-col h-full w-1/12 items-center justify-center gap-10">
      <h1 className="leading-none">{year}</h1>
      <div className="relative flex flex-col justify-center items-center h-10/12 w-24">
        <div className="absolute left-1/4 top-0 h-full w-[2px] bg-black" />
        
        {months.map((month, idx) => {
          const topPercent = (idx / (months.length - 1)) * 100;
          return (
            <div
              key={idx}
              className="absolute left-[18%] flex items-center"
              style={{ top: `${topPercent}%`, transform: "translateY(-70%)" }}
            >
              
              <div className="h-4 w-4 bg-[#ccab8f] rounded-full mr-2 hover:scale-105" />
              

              <span className="text-sm text-gray-800">{month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GalleryImages({showImageView, setShowImageView} : {showImageView: boolean, setShowImageView: (b : boolean) => void}) {

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        await fetchItems("gallery", setGalleryImages)
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    }
    fetchGalleryImages();
  }, [])

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>();

  const [hoverIdx, setHoverIdx] = useState<number>(-1);
  const [selectedImage, setSelectedImage] = useState<GalleryImage>();

  function toggle(img: GalleryImage) {
    setShowImageView(true);
    setSelectedImage(img);
  }

  if (!galleryImages || galleryImages.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    )
  }
  

  return (
    <div className="w-11/12 grid grid-cols-4 overflow-y-scroll justify-items-center items-center gap-5 max-w-full p-2">
      {galleryImages?.map((img, idx) => (
        <div key={idx} className="relative w-[320px] h-[256px] overflow-hidden cursor-pointer rounded-lg"
          onMouseEnter={() => setHoverIdx(idx)}
          onMouseLeave={() => setHoverIdx(-1)}
          onClick={() => toggle(img)}
        >
          {hoverIdx == idx && (
            <FaEye className="absolute bottom-0 right-0 m-2 text-white text-2xl" />
          )}
          <img
            src={img.src}
            alt={`orchid-${idx}`}
            className="w-[320px] h-[256px] object-cover"
          />
        </div>
      ))}
      {showImageView && selectedImage && <ImageView img={selectedImage} setShowImageView={setShowImageView}/>}
    </div>
  );
}

function ImageView({setShowImageView, img} : {setShowImageView: (b : boolean) => void, img: GalleryImage}) {
  return (
    <div className="absolute inset-0 bg-black/50 flex justify-center items-center p-10">
      <MdClose className="absolute text-4xl right-0 top-0 m-2 text-white" 
        onClick={() => setShowImageView(false)}
      />
      
      <div className="relative w-3/4 h-full rounded-lg rounded-tr-none z-10">
        <img
          src={img.src}
          alt={`orchid`}
          className="relative w-full h-full object-cover rounded-lg rounded-tr-none z-[999]"
        />
        <div className="absolute right-0 top-0 translate-x-[50px] w-[56px] h-[128px] bg-[#f6fcf4]/80 rounded-lg flex flex-col justify-evenly items-center z-0">
          
            <TiHeartOutline className="text-4xl" />
            <b>{img.numLikes}</b>
      
         
            <IoBookmarkOutline className="text-4xl" />
            <b>{img.numBookmarks}</b>
      
        </div>
      </div>
     

    </div>
  )
}
