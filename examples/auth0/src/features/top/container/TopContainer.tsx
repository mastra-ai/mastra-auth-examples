import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { LoginButton } from "@/features/top/presenter/LoginButton";

import { ProfileButton } from "../presenter/ProfileButton";
import { MastraChat } from "@mastra/chat";

import "@mastra/chat/dist/styles.css";

export const TopContainer = () => {
  const { error, isLoading, loginWithRedirect, loginWithPopup, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <MastraChat agentId="weatherAgent" getToken={async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }
      })

      return token;
    }} />;
  }

  return <LoginButton onClick={handleLogin} />;
};
