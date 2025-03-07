import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/appwrite/Services/authServices";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("Current User: ",getCurrentUser());

  const checkAuth = async () => {
    console.log("Authenticating user...");
    try {
      const currentUser = await getCurrentUser();
      console.log("Current user data:", currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error("Authentication error:", error);
      setUser(null);
    } finally {
      setLoading(false);
      console.log("Loading state set to false");
    }
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e) => {
      console.log("Storage change detected:", e);
      if (e.key === 'authToken' || e.key === 'userId' || e.key === 'team') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run only once on mount

  return { user, loading, setUser, checkAuth };
};

export default useAuth;
