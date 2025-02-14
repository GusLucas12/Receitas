import { useState, useCallback } from "react";

const useUserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserInfo = useCallback(async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("Email do usuário não encontrado");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://backend-engsoft.onrender.com/user/get?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao obter informações do usuário");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { userData, error, loading, getUserInfo };
};

export default useUserInfo;
