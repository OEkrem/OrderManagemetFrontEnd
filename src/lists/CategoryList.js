import React from 'react';
import { useCategories } from '../context/CategoryContext';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const { categories } = useCategories();

  return (
    <div className="container my-4">
      <div className="row">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="col-12 mb-3">
              <div className="card category-card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title mb-1">{category.name}</h5>
                    <p className="card-text text-muted mb-0">{category.description}</p>
                  </div>
                  <Link to={`/category/${category.id}`} className="btn btn-primary btn-sm">View</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No category available.</p>
        )}
      </div>
    </div>
  );
}
