import React, { useState, useEffect } from 'react'; 
import './UserDetailsForm.css';
import { updateUser } from '../../api/userApi';

const UserDetailsForm = ({ user, setUser }) => {

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
        const { name, value } = e.target; // Değişen input'un name ve value değerlerini al
        setFormData((prevFormData) => ({
            ...prevFormData, // Önceki form verilerini koru
            [name]: value,   // Değişen alanı güncelle
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const updatedUser = await updateUser(user.id, formData);
            setInfo("Kullanıcı başarıyla güncellendi.");
            //setUser(updatedUser);
        } catch (error){
            setError("Kullanıcı Bilgileri Kaydedilemedi..");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='user-details-form'>
            <h3>Kullanıcı Detayları</h3>
            <div>
                <label>Kullanıcı Adı:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div>
                <label>Adı:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                <label>Soyadı:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className='disabled'/>
            </div>
            <div>
                <label>Telefon:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
                <label>Şifre:</label>
                <input type="password" name="password" value={""} onChange={handleChange} />
            </div>
            <div>
                <label>Roller:</label>
                <input type="text" name="roles" value={formData.roles.join(', ')} onChange={handleChange} className='disabled'/>
            </div>
            <span>
                <button type="submit">Kaydet</button> 
            </span>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {info && <div style={{ color: 'green' }}>{info}</div>}
        </form>
    );
};

export default UserDetailsForm;
