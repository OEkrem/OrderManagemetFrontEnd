import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';
import ProductList2 from '../lists/ProductList2';

export default function ProductsPage() {
  return (
      <MainLayout>
        <ProductProvider>
          <ProductList /> 
        </ProductProvider>

        <hr/>

        <ProductList2 selectedCategory={1}>
        </ProductList2>

      </MainLayout>
  )
}
