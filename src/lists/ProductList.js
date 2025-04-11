import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import './productlist.css';

export default function ProductList({handleAddToCard}) {
  const { products, page, setPage, totalPages } = useProducts();
  const navigate = useNavigate();

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
                <div className="card-footer bg-white border-0">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-secondary flex-grow-2"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Görüntüle
                    </button>
                    <div className='flex-grow-1'> &nbsp;</div>
                    <button
                      className="btn btn-primary me-2 flex-grow-2"
                      onClick={() => handleAddToCard(product)}
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No product available.</p>
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
