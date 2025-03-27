import React from 'react';
import MainLayout from '../layouts/MainLayout';
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

  const { saveToken} = useAuth();

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
        saveToken(response.token);
        navigate("/");
      } else setError('Kullanici adi veya şifre yanliş');
      
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
    setLoading(false);
  };

  return (
    <div>
      <MainLayout>
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
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    </form>
                </div>
                </div>
            </div>
            </div>

      </MainLayout>
    </div>
  )
}
