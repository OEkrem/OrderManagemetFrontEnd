import React, { useState, useEffect } from 'react'; 
import './UserNotifications.css';

const UserNotifications = ({ user, onSave }) => {
    const [formData, setFormData] = useState({
        notification_sms: user.notification_sms || false,
        notofications_email: user.notofications_email || false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='user-details-form'>
            <h3>Bildirim Ayarları</h3>
            <div>
                <label>SMS:</label>
                <input type="checkbox" name="sms" value={formData.username} onChange={handleChange} />
            </div>
            <div>
                <label>Email</label>
                <input type="checkbox" name="email" value={formData.username} onChange={handleChange} />
            </div>
            <span>
                <button type="submit">Kaydet</button> 
            </span>
            
        </form>
    );
};

export default UserNotifications;
