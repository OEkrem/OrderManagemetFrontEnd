

import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { fetchOrders } from '../api/orderApi';
import OrderSummaryList from '../components/OrderSummaryList/OrderSummaryList';
import { ProductProvider } from '../context/ProductContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function MyOrdersPage() {

  const { user } = useSelector( (state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders(0, 10, user?.id);

        console.log("Gelen order bilgilerii...", data);
        if (data) {
          setOrders(data.content || []);
        } else {
          setError('Sipariş bilgileri alınamadı.');
        }
      } catch (err) {
        console.error('Siparişler alınırken bir hata oluştu:', err);
        setError('Sipariş bilgileri alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      getOrders();
    }
  }, [user?.id]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId); // Açık olanı kapat, kapalı olanı aç
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container text-center">
          <p>Yükleniyor...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container text-center">
          <p className="text-danger">{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container my-5">
        <h1 className="text-center mb-4">Siparişlerim</h1>
        {orders.length > 0 ? (
          <div className="accordion" id="ordersAccordion">
            {orders.map((order) => (
              <div key={order.id} className="accordion-item">
                <h2 className="accordion-header" id={`heading-${order.id}`}>
                  <button
                    className={`accordion-button ${expandedOrderId === order.id ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className="d-flex justify-content-between w-100">
                    <div>
                      <p className="mb-1">
                        <strong>Order ID:</strong> <span className="text-primary">{order.id}</span>
                      </p>
                      <p className="mb-0">
                        <strong>Order Status:</strong> <span className={`badge ${order.orderStatus === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {order.orderStatus}
                        </span>
                      </p>
                    </div>
                      {/*<span>
                        {expandedOrderId === order.id ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </span>*/}
                    </div>
                  </button>
                </h2>
                {expandedOrderId === order.id && (
                  <div className="accordion-collapse collapse show">
                    <div className="accordion-body">
                      <ProductProvider>
                        <OrderSummaryList orderDetails={order?.orderDetailResponses} /> 
                      </ProductProvider>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Henüz bir siparişiniz bulunmamaktadır.</p>
        )}
      </div>
    </MainLayout>
  )
}
