import { db } from './config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { GetImage } from './storage';


export type GalleryImage = {
  src: string;
  numLikes: number;
  numBookmarks: number;
  id: number;
};

export async function fetchGalleryImages(
  setGalleryImages: (images: GalleryImage[] | undefined) => void
) {
  try {
    const galleryCollectionRef = collection(db, 'gallery');
    const q = query(galleryCollectionRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const image = doc.data();
      console.log(image);

      const url = await GetImage(image.src);

      if (url) {
        return {
          src: url,
          numLikes: image.numLikes,
          numBookmarks: image.numBookmarks,
          id: image.id,
        } as GalleryImage;
      }

      return null;
    });

    const galleryImages: GalleryImage[] = [];
    for await (const result of promises) {
      if (result) {
        galleryImages.push(result);
      }
    }

    setGalleryImages(galleryImages);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    setGalleryImages([]);
  }
}
