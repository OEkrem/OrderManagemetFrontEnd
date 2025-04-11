import React, { useState, useEffect } from 'react'; 
import './UserDetailsForm.css';
import { updateUser } from '../../api/userApi';

const UserDetailsForm = ({ user }) => {

    const [info, setInfo] = useState();
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        password: user.password || '',
        roles: user.roles || []
    });

    useEffect(() => {
        setFormData({
            username: user.username || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            password: user.password || '',
            roles: user.roles || []
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const updatedUser = await updateUser(user.id, formData);
            setInfo("Kullanıcı başarıyla güncellendi.");
            //setUser(updatedUser); // setUser gelen verilerden kaldırıldı gerke olmayınca
        } catch (error){
            setError("Kullanıcı Bilgileri Kaydedilemedi..");
        }
    };

    return (
        <div className="mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center mb-4 text-primary">Kullanıcı Detayları</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="username" className="form-label">
                                <i className="fas fa-user"></i> Kullanıcı Adı
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName" className="form-label">
                                <i className="fas fa-id-card"></i> Adı
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName" className="form-label">
                                <i className="fas fa-id-card-alt"></i> Soyadı
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">
                                <i className="fas fa-envelope"></i> Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phone" className="form-label">
                                <i className="fas fa-phone"></i> Telefon
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">
                                <i className="fas fa-lock"></i> Şifre
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={null}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="roles" className="form-label">
                                <i className="fas fa-user-tag"></i> Roller
                            </label>
                            <input
                                type="text"
                                id="roles"
                                name="roles"
                                className="form-control"
                                value={formData.roles.join(', ')}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-50">
                            <i className="fas fa-save"></i> Kaydet
                        </button>
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {info && <div className="alert alert-success mt-3">{info}</div>}
                </form>
            </div>
        </div>
    );
};

export default UserDetailsForm;
