import React from 'react';
import Layout from '../components/layouts/Layout';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../api/authApi';
import useAuth from '../context/AuthHook';


export default function LoginPage() {
  const navigate = useNavigate();
  
  // Form verilerini state'de tutacağız
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { saveToken, saveRefreshToken, setIsLogin } = useAuth(); // AuthContext'ten login fonksiyonunu alıyoruz

   // Form submit işlemi
   const handleSubmit = async (e) => {
     e.preventDefault(); // Formun sayfa yenilenmesini engeller
     setLoading(true);
     setError('');
     
     const loginRequest = {
       email,
       password
     };

     try {
      const response = await fetchLogin(loginRequest);
      
      if (response.token) {

        localStorage.setItem("jwt_token", response.token);
        localStorage.setItem("jwt_refreshToken", response.refreshToken);
        console.log("Kaydettim localeStorage'ye.");
        saveToken(response.token);
        saveRefreshToken(response.refreshToken);
        console.log("Token ve Refresh token kaydedildi..");
        setIsLogin(true);

        navigate("/");// Başka sayfaya yönlendirme işlemi yapılabilir
      } else {
        setError('Kullanici adi veya şifre yanliş');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    }
    setLoading(false);
  };

  return (
    <div>
      <Layout>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row w-100">
                <div className="col-md-6 mx-auto">
                <div className="card p-4 shadow-lg">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
                </div>
            </div>
            </div>

      </Layout>
    </div>
  )
}
