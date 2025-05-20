import { useAuth0 } from "@auth0/auth0-react";

import { LogoutButton } from "@/features/profile/presenter/LogoutButton";
import { Profile } from "@/features/profile/presenter/Profile";

export const ProfileContainer = () => {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return user ? (
    <>
      <Profile user={user} />
      <LogoutButton onClick={handleLogout} />
    </>
  ) : (
    <p>Error!!!</p>
  );
};
