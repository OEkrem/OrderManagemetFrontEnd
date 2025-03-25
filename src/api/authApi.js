import api from './apiClient';

const url = '/auth'; // base url + /auth

export const fetchLogin = async (loginRequest) => {
  try {
    const response = await api.post(url, loginRequest, { withCredentials: true });
    if (response.status !== 200)  throw new Error('Login unsuccessful');
    return response.data;

  } catch (err) {
    console.error('Login error: ', err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await api.post(url + "/logout", {}, { withCredentials: true });
    if (response.status !== 200) throw new Error('Log out error..');

  } catch (err) {
    console.error('Logout error: ', err);
    throw err;
  }
};

// Kullanıcı kaydı yapmak için POST isteği
export const fetchRegister = async (registerRequest) => {
  try {
    const response = await api.post(url + '/register', registerRequest);
    
    if (response.status !== 201) throw new Error('Register unsuccessful');
    return response.data;

  } catch (err) {
    console.error('Register error: ', err);
    throw err;
  }
};


export const refreshTokenRequest = async () => {
  try{
    const response = await api.post(url + '/refresh', {}, { withCredentials: true,});

    if(response.data.success) return response;
    else throw new Error(response.data.message);

  } catch (err) {
    console.log("Refresh token request error: ", err);
    throw err;
  }
};
