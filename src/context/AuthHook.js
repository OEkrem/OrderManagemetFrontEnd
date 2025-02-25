import { useState, useEffect } from 'react';
import { refreshTokenRequest } from '../api/authApi';
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
  
    const navigation = useNavigate();

    useEffect(() => {
        // Component mount olduğunda token'ı localStorage'den al
        const storedToken = localStorage.getItem('jwt_token');
        const storedRefreshToken = localStorage.getItem('jwt_refreshToken');
        if (storedToken) {
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    const saveToken = (newToken) => {
        // Token'ı localStorage'e ve state'e kaydet
        localStorage.setItem('jwt_token', newToken);
        setToken(newToken);
    };

    const saveRefreshToken = (newToken) => {
      localStorage.setItem('jwt_refreshToken', newToken);
      setRefreshToken(newToken);
    }

    const removeToken = () => {
        // Token'ı hem state'ten hem de localStorage'den sil
        localStorage.clear();
        setToken(null);
        setRefreshToken(null);
        setIsLogin(false);
    };

    // token expired olmuş ise true döner
    const isExpired = (token) => {
        if (!token) return true;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); 
        return payload.exp < currentTime;
    }

    // Refresh token ile yeni access token almak
  const refreshAccessToken = async () => {
    console.log("Refresh İsteği: ");
    if (localStorage.getItem("jwt_token")) {
      try {
        console.log("İşlem yapılacak token: ", localStorage.getItem('jwt_refreshToken'));
        const response = await refreshTokenRequest();

        if (response.success && response.token) {
          localStorage.clear();  
          localStorage.setItem('jwt_token', response.token);
          setToken(response.token);
          console.log("Token değiştirildi: ", response.token);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        removeToken();
        navigation("/"); // hata olduğunda çıkış LogOut yapıldı...
      }
    }
  };

     // Token'ı kontrol et ve eğer süresi dolmuşsa refresh token ile yenile
    useEffect(() => {
        console.log("Use effect isExpired kontrolü");
        console.log("Token: ", token);
        if (token != null && isExpired(token)) {
            console.log("User effect - isExpired - AccessToken expired..");
            refreshAccessToken();
        }
        console.log("RefreshToken: ", refreshToken);
        if (refreshToken != null && isExpired(refreshToken)) {
          console.log("User effect - isExpired - RefreshToken expired..");
        }
    }, [token]);  // Token değiştiğinde kontrol et

    return { token, refreshToken, isLogin, saveToken, saveRefreshToken, removeToken, refreshAccessToken, isExpired, setIsLogin };
};

export default useAuth;
