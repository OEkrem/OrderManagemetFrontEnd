import React from 'react'
import Layout from '../components/layouts/Layout'
import { useState } from 'react';

export default function RegisterPage() {

    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form Data:', formData);
      // Buraya kayıt olma isteği gönderebilirsin (API çağrısı gibi)
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
                        value={formData.username}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* FirstName Alanı */}
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* LastName Alanı */}
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Phone Alanı */}
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    
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
    

