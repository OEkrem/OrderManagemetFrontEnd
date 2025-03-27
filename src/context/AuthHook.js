import { useState, useEffect } from 'react';
import { getUserFromToken } from './userservice';
import { getRolesFromToken } from './authUtils';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      updateAuthState(storedToken);
    }

    // localStorage değişikliklerini dinle
    const handleStorageChange = (event) => {
      if (event.key === 'jwt_token') {
        const newToken = event.newValue;
        if (newToken) {
          updateAuthState(newToken);
        } else {
          clearAuthState();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateAuthState = async (newToken) => {
    console.log("Update Authhook State çalisiyor...");
    saveToken(newToken);
  };

  const clearAuthState = () => {
    console.log("Clear AuthHookState çalisiyor..");
    removeToken();
  };

  const saveToken = async (newToken) => {
    localStorage.setItem("jwt_token", newToken);
    setToken(newToken);
    await setUserFromToken(newToken);
    setRoles(getRolesFromToken(newToken)); // bu çok faydalı bir yöntem değil xss saldırılarına açık
    setIsLogin(true);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
    setIsLogin(false);
    setUser(null);
    setRoles([]);
  };

  const setUserFromToken = async (token) => {
    try {
      const userData = await getUserFromToken(token);
      setUser(userData);
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  return { token, user, isLogin, roles, saveToken, removeToken, setIsLogin, setUser };
};

export default useAuth;