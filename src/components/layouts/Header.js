import React from 'react'
import { NavLink } from 'react-router-dom';
import  useAuth  from '../../context/AuthHook';

export default function Header() {

  const { token, isLogin, setIsLogin, removeToken } = useAuth();

  const handleLogout = () => {
    removeToken();
    localStorage.clear();
    setIsLogin(false);
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Sol Taraf - Şirket İkonu ve İsmi */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src="/image/url/company-logo.png" alt="Company Logo" width="130" height="130" className="me-2" />
          <span className="fw-bold">MyCompany</span>
        </NavLink>

        {/* Orta Kısım - Home, Products, Categories */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            {token ? (
             <li className="nav-item">
              <NavLink className="nav-link" to="/users">Users</NavLink>
            </li> 
            ) : (<></>)}
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
          </ul>
        </div>

        {/* Sağ Taraf - Login ve Register */}
        <div className="d-flex">
          {token ? (
            <>
              <NavLink className="btn btn-outline-primary me-2" to="/userdetails">
              <img src={'/image/url/user.png'} alt="User" width="40" height="40" className="rounded-circle me-2" />
              <span className="me-3">{'User'}</span>
              </NavLink>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-outline-primary me-2" to="/login">Login</NavLink>
              <NavLink className="btn btn-primary" to="/register">Register</NavLink>
            </>
          )}
          
        </div>
      </div>
    </nav>

  )
}

