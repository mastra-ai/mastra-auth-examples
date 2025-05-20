type Props = {
  onClick: () => void;
};

export const ProfileButton = ({ onClick }: Props) => {
  return <button onClick={onClick}>Profile</button>;
};
