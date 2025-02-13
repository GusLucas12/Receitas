import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTokenExpirationCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiration = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const expirationTimestamp = parseInt(token, 10);
        const currentTime = Date.now();
        if (currentTime > expirationTimestamp) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      }
    };

  
    checkExpiration();
    const interval = setInterval(checkExpiration, 1000);
    return () => clearInterval(interval);
  }, [navigate]);
}
