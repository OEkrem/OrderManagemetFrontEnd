import React, { useState, useEffect } from 'react';
import { fetchUserByEmail, updateUser } from "../api/userApi";
import MainLayout from '../layouts/MainLayout';
import UserDetailsForm from '../components/UserDetailsForm/UserDetailsForm';
import './UserDetailsPage.css'; // CSS dosyasını import edin


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

    const handleSave = async (updatedUser) => {
        try {
            console.log("Updated user: ", updatedUser);
            //const updatedUserData = await updateUser(user.id, updatedUser);
            //setUser(updatedUserData);
            //console.log("User updated: ", updatedUserData);
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
                <UserDetailsForm user={user} onSave={handleSave} />
            </div>
        </MainLayout>
    );
}

function getUsernameFromToken(token) {
    try {
        if (!token) {
            return "Unknown User";
        }
    
        // Token'ı . ile ayır
        const parts = token.split('.');
    
        if (parts.length !== 3) {
            throw new Error("Invalid token");
        }
    
        // Payload kısmını base64 decode et
        const payload = parts[1];
        const decodedPayload = atob(payload); // base64 çözümleme
        const parsedPayload = JSON.parse(decodedPayload); // JSON parse
    
        return parsedPayload.sub;
    } catch (error) {
        console.error("Error while getting username from token: ", error);
        return "Unknown User";
    }
}