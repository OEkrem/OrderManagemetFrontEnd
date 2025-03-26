import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { CategoryProvider } from '../context/CategoryContext';
import CategoryList from '../lists/CategoryList';

export default function CategoryPage() {

  return (
    <div>
      <MainLayout>

        <CategoryProvider>
          <div className='category-container'>
            <CategoryList/>
          </div> 
        </CategoryProvider>
        
      </MainLayout>
    </div>
  )
}
