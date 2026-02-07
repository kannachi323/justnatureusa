import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from "./config";

export async function SignUpWithEmailPassword(email: string, password : string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (res) {
            await updateProfile(res.user, {
                displayName: email.split('@')[0]
            });
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
        return res;
    } catch (error) {
        console.log("Error logging in:", error);
        return;
    }
}

export async function LogOut() {
    try {
        await signOut(auth);
    } catch (error) {
        console.log("Error logging out:", error);
    }
}
