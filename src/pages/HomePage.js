import React from 'react';
import Layout from "../components/layouts/Layout";

import { CategoryProvider } from '../context/CategoryContext';
import CategoryList from '../lists/CategoryList';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';

export default function Home() {
  return (
      <Layout>
        <CategoryProvider>
          <CategoryList/>
        </CategoryProvider>
        <ProductProvider>
          <ProductList/>
        </ProductProvider>
      </Layout>
  )
}