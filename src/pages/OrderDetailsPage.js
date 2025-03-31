

import React, {useState, useEffect} from 'react';
import MainLayout from '../layouts/MainLayout';
import OrderDetailsList from '../components/orderDetailsList/orderDetailsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder, removeFromOrderDetails } from '../store/features/order/orderSlice';
import { deleteOrderDetails } from '../api/orderDetailsApi';

export default function OrderDetailsPage() {

  const dispatch = useDispatch();
  const {user} = useSelector( (state) => state.auth);
  const { order } = useSelector( (state) => state.order);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          await dispatch(fetchOrder()).unwrap();
        }
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, user]);

  const handleQuantityChange = (id, newQuantity) => {
    console.log("id: ", id, " NewQuantity: ", newQuantity);
    /*setOrderDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );*/
  };

  const handleDeleteOrderDetailItem = async (orderDetailId) => {
    try{
        //console.log("Will delete orderDetail with id: ", orderDetailId);
        await deleteOrderDetails(orderDetailId);
        dispatch(removeFromOrderDetails(orderDetailId));
        window.location.reload();
    }catch (error){
      setError("Sepetinizden ürün silerken bir hata ile karşılaştım.");
    }
  };

  if (loading) {return (<MainLayout><div>Yükleniyor...</div></MainLayout>);}

  if (error) {
    return (
      <MainLayout>
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error} </div>
      </MainLayout>
  );}

  if (order?.orderDetailResponses?.length === 0) {
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
        orderDetails={order?.orderDetailResponses || []}
        onQuantityChange={handleQuantityChange}
        handleDeleteOrderDetailItem={handleDeleteOrderDetailItem}
         />
      </MainLayout>
    </div>
  )
}
