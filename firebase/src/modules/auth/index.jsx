// Auth.jsx
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { Chrome } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function Auth() {
  const { isLoading, error, handleGoogleLogin, clearError } = useFirebaseAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-4">
      {error && (
        <div className="text-destructive text-sm mb-4 p-2 bg-destructive/10 rounded-md flex items-center justify-between">
          <span>{error}</span>
          <button onClick={clearError} className="text-xs underline">
            Dismiss
          </button>
        </div>
      )}
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex items-center gap-2"
        variant={"secondary"}
      >
        {isLoading ? (
          <>
            <Loader /> Signing in...
          </>
        ) : (
          <>
            <Chrome />
            Sign In With Google
          </>
        )}
      </Button>
    </div>
  );
}
