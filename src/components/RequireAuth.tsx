import Login from "../pages/Login";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const session = useAuth();

  if (!session) {
    return <Login />;
  }
  return children;
}
