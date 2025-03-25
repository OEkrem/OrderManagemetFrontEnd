import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (

    <footer className="bg-light py-4 mt-5 border-top">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Sol Taraf - Şirket İkonu ve İsmi */}
        <NavLink to="/" className="d-flex align-items-center text-decoration-none text-dark mb-3 mb-md-0">
          <img src="/company-logo.png" alt="Company Logo" width="40" height="40" className="me-2" />
          <span className="fw-bold">MyCompany</span>
        </NavLink>

        {/* Orta - Sayfa Linkleri */}
        <ul className="nav justify-content-center mb-3 mb-md-0">
          <li className="nav-item">
            <NavLink className="nav-link text-dark" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" to="/products">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" to="/categories">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" to="/about">About Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" to="/contact">Contact</NavLink>
          </li>
        </ul>

        {/* Sağ Taraf - Sosyal Medya İkonları / İletişim */}
        <div className="d-flex gap-3">
          <NavLink to="https://github.com/OEkrem" target='blank' className="text-dark text-decoration-none">Github</NavLink>
          <NavLink to="https://www.linkedin.com/in/onur-ekrem-yıldırım-8b2010263" target='blank' className="text-dark text-decoration-none">Linkedin</NavLink>
        </div>
      </div>

      {/* Alt Kısım - Telif Hakkı */}
      <div className="text-center mt-3 text-secondary">
        © {new Date().getFullYear()} OEkrem. Tüm Hakları Saklıdır.
      </div>
    </footer>
  )
}
