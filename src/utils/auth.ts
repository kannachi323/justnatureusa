import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setCookie } from "./cookie";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

import { auth } from "./config"; 

export async function SignUpWithEmailPassword(email: string, password : string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (res) {
            await updateProfile(res.user, {
                displayName: email.split('@')[0]
            });

            const userData = {
                uid: res.user.uid,
                email: res.user.email,
                displayName: res.user.displayName,
            };
            setCookie("user", JSON.stringify(userData), 30);
        }

        return res;
    } catch (error){
        console.log("Error signing up:", error);
        return;
    }
}

export async function LogInWithEmailPassword(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const res = await signInWithEmailAndPassword(auth, email, password);

    const userData = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
    };

    setCookie("user", JSON.stringify(userData), 30);

    return res;
  } catch (error) {
    const firebaseError = error as { code?: string; message?: string };
    const errorCode = firebaseError.code;
    const errorMessage = firebaseError.message;
    console.error("LogInWithEmailPassword error:", errorCode, errorMessage);
    throw error; // Optional: rethrow if you want to handle it upstream
  }
}




