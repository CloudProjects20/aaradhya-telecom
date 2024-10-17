import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import auth from '../../firebase'; // Ensure this imports the initialized Firebase Auth

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const authContext = useAuthProvider();
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Hook that provides authentication logic
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Register function
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('idToken', userCredential._tokenResponse.idToken);
      setUser(userCredential.user);
      setUserToken(userCredential._tokenResponse.idToken);
      return userCredential.user;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('idToken', userCredential._tokenResponse.idToken);
      setUser(userCredential.user);
      setUserToken(userCredential._tokenResponse.idToken);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('idToken');
      setUser(null);
      setUserToken(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(`Can't reset the password at the moment`, error);
      throw error;
    }
  };

  // Check authentication state on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const idToken = localStorage.getItem('idToken');
        if (idToken) {
          setUserToken(idToken);
        }
      } catch (e) {
        console.error('Failed to fetch the auth token:', e);
      } finally {
        setUserLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setUserLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [auth]);

  return {
    user,
    userToken,
    userLoading,
    register,
    signIn,
    signOut,
    resetPassword,
  };
};
