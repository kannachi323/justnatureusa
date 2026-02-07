import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import { FirebaseError } from "firebase/app";

const storageRef = ref(storage);
//const imagesRef = ref(storageRef, "images");

export async function GetImage(fileName: string): Promise<string | undefined> {
  try {
    const imageRef = ref(storageRef, fileName);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);

    if (error instanceof FirebaseError) {
 
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error
          break;
      }
      return undefined; // Return something so your caller knows it failed
    }
  }
}
