type Props = {
  onClick: () => void;
};

export const LogoutButton = ({ onClick }: Props) => {
  return <button onClick={onClick}>Logout</button>;
};
