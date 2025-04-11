import React from 'react';
import './OrderSummaryList.css';
import { useProducts } from '../../context/ProductContext';

export default function OrderSummaryList({ orderDetails }) {
  const { products } = useProducts(); // Ürün bilgilerini alıyoruz

  // Toplam tutarı hesapla
  const totalAmount = orderDetails?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="order-summary-list container">
      <h4 className="text-center mb-3">Sipariş Özeti</h4>
      {orderDetails.length === 0 ? (
        <p className="text-center">Sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <ul className="list-group">
          {orderDetails.map((item) => {
            // Ürün bilgilerini productId ile eşleştir
            const product = products.find((p) => p.id === item.productId);

            return (
              <li key={item.id} className="list-group-item d-flex align-items-center">
                {/* Ürün Resmi */}
                <img
                  src={product?.image || './image/url/defaultProduct.png'}
                  alt={product?.name || 'Ürün'}
                  className="img-thumbnail me-3"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                {/* Ürün Bilgileri */}
                <div className="flex-grow-1">
                  <h6 className="mb-1">{product?.name || 'Ürün Adı'}</h6>
                  <small className="text-muted">
                    {item.quantity} x {item.price} ₺
                  </small>
                </div>
                {/* Ürün Toplam Fiyatı */}
                <span className="badge bg-primary rounded-pill">
                  {item.quantity * item.price} ₺
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="total-amount mt-3">
        <h5 className="text-end">Toplam: {totalAmount.toFixed(2)} ₺</h5>
      </div>
    </div>
  );
}