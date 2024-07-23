import { ReactNode } from "react";
import Signup from "../pages/Signup";
import { useAuth } from "../hooks/useAuth";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const session = useAuth();

  if (!session) {
    return <Signup />;
  }
  return children;
}
