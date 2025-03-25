import React, { useState, useEffect } from 'react';
import { fetchUserByEmail, patchUser, updateUser } from "../api/userApi";
import MainLayout from '../layouts/MainLayout';
import UserDetailsForm from '../components/UserDetailsForm/UserDetailsForm';
import './UserDetailsPage.css'; // CSS dosyasını import edin
import UserNotifications from '../components/UserNotificationSettings/UserNotifications';
import { getUsernameFromToken } from '../context/AuthHook';

export default function UserDetailsPage() {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("Unknown User");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");

        // Token geçerli mi kontrol et
        if (token) {
            const usernameFromToken = getUsernameFromToken(token);
            setUsername(usernameFromToken);
        }

        // Kullanıcıları fetch et
        const fetchData = async () => {
            try {
                const usersData = await fetchUserByEmail(username);
                setUser(usersData);
                console.log("User data: ", usersData);
            } catch (err) {
                setError("Kullanıcı verileri alınırken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        if (username !== "Unknown User") {
            fetchData();
        }
    }, [username]);

    const handleSaveUser = async (updatedUser) => {
        try {
            console.log("Updated user: ", updatedUser);
            const updatedUserData = await updateUser(user.id, updatedUser);
            //setUser(updatedUserData);
            console.log("User updated: ", user);
        } catch (err) {
            setError("Kullanıcı verileri güncellenirken bir hata oluştu.");
        }
    };

    const handlePatchUser = async (patchedInformations) => {
        try {
            console.log("Updated user: ", patchedInformations);
            const patchedUser = await patchUser(user.id, patchedInformations);
            //setUser(updatedUserData);
            console.log("User updated: ", user);
        } catch (err) {
            setError("Kullanıcı verileri güncellenirken bir hata oluştu.");
        }
    };

    // Hata mesajı
    if (error) {
        return <div>{error}</div>;
    }

    // Yükleniyor mesajı
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <MainLayout>
            <div className='userDetailsPage-container'>
                <UserDetailsForm user={user} onSave={handleSaveUser} />
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
            <div className='userDetailsPage-container'>
                <UserNotifications user={user} onSave={handlePatchUser} />
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </MainLayout>
    );
}