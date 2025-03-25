import React, { useState, useEffect } from 'react'; 
import './UserDetailsForm.css';

const UserDetailsForm = ({ user, onSave }) => {
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
        setFormData({
            ...formData,
            [name]: name === 'roles' ? value.split(',').map(role => role.trim()) : value // Handle roles as array
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
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
            
        </form>
    );
};

export default UserDetailsForm;
