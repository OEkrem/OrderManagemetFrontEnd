import React from 'react';
import { useProducts } from '../context/ProductContext';
import './productlist.css';

export default function ProductList() {
  const { products } = useProducts();

  return (
    <div className="container my-4">
      <div className="row g-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-12">
              <div className="card product-card h-100 shadow-sm">
                <img
                  src={product.image ? `/${product.image}` : './image/url/iphone7s.jpeg'}
                  className="card-img-top product-image"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  <p className="card-text fw-bold">{product.price} TL</p>
                </div>
                <div className="card-footer bg-white border-0 text-center">
                  <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No product available.</p>
        )}
      </div>
    </div>
  );
}
