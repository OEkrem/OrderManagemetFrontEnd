import React from 'react';
import Layout from '../components/layouts/Layout';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../api/userApi';
import {useAuth} from '../context/AuthContext';


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const { login } = useAuth(); // AuthContext'ten login fonksiyonunu alıyoruz

  // Sayfa açıldığında kullanıcıları çekiyoruz
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error('User fetching error:', err);
      }
    };
    getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      console.log('Login successful!', foundUser);
      login(foundUser);
      navigate('/');
      // Burada giriş başarılı olduğunda yönlendirme veya localStorage kullanabilirsin.
    } else {
      setError('Invalid email or password');
    }
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
