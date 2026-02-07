import {
  doc,
  getDoc,
  getDocs,
  collection,
  writeBatch,
  increment,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './config';
import { GetImage } from './storage';

export async function hasUserLiked(uid: string, galleryDocId: string): Promise<boolean> {
  const likeRef = doc(db, 'users', uid, 'likes', galleryDocId);
  const snap = await getDoc(likeRef);
  return snap.exists();
}

export async function toggleLike(
  uid: string,
  galleryDocId: string,
  storagePath: string,
  currentlyLiked: boolean
): Promise<boolean> {
  const batch = writeBatch(db);
  const likeRef = doc(db, 'users', uid, 'likes', galleryDocId);
  const galleryRef = doc(db, 'gallery', galleryDocId);

  if (currentlyLiked) {
    batch.delete(likeRef);
    batch.update(galleryRef, { numLikes: increment(-1) });
  } else {
    batch.set(likeRef, {
      galleryDocId,
      storagePath,
      likedAt: serverTimestamp(),
    });
    batch.update(galleryRef, { numLikes: increment(1) });
  }

  await batch.commit();
  return !currentlyLiked;
}

export type LikedImage = {
  galleryDocId: string;
  storagePath: string;
  src: string;
};

export async function fetchUserLikes(uid: string): Promise<LikedImage[]> {
  const colRef = collection(db, 'users', uid, 'likes');
  const q = query(colRef, orderBy('likedAt', 'desc'));
  const snapshot = await getDocs(q);

  const results: LikedImage[] = [];
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const url = await GetImage(data.storagePath);
    if (url) {
      results.push({
        galleryDocId: data.galleryDocId,
        storagePath: data.storagePath,
        src: url,
      });
    }
  }
  return results;
}
