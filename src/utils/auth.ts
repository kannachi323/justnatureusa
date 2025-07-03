import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setCookie } from "./cookie";

import { auth } from "./config"; 

export async function SignUpWithEmailPassword(email: string, password : string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (res) {
            await updateProfile(res.user, {
                displayName: email.split('@')[0]
            });
            const token = await res.user.getIdToken();
            setCookie("auth_token", token, 30);

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
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res) {
            const token = await res.user.getIdToken();
            setCookie("auth_token", token, 30);

            const userData = {
                uid: res.user.uid,
                email: res.user.email,
                displayName: res.user.displayName,
            };
            setCookie("user", JSON.stringify(userData), 30);
        }

        return res;
    } catch (error) {
        console.log("Error logging in:", error);
        return;
    }
}




