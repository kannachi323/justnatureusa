import { useState, useEffect } from 'react';
import { type User } from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { getCookie } from '../utils/cookie';

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    const authToken = getCookie('auth_token');
    const userJson = getCookie('user');

    if (authToken && userJson) {
        const user: User = JSON.parse(userJson);

        setIsAuthenticated(true);

        if (user.uid && user.displayName) {
        setUser({
            id: user.uid,
            username: user.displayName,
        });
        }
    }
    }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, 
        user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};