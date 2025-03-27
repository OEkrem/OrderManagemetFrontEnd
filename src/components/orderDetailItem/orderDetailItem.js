
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './orderDetailItem.css';
import { fetchProductsByProductId } from '../../api/productApi';
import { fetchCategory } from '../../api/categoryApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from '../Icons/Icons';

const OrderDetailItem = ({ orderDetailItem, onQuantityChange, handleDeleteOrderDetailItem }) => {
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (orderDetailItem?.productId) {
            const productData = await fetchProductsByProductId(orderDetailItem.productId);
            setProduct(productData);
            if(productData?.category_id){
                const categoryName = await fetchCategory(productData.category_id);
                setCategoryName(categoryName.name);
            }
        }
      } catch (err) {
        setError('Ürün bilgisi alınırken bir hata oluştu.');
      }
    };

    fetchProduct();
  }, [orderDetailItem]);



  if (!orderDetailItem) {return <div>Order detail bilgisi bulunamadı.</div>;}
  if (error) {return <div>{error}</div>;}

  return (
    <div className="order-detail-item-horizontal d-flex align-items-center">
      {/* Ürün Görseli */}
      <div className="product-image">
        <img
          src={product?.image || 'https://via.placeholder.com/100'}
          alt={product?.name || 'Ürün Görseli'}
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="product-info flex-grow-1">
        <h5>{product?.name || 'Ürün Adı'}</h5>
        <p>Kategori: {categoryName || 'Kategori Adı'}</p>
        <p className='fiyat'>Fiyat: {product?.price || 0} ₺</p>
      </div>

      {/* Adet Kontrolü */}
      <div className="quantity-control d-flex align-items-center">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onQuantityChange(orderDetailItem.id, orderDetailItem.quantity - 1)}
          disabled={orderDetailItem.quantity <= 1}
        >
          -
        </button>
        <span className="quantity mx-2">{orderDetailItem.quantity}</span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => onQuantityChange(orderDetailItem.id, orderDetailItem.quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Silme Butonu */}
      <div className="delete-button">
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteOrderDetailItem(orderDetailItem.id)}
        >
          <FontAwesomeIcon icon={Icons.Trash}/>
        </button>
      </div>
    </div>
  );
};

export default OrderDetailItem;