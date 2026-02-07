import { db } from './config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { GetImage } from './storage';

export type BaseItem = {
  src: string;
  id: number;
  docId: string;
  storagePath: string;
  [key: string]: unknown; // allow any other properties
};

export async function fetchItems<T extends BaseItem>(
  collectionName: string,
  setItems: (items: T[] | undefined) => void,
  storagePathField: keyof T = 'src', // field in doc pointing to storage path
  orderField: string = 'timestamp'
) {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy(orderField, 'desc'));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data() as T;

      // get the path to storage image, e.g. 'gallery/image1.jpg'
      const originalPath = data[storagePathField] as unknown as string;

      const url = await GetImage(originalPath);

      if (url) {
        return {
          ...data,
          docId: doc.id,
          storagePath: originalPath,
          src: url, // override src with full url
        } as T;
      }

      return null;
    });

    const items: T[] = [];
    for await (const result of promises) {
      if (result) {
        items.push(result);
      }
    }

    setItems(items);
  } catch (error) {
    console.error(`Error fetching items from ${collectionName}:`, error);
    setItems([]);
  }
}

export async function fetchItemsV2<T extends BaseItem>(
  collectionName: string,
  setItems: (items: T[] | undefined) => void,
  storagePathField: keyof T = 'src', // field in doc pointing to storage path
  orderField: string = 'timestamp'
) {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy(orderField, 'desc'));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data() as T;

      // get the path to storage image, e.g. 'gallery/image1.jpg'
      const originalPath = data[storagePathField] as unknown as string;

      if (originalPath) {
        return {
          ...data,
          docId: doc.id,
          storagePath: originalPath,
          src: originalPath,
        } as T;
      }

      return null;
    });

    const items: T[] = [];
    for await (const result of promises) {
      if (result) {
        items.push(result);
      }
    }

    setItems(items);
  } catch (error) {
    console.error(`Error fetching items from ${collectionName}:`, error);
    setItems([]);
  }
}

