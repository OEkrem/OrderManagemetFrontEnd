

import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchProductsByProductId } from '../api/productApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ProductDetailPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
            setLoading(true);
            const data = await fetchProductsByProductId(id); // API'den ürün verisini alıyoruz
            setProduct(data);
            } catch (err) {
            setError('Ürün bilgisi alınırken bir hata oluştu.');
            console.error(err);
            } finally {
            setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
            <div className="container">
                <p>Yükleniyor...</p>
            </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
            <div className="container">
                <p className="text-danger">{error}</p>
            </div>
            </MainLayout>
        );
    }
    

    return (
        <MainLayout>
        <div className="container my-5">
          <h1 className="text-center mb-4">Ürün Detay Sayfası</h1>
          {product ? (
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  src={product.image ? `/${product.image}` : './image/url/defaultProduct.png'}
                  className="img-fluid rounded shadow-sm"
                  alt={product.name}
                />
              </div>
              <div className="col-md-6">
                <h2 className="fw-bold">{product.name}</h2>
                <p className="text-muted">{product.description}</p>
                <p className="fw-bold fs-4">{product.price} TL</p>
                <button className="btn btn-primary me-2" disabled>
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />Sepete Ekle
                </button>
                <button 
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)} // geri dönmek için kullanılıyor
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />Geri Dön
                </button>
              </div>
            </div>
          ) : (
            <p>Bu ID'ye sahip bir ürün bulunamadı: {id}</p>
          )}
        </div>
      </MainLayout>
    )
}
