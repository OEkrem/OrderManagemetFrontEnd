

// bu ssayfada ödeme yapıalcak ve address seçimi yapılacaktır.

import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddressesByUserId } from '../api/addressApi';
import AddressSelector from '../components/AddressSelector/addressSelector';
import PaymentForm from '../components/PaymentForm/PaymentForm';

export default function PaymentPage() {

    const dispatch = useDispatch();
    const {user} = useSelector( (state) => state.auth);
    const {order} = useSelector( (state) => state.order);

    const [addresses, setAddresses] = useState([]);
    const [ selectedAddress, setSelectedAddress ] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
          if (user) {
            try {
              const response = await fetchAddressesByUserId(user.id);
              console.log("Response addrsss list: ", response);
              setAddresses(response); // Gelen adresleri state'e kaydet
            } catch (err) {
                setError("Addressler yüklenirken bir hata oluştu..: ", err);
            }
          }
        };
    
        fetchAddresses();
      }, [user]);

    const handleAddressSelect = (addressId) => {
        const address = addresses.find((addr) => addr.id === addressId);
        setSelectedAddress(address);
        console.log('Seçilen Adres:', address);
    };

    const handlePaymentSubmit = (paymentDetails) => {
        console.log('Ödeme Detayları:', paymentDetails);
        console.log('Seçilen Adres:', selectedAddress);

        if (!selectedAddress) {
            alert('Lütfen bir adres seçin.');
            return;
        }

        alert('Ödeme başarılı!');
    };

  return (
    <MainLayout>
        
        {/*Adress seçimi yeri*/}
        <div className='container'>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <h3>Ödeme Sayfası</h3>
            <AddressSelector addresses={addresses} onSelect={handleAddressSelect} />
            {selectedAddress && (
                <div>
                    <h5>Seçilen Adres: </h5>
                    <p>{selectedAddress.name}</p>
                </div>
            )}
        </div>
        
        {/*Ödeme işlemleri kısmı*/}
        <PaymentForm onPaymentSubmit={handlePaymentSubmit} />

        {/*Onaylama kısmı*/}

        

    </MainLayout>
  )
}
