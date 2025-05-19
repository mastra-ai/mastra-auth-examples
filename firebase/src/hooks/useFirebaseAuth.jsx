// useFirebaseAuth.js (new file)
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";
import confetti from "canvas-confetti";

export function useFirebaseAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGoogleLogin() {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithPopup(auth, provider);
      // Trigger confetti after successful login
      confetti({ particleCount: 500, spread: 130, origin: { y: 0.6 } });
    } catch (error) {
      setError(error.message || "Failed to sign in with Google");
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    handleGoogleLogin,
    clearError: () => setError(null),
  };
}
