import React, { useState, useEffect } from 'react';
import { patchUser } from "../api/userApi";
import { getAddressesByUserId } from "../context/addressService";

import MainLayout from '../layouts/MainLayout';

import UserDetailsForm from '../components/UserDetailsForm/UserDetailsForm';
import UserNotifications from '../components/UserNotificationSettings/UserNotifications';

import AddressForm from '../components/AddressForm/AddressForm';
import AddressList from '../components/AddressList/AddressList';

import './UserDetailsPage.css';
import useAuth from '../context/AuthHook';

export default function UserDetailsPage() {
    const {user, setUser} = useAuth();
    const [addresses, setAddresses] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                if (user) {
                    const addressesData = await getAddressesByUserId(user.id);
                    setAddresses(addressesData);
                }
            } 
            catch (err) {setError("Adresler alınırken bir hata oluştu.");} 
            finally {setLoading(false);}
        };
    
        fetchAddresses();
    }, [user]);

    const handlePatchUser = async (patchedInformations) => {
        try {
            await patchUser(user.id, patchedInformations);
        } catch (err) {
            setError("Kullanici verileri güncellenirken bir hata oluştu.");
        }
    };

    if (error) {return <div>{error}</div>;}
    if (loading) {return <div>Yükleniyor... </div>;}
    if(!user) {return  <div>User Yükleniyor... </div>;}

    return (
        <MainLayout>
            <div className='userDetailsPage-container container'>
                <UserDetailsForm user={user} setUser={setUser} />
            </div>
            <div className='userDetailsPage-container container'>
                <UserNotifications user={user} onSave={handlePatchUser} />
            </div>

            <div className='userDetailsPage-container container'>
                <AddressList addresses = {addresses} setAddresses={setAddresses} />
            </div>

            <div className='userDetailsPage-container container'>
                <AddressForm userId = {user.id} setAddresses={setAddresses} />
            </div>

        </MainLayout>
    );
}