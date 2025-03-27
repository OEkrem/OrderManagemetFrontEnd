import React, { useState, useEffect } from 'react';
import { getAddressesByUserId } from "../context/addressService";

import MainLayout from '../layouts/MainLayout';

import UserDetailsForm from '../components/UserDetailsForm/UserDetailsForm';
import UserNotifications from '../components/UserNotificationSettings/UserNotifications';

import AddressForm from '../components/AddressForm/AddressForm';
import AddressList from '../components/AddressList/AddressList';

import './UserDetailsPage.css';
import useAuth from '../context/AuthHook';

export default function UserDetailsPage() {
    const {user} = useAuth();
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

    if (error) {return <div>{error}</div>;}
    if (loading) {return <div>Yükleniyor... </div>;}
    if(!user) {return  <div>User Yükleniyor... </div>;}

    return (
        <MainLayout>
            <div className='userDetailsPage-container container'>
                <UserDetailsForm user={user} />
            </div>
            <div className='userDetailsPage-container container'>
                <UserNotifications user={user} />
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