import useAuth from "../context/AuthHook";

// src/api.js
const url = 'http://localhost:8090/api/v1/auth';

// Kullanıcı girişi yapmak için POST isteği
export const fetchLogin = async (loginRequest) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
      credentials: "include",
    });

    if (!response.ok) {
      // Burada HTTP hata kodlarını kontrol edebilirsiniz
      throw new Error('Giriş başarısız');
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (err) {
    // Ağ hataları gibi diğer hataları yakalamak için
    console.error('Login error: ', err);
    throw err; // Hata fırlatıyoruz ki caller method (örneğin, LoginPage) bunu işleyebilsin
  }
};

// Kullanıcı kaydı yapmak için POST isteği
export const fetchRegister = async (registerRequest) => {
  try {
    const response = await fetch(url + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
      credentials: "include",
    });

    if (!response.ok) {
      // Burada HTTP hata kodlarını kontrol edebilirsiniz
      throw new Error('Kayıt işlemi başarısız');
    }

    const data = await response.json();
    return data;

  } catch (err) {
    // Ağ hataları gibi diğer hataları yakalamak için
    console.error('Register error: ', err);
    throw err; // Hata fırlatıyoruz ki caller method (örneğin, RegisterPage) bunu işleyebilsin
  }
};


export const refreshTokenRequest = async () => {
  // Refresh token ile yeni access token al
  try{
    const refreshToken = localStorage.getItem("jwt_refreshToken");
    const response = await fetch(url + '/refresh', { // -------------------------------------- değişcekkkk
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(refreshToken),
      credentials: 'include',
    });

    const data = await response.json();
    console.log("Refresh isteği attım response datası: ", data);

    if(data.success){
      localStorage.setItem("jwt_token", data.token);
      console.log("Data success oldu işlem tamam..");
      return data.token;
    }
    else{
      throw new Error(data.message);
    }

  } catch (err) {
    // Ağ hataları gibi diğer hataları yakalamak için
    console.error('RefreshToken error: ', err);
    throw err; // Hata fırlatıyoruz ki caller method (örneğin, RegisterPage) bunu işleyebilsin
  }

  };
