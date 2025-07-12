import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { auth } from '../utils/config';
import { getCookie } from '../utils/cookie';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1️⃣ Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Firebase says the user is signed in
        setIsAuthenticated(true);
        setUser({
          id: firebaseUser.uid,
          username: firebaseUser.displayName || '', // fallback if displayName is null
        });
      } else {
        // User signed out
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    // 2️⃣ Optional: check cookie too if you want extra fallback
    const userJson = getCookie('user');
    if (userJson) {
      const cookieUser = JSON.parse(userJson);
      if (cookieUser.uid && cookieUser.displayName) {
        setIsAuthenticated(true);
        setUser({
          id: cookieUser.uid,
          username: cookieUser.displayName,
        });
      }
    }

    setLoading(false);

    // 3️⃣ Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
