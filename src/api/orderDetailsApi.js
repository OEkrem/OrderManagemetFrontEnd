
import api from './apiClient';

const url = '/orderdetails';

export const deleteOrderDetails = async (id) => {
  try {
    const response = await api.delete(url + `/${id}`, {}, {withCredentials:true});
    console.log("Kanka delete çalıştı..");
    return response.data;

  } catch (error) {
    console.error("Error delete order details by id:", id);
    return null;
  }
};