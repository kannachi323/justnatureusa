import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type User } from "firebase/auth";

import { auth } from "./config"; 

export async function SignUpWithEmailPassword(email: string, password : string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (res) {
            const user: User = res.user;
            console.log(user);
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
            const user: User = res.user;
            console.log(user);
        }

        return res;
    } catch (error) {
        console.log("Error logging in:", error);
        return;
    }
}




