

// bu sayfada ödeme yapıalcak ve address seçimi yapılacaktır.

import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { fetchAddressesByUserId } from '../api/addressApi';
import AddressSelector from '../components/AddressSelector/addressSelector';
import PaymentForm from '../components/PaymentForm/PaymentForm';
import OrderSummaryList from '../components/OrderSummaryList/OrderSummaryList';
import { ProductProvider } from '../context/ProductContext';

export default function PaymentPage() {

    const {user} = useSelector( (state) => state.auth);
    const {order} = useSelector( (state) => state.order);

    const [addresses, setAddresses] = useState([]);
    const [ selectedAddress, setSelectedAddress ] = useState(null);
    const [error, setError] = useState(null);


    const totalAmount = order?.orderDetailResponses?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    useEffect(() => {
        const fetchAddresses = async () => {
          if (user) {
            try {
              const response = await fetchAddressesByUserId(user.id);
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
        <div className='container mb-5'>
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

        {/*Sipariş Özet Listesi*/}
        <div className=' container mb-5'>
          <ProductProvider>
              <OrderSummaryList orderDetails={order?.orderDetailResponses || []} />
          </ProductProvider>  
        </div>
        
        {/*Ödeme işlemleri kısmı*/}
        <div className='container mb-5'>
          <PaymentForm onPaymentSubmit={handlePaymentSubmit} amount={totalAmount} /> 
        </div>
        
        {/*Onaylama kısmı*/}

    </MainLayout>
  )
}
