import { useState, useEffect } from 'react';

const useAuth = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Component mount olduğunda token'ı localStorage'den al
        const storedToken = localStorage.getItem('jwt_token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const saveToken = (newToken) => {
        // Token'ı localStorage'e ve state'e kaydet
        localStorage.setItem('jwt_token', newToken);
        setToken(newToken);
    };

    const removeToken = () => {
        // Token'ı hem state'ten hem de localStorage'den sil
        localStorage.removeItem('jwt_token');
        setToken(null);
    };

    return { token, saveToken, removeToken };
};

export default useAuth;
