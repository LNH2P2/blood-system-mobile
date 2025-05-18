import { Button } from "@react-navigation/elements";

export interface RedButtonProps {
  children: string;
  onPressIn?: () => void;
}

export default function RedButton({ children, onPressIn }: RedButtonProps) {
  return (
    <Button color="red" onPressIn={onPressIn}>
      {children}
    </Button>
  );
}