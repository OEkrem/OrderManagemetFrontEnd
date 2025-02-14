import React from 'react';
import Layout from '../components/layouts/Layout';
import { CategoryProvider } from '../context/CategoryContext';
import CategoryList from '../lists/CategoryList';

export default function CategoryPage() {
  return (
    <div>
      <Layout>

        <CategoryProvider>
          <div className='category-container'>
            <CategoryList/>
          </div> 
        </CategoryProvider>
        
      </Layout>
    </div>
  )
}
