import { useState, useEffect } from 'react';
import { FaEye } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link } from 'react-router';

import { Loading } from '../components/Loading';
import { fetchItems, type BaseItem } from '../utils/db';
import { useAuth } from '../hooks/useAuth';
import { hasUserLiked, toggleLike } from '../utils/likes';
import ListPickerPopup from '../components/ListPickerPopup';


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
  const [showTip, setShowTip] = useState<boolean>(true);

  function toggle(img: GalleryImage) {
    if (showTip) {
        setShowTip(false);
    }
    setShowImageView(true);
    setSelectedImage(img);
  }

  function handleLikeToggle(docId: string, delta: number) {
    setGalleryImages((prev) =>
      prev?.map((img) =>
        img.docId === docId ? { ...img, numLikes: img.numLikes + delta } : img
      )
    );
    if (selectedImage && selectedImage.docId === docId) {
      setSelectedImage((prev) =>
        prev ? { ...prev, numLikes: prev.numLikes + delta } : prev
      );
    }
  }

  if (!galleryImages || galleryImages.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    )
  }


  return (
    <div className="w-11/12 relative">
      {showTip && (
        <div className="absolute top-[-35px] right-1/2 translate-x-1/2 bg-[#4a3f35]/90 text-white text-xs rounded-md px-3 py-2 z-20 flex items-center gap-2 shadow-md">
          <TiHeartOutline className="text-base" />
          <IoBookmarkOutline className="text-base" />
          <span className="text-[16px]" >Click any image to like or save!</span>
          <button onClick={() => setShowTip(false)} className="ml-1 text-white/60 hover:text-white text-sm cursor-pointer">
            <MdClose size={16}/>
          </button>
        </div>
      )}
    <div className="w-full h-full grid grid-cols-4 overflow-y-scroll justify-items-center items-start gap-5 max-w-full p-2 content-start">
      {galleryImages?.map((img, idx) => (
        <div key={idx} className="relative w-full h-[calc((90vh-100px)/3)] overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoverIdx(idx)}
          onMouseLeave={() => setHoverIdx(-1)}
          onClick={() => toggle(img)}
        >
          {hoverIdx === idx && (
            <FaEye className="absolute bottom-0 right-0 m-2 text-white text-2xl z-10" />
          )}
          <img
            src={img.src}
            alt={`orchid-${idx}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {showImageView && selectedImage && (
        <ImageView
          img={selectedImage}
          setShowImageView={setShowImageView}
          onLikeToggle={handleLikeToggle}
        />
      )}
    </div>
    </div>
  );
}

function ImageView({
  setShowImageView,
  img,
  onLikeToggle,
}: {
  setShowImageView: (b: boolean) => void;
  img: GalleryImage;
  onLikeToggle: (docId: string, delta: number) => void;
}) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(img.numLikes);
  const [showLoginTip, setShowLoginTip] = useState(false);
  const [showListPicker, setShowListPicker] = useState(false);

  useEffect(() => {
    if (!user) return;
    hasUserLiked(user.id, img.docId).then(setLiked);
  }, [user, img.docId]);

  useEffect(() => {
    setLikeCount(img.numLikes);
  }, [img.numLikes]);

  async function handleHeartClick() {
    if (!user) {
      setShowLoginTip(true);
      setTimeout(() => setShowLoginTip(false), 3000);
      return;
    }
    // Optimistic update
    const newLiked = !liked;
    const delta = newLiked ? 1 : -1;
    setLiked(newLiked);
    setLikeCount((c) => c + delta);
    onLikeToggle(img.docId, delta);

    try {
      await toggleLike(user.id, img.docId, img.storagePath, liked);
    } catch {
      // Revert on failure
      setLiked(liked);
      setLikeCount((c) => c - delta);
      onLikeToggle(img.docId, -delta);
    }
  }

  function handleBookmarkClick() {
    if (!user) {
      setShowLoginTip(true);
      setTimeout(() => setShowLoginTip(false), 3000);
      return;
    }
    setShowListPicker(true);
  }

  return (
    <div className="absolute inset-0 bg-black/90 flex justify-center items-center p-10">
      <MdClose className="absolute text-4xl right-0 top-0 m-2 text-white cursor-pointer"
        onClick={() => setShowImageView(false)}
      />

      <div className="relative w-3/4 h-full z-10">
        <img
          src={img.src}
          alt={`orchid`}
          className="relative w-full h-full object-cover rounded-lg rounded-tr-none z-[999]"
        />
        <div className="absolute right-0 top-0 translate-x-[50px] w-[56px] h-[128px] bg-[#f6fcf4]/80 rounded-lg flex flex-col justify-evenly items-center z-0">
          <button onClick={handleHeartClick} className="cursor-pointer flex flex-col items-center">
            {liked ? (
              <TiHeart className="text-4xl text-red-500" />
            ) : (
              <TiHeartOutline className="text-4xl" />
            )}
            <b>{likeCount}</b>
          </button>

          <button onClick={handleBookmarkClick} className="cursor-pointer flex flex-col items-center">
            <IoBookmarkOutline className="text-4xl" />
          </button>
        </div>

        {/* Login tooltip */}
        {showLoginTip && (
          <div className="absolute right-0 top-[140px] translate-x-[10px] bg-[#4a3f35]/95 text-white text-xs rounded-md px-3 py-2 z-[1000] whitespace-nowrap shadow-md">
            <Link to="/login" className="underline hover:text-[#ccab8f]">Log in</Link> to like & save
          </div>
        )}
      </div>

      {showListPicker && user && (
        <ListPickerPopup
          uid={user.id}
          galleryDocId={img.docId}
          storagePath={img.storagePath}
          onClose={() => setShowListPicker(false)}
        />
      )}
    </div>
  )
}
