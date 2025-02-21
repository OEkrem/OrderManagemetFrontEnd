
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
