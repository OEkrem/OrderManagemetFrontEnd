import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';

import { CategoryProvider } from '../context/CategoryContext';
import CategoryList from '../lists/CategoryList';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';
import useAuth from '../context/AuthHook';
import { QuantityType } from '../models/enums/quantityType';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrderDetails, fetchOrder } from '../store/features/order/orderSlice';
import { addOrderDetail } from '../api/orderApi';

export default function Home() {

  const {user} = useAuth();

  const dispatch = useDispatch();
  const {order, orderDetails, error} = useSelector( (state) => state.order);
  const [willAddOrderDetail, setWillAddOrderDetail] = useState(null); // Yeni state


  useEffect(() => {
    if(user?.id)
        dispatch(fetchOrder(user.id));
  }, [dispatch, user]);

  // willAddOrderDetail değiştiğinde API çağrısı yap
  useEffect(() => {
    const saveToDatabase = async () => {
      if (willAddOrderDetail) {
        try {
          const veri = await addOrderDetail(order?.id, willAddOrderDetail);
          if(veri === null)
            console.log("Ürün ekleme başarısız..");
          else
            console.log("Ürün ekleme başarılı..");

          setWillAddOrderDetail(null);
        } catch (error) {
          console.error('Error saving order detail:', error);
        }
      }
    };

    saveToDatabase();
  }, [willAddOrderDetail]);

  const handleAddToBasket = (product) => {
    try{
      const newOrderDetail = {id: null, productId: product.id, quantityType: QuantityType.BOX, quantity: 1, price: product.price, };
      dispatch(addToOrderDetails(newOrderDetail));
      setWillAddOrderDetail(newOrderDetail);
      window.location.reload();

    }catch(error){
      console.log("Error occurred.");
    }
  };


  return (
      <MainLayout>
        <CategoryProvider>
          <CategoryList/>
        </CategoryProvider>
        <ProductProvider>
          <ProductList handleAddToCard={handleAddToBasket}/>
        </ProductProvider>
      </MainLayout>
  )
}