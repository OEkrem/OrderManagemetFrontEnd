
import api from './apiClient';

const url = '/orders';

export const fetchOrders = async (page = 0, size = 10, userId = null, orderStatus = null) => {
  try {
    const params = {
        page: page,
        size: size,
      };
      if (userId) params.userId = userId;
      if (orderStatus) params.orderStatus = orderStatus;
      
    const response = await api.get(url, {params, withCredentials:true});
    return response.data;

  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

export const fetchOrder = async (orderId) => {
    try{
        const response = await api.get(url + `/${orderId}`, {}, {withCredentials: true});
        return response.data;
    } catch (error){
        console.error("Error fetching order by id: ", orderId);
        return null;
    }
}

export const createOrder = async (createOrderRequest) => {
    try{
        const response = await api.post(url, createOrderRequest, {withCredentials: true});
        return response.data;
    } catch(error){
        console.error("Error occurred when create order");
        return null;
    }
};

export const addOrderDetail = async (orderId, createOrderDetailRequest) => {
    try{
        const response = await api.patch(url + `/${orderId}/orderdetail`, createOrderDetailRequest, {withCredentials: true});
        return response.data;
    } catch( error ){
        console.error("Error occurred when add orderdetail to basket");
        return null;
    }
}

export const addOrderDetails = async (orderId, createOrderDetailsListRequest) => {
    try{
        const response = await api.patch(url + `/${orderId}/orderdetails`, createOrderDetailsListRequest, {withCredentials: true});
        return response.data;
    } catch( error ){
        console.error("Error occurred when add orderdetails to basket");
        return null;
    }
}

export const addPayment = async (orderId, createPaymentRequest) => {
    try{
        const response = await api.patch(url + `/${orderId}/payment`, createPaymentRequest, {withCredentials: true});
        return response.data;
    } catch( error ){
        console.error("Error occurred when add payment to basket");
        return null;
    }
}

export const confirmOrder = async (orderId) => {
    try{
        const response = await api.patch(url + `/${orderId}/confirm`, {}, {withCredentials: true});
        return response.data;
    } catch( error ){
        console.error("Error occurred when confirm order");
        return null;
    }
}

export const deleteOrder = async (orderId) => {
    try{
        const response = await api.delete(url + `/${orderId}`, {}, {withCredentials: true});
        return response.data;
    } catch( error ){
        console.error("Error when delete order");
        return null;
    }
}