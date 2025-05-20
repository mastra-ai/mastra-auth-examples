type Props = {
  onClick: () => void;
};

export const LoginButton = ({ onClick }: Props) => {
  return <button onClick={onClick}>Login</button>;
};
