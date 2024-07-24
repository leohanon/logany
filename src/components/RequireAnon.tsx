import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAnon({ children }: RequireAuthProps) {
  const session = useAuth();

  if (session === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return children;
}
