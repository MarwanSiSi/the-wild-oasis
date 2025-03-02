import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUser } from "../features/authentication/hooks/useUser";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, isFetchingUser } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isFetchingUser) {
      navigate("/login");
    }
  }, [isAuthenticated, isFetchingUser, navigate]);

  if (isAuthenticated) return <>{children}</>;
}
