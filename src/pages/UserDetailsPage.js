import React, { useState, useEffect } from 'react';
import { fetchUsers } from "../api/userApi";
import Layout from '../components/layouts/Layout';

export default function UserDetailsPage() {
    const [users, setUsers] = useState([]);
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
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (err) {
                setError("Kullanıcı verileri alınırken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Hata mesajı
    if (error) {
        return <div>{error}</div>;
    }

    // Yükleniyor mesajı
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <Layout>
            <div>
                <h1>Kullanıcı Adı: {username}</h1>
                <h2>Kullanıcılar:</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.email} - {user.password} - {user.username} - {user.phone}</li>
                    ))}
                </ul>
            </div>    
        </Layout>
    );
}

function getUsernameFromToken(token) {
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

    // Kullanıcı adını (genellikle 'sub' ya da 'username' olarak saklanır) al
    return parsedPayload.sub || parsedPayload.username || "Unknown User";
}
