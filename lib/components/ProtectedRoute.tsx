import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      // Redirect to login if not authenticated
      router.replace("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
