import {
  AppState,
  Auth0Provider,
  WithAuthenticationRequiredOptions,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import { ComponentType, ReactNode } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { ProfilePage } from "@/pages/ProfilePage";
import { TopPage } from "@/pages/TopPage";

type ProtectedRouteProps = {
  component: ComponentType;
  options?: WithAuthenticationRequiredOptions;
};

const ProtectedRoute = ({ component, options }: ProtectedRouteProps) => {
  const defaultOptions: WithAuthenticationRequiredOptions = {
    onRedirecting: () => <p>Loading...</p>,
  };
  const combinedOptions = { ...defaultOptions, ...options };
  const Component = withAuthenticationRequired(component, combinedOptions);
  return <Component />;
};

type CustomAuth0ProviderProps = {
  children: ReactNode;
};

const CustomAuth0Provider = ({ children }: CustomAuth0ProviderProps) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <CustomAuth0Provider>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={ProfilePage} />}
          />
        </Routes>
      </CustomAuth0Provider>
    </BrowserRouter>
  );
};
