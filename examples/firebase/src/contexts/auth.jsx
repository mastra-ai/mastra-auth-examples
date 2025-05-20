// AuthProvider.jsx
import { auth } from "@/config/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true, // Start with loading as true
};

// Action types
const AUTH_ACTIONS = {
  SET_USER: "set_user",
  LOADING: "loading",
  SIGN_OUT: "sign_out",
};

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
        isLoading: false,
      };
    case AUTH_ACTIONS.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProviderContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Handle sign out
  const signOutUser = async () => {
    try {
      await auth.signOut();
      dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
    } catch (error) {
      console.error("Sign out error:", error);
      throw new Error("Failed to sign out");
    }
  };

  const getToken = async () => {
    const auth = getAuth();

    const user = auth.currentUser;
    if (!user) throw new Error('No user found');
    
    const token = await user.getIdToken();
    if (!token) throw new Error('No token provided');

    return token;
  };

  // Check authentication status on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
      },
      (error) => {
        console.error("Auth state observer error:", error);
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []); // Empty dependency array is correct here

  const value = {
    ...state,
    signOutUser,
    getToken,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
