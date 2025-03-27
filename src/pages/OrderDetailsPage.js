

import React, {useState, useEffect} from 'react';
import MainLayout from '../layouts/MainLayout';
import OrderDetailsList from '../components/orderDetailsList/orderDetailsList';
import useAuth from '../context/AuthHook';
import { fetchOrders } from '../api/orderApi';
import { OrderStatus } from '../models/orderStatus';

export default function OrderDetailsPage() {

  const {user} = useAuth();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        if (user?.id) {
          const orders = await fetchOrders(0, 10, user.id, OrderStatus.PENDING);
          if(orders.content.length !== 0)
            setOrderDetails(orders?.content[0].orderDetailResponses || []);
        }
      } catch (err) {
        console.error(err);
        setError('Sepetinizdeki ürünler alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  const handleQuantityChange = (id, newQuantity) => {
    setOrderDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteOrderDetailItem = (id) => {
    try{

    }catch (error){
      setError("Sepetinizden ürün silerken bir hata ile karşılaştım.");
    }
    setOrderDetails((prevDetails) => prevDetails.filter((item) => item.id !== id));
  };

  if (loading) {return (<MainLayout><div>Yükleniyor...</div></MainLayout>);}

  if (error) {
    return (
      <MainLayout>
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error} </div>
      </MainLayout>
  );}

  if (orderDetails.length === 0) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Sepetinize herhangi bir ürün bulunmuyor.
        </div>
      </MainLayout>
    );
  }

  return (
    <div>
      <MainLayout>
        <OrderDetailsList 
        orderDetails={orderDetails}
        onQuantityChange={handleQuantityChange}
        handleDeleteOrderDetailItem={handleDeleteOrderDetailItem}
         />
      </MainLayout>
    </div>
  )
}
