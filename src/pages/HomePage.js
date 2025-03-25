import React from 'react';
import MainLayout from '../layouts/MainLayout';

import { CategoryProvider } from '../context/CategoryContext';
import CategoryList from '../lists/CategoryList';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';

export default function Home() {
  return (
      <MainLayout>
        <CategoryProvider>
          <CategoryList/>
        </CategoryProvider>
        <ProductProvider>
          <ProductList/>
        </ProductProvider>
      </MainLayout>
  )
}