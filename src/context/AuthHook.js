import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [roles, setRoles] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
      setRoles(getRolesFromToken(storedToken));
      setIsLogin(true);
    }
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('jwt_token', newToken);
    setToken(newToken);
    setRoles(getRolesFromToken(newToken));
    setIsLogin(true);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
    setIsLogin(false);
    setRoles([]);
  };

  const isExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000); 
    return payload.exp < currentTime;
  };

  const getRolesFromToken = (token) => {
    if (!token) return [];
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles || [];
  };

  /*const refreshAccessToken = async () => {
    if (localStorage.getItem("jwt_token")) {
      try {
        const response = await refreshTokenRequest();
        if (response.data.success && response.data.token) {
          saveToken(response.data.token);
          console.log("Access Token değiştirildi..");
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        removeToken();
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (token != null && isExpired(token)) {
      console.log("User effect - isExpired - AccessToken expired..");
      refreshAccessToken();
    }
  }, [token]);*/

  return { token, isLogin, roles, saveToken, removeToken, isExpired, setIsLogin };
};

export default useAuth;