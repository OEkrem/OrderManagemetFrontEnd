import React, { useState } from 'react'; 
import './UserNotifications.css';

const UserNotifications = ({ user }) => {
    const [formData, setFormData] = useState({
        notification_sms: user.notification_sms || false,
        notification_email: user.notofications_email || false
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // buraya notification işlemlerini güncellemek için gerekli userApi üzerinden patch metodu çağırılacak
        console.log("UserNotificationSettings - Güncelleme işlemi daha tammalanmadı.");
        // await patchUser(user.id, formData);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center mb-4 text-primary">Bildirim Ayarları</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="notification_sms"
                            name="notification_sms"
                            checked={formData.notification_sms}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="notification_sms">
                            SMS Bildirimleri
                        </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="notification_email"
                            name="notification_email"
                            checked={formData.notification_email}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="notification_email">
                            Email Bildirimleri
                        </label>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-50">
                            <i className="fas fa-save"></i> Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserNotifications;
