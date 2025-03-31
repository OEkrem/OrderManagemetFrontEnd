import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { saveToken, fetchUser } from '../store/features/auth/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     setError('');
     
     const loginRequest = {email,password};

     try {
      const response = await fetchLogin(loginRequest);
      if (response?.token) {
        dispatch(saveToken(response.token));
        await dispatch(fetchUser()).unwrap();
        navigate("/");
      } else setError('Kullanici adi veya şifre yanliş');
      
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
    setLoading(false);
  };

  if (loading) {return (<MainLayout><div>Yükleniyor...</div></MainLayout>);}
  if (error) {
      return (
        <MainLayout>
          <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error} </div>
        </MainLayout>
    );}

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
