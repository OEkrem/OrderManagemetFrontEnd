import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';

import { CategoryProvider } from '../context/CategoryContext';
import CategoryList from '../lists/CategoryList';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';
import { QuantityType } from '../models/enums/quantityType';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrderDetails, fetchOrder } from '../store/features/order/orderSlice';
import { addOrderDetail } from '../api/orderApi';

export default function Home() {

  const dispatch = useDispatch();
  const {order} = useSelector( (state) => state.order);
  const [willAddOrderDetail, setWillAddOrderDetail] = useState(null);

  const { user } = useSelector( (state) => state.auth);

  useEffect(() => {
    if(user?.id)
        dispatch(fetchOrder(user.id));
  }, [dispatch, user]);

  // willAddOrderDetail değiştiğinde API çağrısı yap
  useEffect(() => {
    const saveToDatabase = async () => {
      if (willAddOrderDetail) {
        try {
          await addOrderDetail(order?.id, willAddOrderDetail);

          setWillAddOrderDetail(null);
        } catch (error) {
          console.error('Error saving order detail:', error);
        }
      }
    };

    saveToDatabase();
  }, [order?.id, willAddOrderDetail]);

  const handleAddToBasket = (product) => {
    try{
      const newOrderDetail = {id: null, productId: product?.id, quantityType: QuantityType.BOX, quantity: 1, price: product.price, };
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