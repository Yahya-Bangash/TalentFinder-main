// app/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, checkAuth } from "@/appwrite/Services/authServices";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
          const currentUser = await getCurrentUser();
          if (!currentUser.team) {
            console.error("User team is null or undefined:", currentUser);
            setUser(null);
          } else {
            setUser(currentUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  return { user, loading };
};

export default useAuth;
