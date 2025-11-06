import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

// This file only exports the component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isInitializing: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isResettingPassword: false,
    isUpdatingProfile: false,
    isSigningInWithGoogle: false,
    error: null,
  });

  const updateAuthState = (updates) => {
    setAuthState((prev) => ({ ...prev, ...updates }));
  };

  const clearError = () => {
    updateAuthState({ error: null });
  };

  async function signup(email, password) {
    try {
      updateAuthState({ isSigningUp: true, error: null });
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateAuthState({ isSigningUp: false });
      return result;
    } catch (error) {
      updateAuthState({ isSigningUp: false, error: error.message });
      throw error;
    }
  }

  async function login(email, password) {
    try {
      updateAuthState({ isLoggingIn: true, error: null });
      const result = await signInWithEmailAndPassword(auth, email, password);
      updateAuthState({ isLoggingIn: false });
      return result;
    } catch (error) {
      updateAuthState({ isLoggingIn: false, error: error.message });
      throw error;
    }
  }

  async function logout() {
    try {
      updateAuthState({ isLoggingOut: true, error: null });
      const result = await signOut(auth);
      updateAuthState({ isLoggingOut: false });
      return result;
    } catch (error) {
      updateAuthState({ isLoggingOut: false, error: error.message });
      throw error;
    }
  }

  async function loginWithGoogle() {
    try {
      updateAuthState({ isSigningInWithGoogle: true, error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      updateAuthState({ isSigningInWithGoogle: false });
      return result;
    } catch (error) {
      updateAuthState({ isSigningInWithGoogle: false, error: error.message });
      throw error;
    }
  }

  async function updateUserProfile(profileData) {
    try {
      updateAuthState({ isUpdatingProfile: true, error: null });
      const result = await updateProfile(auth.currentUser, profileData);
      // Update local state to reflect profile changes immediately
      setCurrentUser((prevUser) => ({ ...prevUser, ...profileData }));
      updateAuthState({ isUpdatingProfile: false });
      return result;
    } catch (error) {
      updateAuthState({ isUpdatingProfile: false, error: error.message });
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      updateAuthState({ isResettingPassword: true, error: null });
      const result = await sendPasswordResetEmail(auth, email);
      updateAuthState({ isResettingPassword: false });
      return result;
    } catch (error) {
      updateAuthState({ isResettingPassword: false, error: error.message });
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      updateAuthState({ isInitializing: false });
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    authState,
    signup,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
    updateUserProfile,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// This component manages all authentication logic and provides it to your entire app.
