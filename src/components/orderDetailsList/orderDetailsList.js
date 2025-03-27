

import 'bootstrap/dist/css/bootstrap.min.css';
import './orderDetailsList.css';
import OrderDetailItem from '../orderDetailItem/orderDetailItem';

const OrderDetailsList = ({ orderDetails, onQuantityChange, handleDeleteOrderDetailItem }) => {

  if (!orderDetails) {return <div>Order details bilgisi bulunamadı.</div>;}

  return (
    <div className="container order-details-list">
      <h3 className="mb-4">Sipariş Detayları</h3>
      <div className="row">
        {orderDetails.map((orderDetailItem, index) => (
          <div className="col-12 mb-4" key={index}>
            <OrderDetailItem 
            orderDetailItem={orderDetailItem} 
            onQuantityChange= {onQuantityChange}
            handleDeleteOrderDetailItem = {handleDeleteOrderDetailItem}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsList;