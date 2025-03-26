import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';
import ProductList2 from '../lists/ProductList2';
import useAuth from '../context/AuthHook';
import CreateProductForm from '../components/CreateProductForm/CreateProductForm';

export default function ProductsPage() {
  const data = useAuth();
  return (
      <MainLayout>
        <ProductProvider>
          <ProductList /> 
        </ProductProvider>

        <hr/>

        <ProductList2 selectedCategory={1}/>

        {data.roles.includes("ROLE_ADMIN") ? 
        <>
          <CreateProductForm/>
        </>
        : null}

      </MainLayout>
  )
}
