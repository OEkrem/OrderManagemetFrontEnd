import React from 'react';
import { useCategories } from '../context/CategoryContext';
import { Link } from 'react-router-dom';
import './categoryLinkList.css';

function CategoryList() {
  const { categories } = useCategories();

  return (
    <div className='container'>
        <ul className='categoryLinks'>
            <li>
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <Link key={category.id}>{category.name}</Link>
                    ))
                ) : (
                    <p>No category available.</p>
                )}
            </li>
        </ul>
    </div>
  );
}

export default CategoryList;
