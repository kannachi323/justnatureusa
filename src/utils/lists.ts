import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config';
import { GetImage } from './storage';

export type UserList = {
  id: string;
  name: string;
  coverUrl: string | null;
  imageCount: number;
};

export type ListItem = {
  galleryDocId: string;
  storagePath: string;
  src: string;
};

export async function createList(uid: string, name: string): Promise<string> {
  console.log(uid);
  const colRef = collection(db, 'users', uid, 'lists');
  const docRef = await addDoc(colRef, {
    name,
    createdAt: serverTimestamp(),
    coverStoragePath: null,
    imageCount: 0,
  });
  return docRef.id;
}

export async function fetchUserLists(uid: string): Promise<UserList[]> {
  const colRef = collection(db, 'users', uid, 'lists');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  const results: UserList[] = [];
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    let coverUrl: string | null = null;
    if (data.coverStoragePath) {
      coverUrl = (await GetImage(data.coverStoragePath)) ?? null;
    }
    results.push({
      id: docSnap.id,
      name: data.name,
      coverUrl,
      imageCount: data.imageCount ?? 0,
    });
  }
  return results;
}

export async function saveToList(
  uid: string,
  listId: string,
  galleryDocId: string,
  storagePath: string
): Promise<void> {
  const itemRef = doc(db, 'users', uid, 'lists', listId, 'items', galleryDocId);
  const listRef = doc(db, 'users', uid, 'lists', listId);

  const batch = writeBatch(db);
  batch.set(itemRef, {
    galleryDocId,
    storagePath,
    savedAt: serverTimestamp(),
  });
  batch.update(listRef, {
    imageCount: increment(1),
    coverStoragePath: storagePath,
  });
  await batch.commit();
}

export async function removeFromList(
  uid: string,
  listId: string,
  galleryDocId: string
): Promise<void> {
  const itemRef = doc(db, 'users', uid, 'lists', listId, 'items', galleryDocId);
  const listRef = doc(db, 'users', uid, 'lists', listId);

  const batch = writeBatch(db);
  batch.delete(itemRef);
  batch.update(listRef, { imageCount: increment(-1) });
  await batch.commit();
}

export async function fetchListItems(uid: string, listId: string): Promise<ListItem[]> {
  const colRef = collection(db, 'users', uid, 'lists', listId, 'items');
  const q = query(colRef, orderBy('savedAt', 'desc'));
  const snapshot = await getDocs(q);

  const results: ListItem[] = [];
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

export async function getListMembershipForImage(
  uid: string,
  galleryDocId: string,
  listIds: string[]
): Promise<Set<string>> {
  const memberOf = new Set<string>();
  await Promise.all(
    listIds.map(async (listId) => {
      const itemRef = doc(db, 'users', uid, 'lists', listId, 'items', galleryDocId);
      const snap = await getDoc(itemRef);
      if (snap.exists()) {
        memberOf.add(listId);
      }
    })
  );
  return memberOf;
}

export async function deleteList(uid: string, listId: string): Promise<void> {
  const itemsRef = collection(db, 'users', uid, 'lists', listId, 'items');
  const snapshot = await getDocs(itemsRef);

  const batch = writeBatch(db);
  snapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref));
  batch.delete(doc(db, 'users', uid, 'lists', listId));
  await batch.commit();
}
