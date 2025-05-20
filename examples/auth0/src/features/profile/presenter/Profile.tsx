import { User } from "@auth0/auth0-react";

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  return (
    <>
      {user.email_verified ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <p>{`name: ${user.name}`}</p>
          <p>{`email: ${user.email}`}</p>
        </div>
      ) : (
        <p>Verify your email</p>
      )}
    </>
  );
};
