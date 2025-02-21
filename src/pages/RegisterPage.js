import React from 'react'
import Layout from '../components/layouts/Layout'
import { useState } from 'react';
import { fetchRegister } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {

  const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
     // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun sayfa yenilenmesini engeller
    setLoading(true);
    setError('');

    // Şifreler eşleşiyor mu kontrolü
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }
    
    // registerRequest objesini oluştur
    const registerRequest = {
      username,
      email,
      password
    };

    try {
      // fetchRegister fonksiyonunu çağırıyoruz
      const response = await fetchRegister(registerRequest);
      
      if (response.success) {
        // Kayıt başarılı olduğunda yönlendirme yapılabilir
        console.log('Kayıt başarılı:', response);
        navigate("/login");
        // Örneğin, kullanıcıyı giriş sayfasına yönlendirebilirsiniz.
      } else {
        // Kayıt başarısız olursa hata mesajı
        setError(response.message || 'Bir hata oluştu');
      }
    } catch (err) {
      setError('Bir hata oluştu', err);
    }
    setLoading(false);
  };

  return (
      <Layout>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">Register</h3>
                  <form onSubmit={handleSubmit}>
                    {/* İsim Alanı */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    {/* Email Alanı */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {/* Şifre Alanı */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Confirm Şifre Alanı */}
                    <div className="mb-3">
                      <label htmlFor="confirmpsw" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmpsw"
                        name="confirmpsw"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    
                    {/* Kayıt Ol Butonu */}
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                  </form>
                  <p className="mt-3 text-center">
                    Already have an account? <a href="/login" className="text-decoration-none">Login here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  )
}
    

