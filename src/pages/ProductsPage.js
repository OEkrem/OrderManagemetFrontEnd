import React from 'react';
import Layout from '../components/layouts/Layout';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../lists/ProductList';

export default function ProductsPage() {
  return (
      <Layout>
        <ProductProvider>
          <ProductList /> 
        </ProductProvider>
      </Layout>   
  )
}
