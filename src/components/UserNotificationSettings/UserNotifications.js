import React, { useState } from 'react'; 
import './UserNotifications.css';

const UserNotifications = ({ user }) => {
    const [formData, setFormData] = useState({
        notification_sms: user.notification_sms || false,
        notification_email: user.notofications_email || false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // buraya notification işlemlerini güncellemek için gerekli userApi üzerinden patch metodu çağırılacak
        console.log("UserNotificationSettings - Güncelleme işlemi daha tammalanmadı.");
        // await patchUser(user.id, formData);
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
