import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserByEmail } from '../api/userApi';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
      setRoles(getRolesFromToken(storedToken));
      setUserFromToken(storedToken);
      setIsLogin(true);
    }
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('jwt_token', newToken);
    setToken(newToken);
    setRoles(getRolesFromToken(newToken));
    setUserFromToken(newToken);
    setIsLogin(true);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
    setIsLogin(false);
    setUser(null);
    setRoles([]);
  };

  const getRolesFromToken = (token) => {
    if (!token) return [];
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles || [];
  };

  const setUserFromToken = async (token) => {
    try {
      const username = getUsernameFromToken(token);
      const userData = await fetchUserByEmail(username);
      setUser(userData);
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  return { token, user, isLogin, roles, saveToken, removeToken, setIsLogin, setUser };
};

export function getUsernameFromToken(token) {
  try {
      if (!token) {
          return "Unknown User";
      }
  
      // Token'ı . ile ayır
      const parts = token.split('.');
  
      if (parts.length !== 3) {
          throw new Error("Invalid token");
      }
  
      // Payload kısmını base64 decode et
      const payload = parts[1];
      const decodedPayload = atob(payload); // base64 çözümleme
      const parsedPayload = JSON.parse(decodedPayload); // JSON parse
  
      return parsedPayload.sub;
  } catch (error) {
      console.error("Error while getting username from token: ", error);
      return "Unknown User";
  }
}

export default useAuth;