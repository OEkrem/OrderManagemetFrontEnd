import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';
import CreateProductForm from '../components/CreateProductForm/CreateProductForm';
import { useSelector } from 'react-redux';

export default function ProductsPage() {
  const {roles} = useSelector( (state) => state.auth);
  return (
      <MainLayout>
        <ProductProvider>
          <ProductList /> 
        </ProductProvider>

        <hr/>

        {/*<ProductList2 selectedCategory={1}/>*/}

        {roles.includes("ROLE_ADMIN") ? 
        <>
          <CreateProductForm/>
        </>
        : null}

      </MainLayout>
  )
}
