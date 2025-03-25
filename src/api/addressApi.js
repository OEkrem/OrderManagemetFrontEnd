
import api from './apiClient';

const url = '/addresses';

export const fetchAddresses = async () => {
    try {
        const response = await api.get(url, {withCredentials: true,});
        return response.data;

    } catch (error) {
        console.error("Error fetching addresses:", error);
        return null;
    }
};

export const fetchAddressesByUserId = async (userId) => {
    try {
        const response = await api.get(url, {
            params: { userId },
            withCredentials: true,
        });
        return response.data.content;
    } catch (error) {
        console.error(`Error fetching addresses for user ${userId}:`, error);
        throw error;
    }
};

export const fetchAddressById = async (id) => {
    try {
        const response = await api.get(url + `/${id}`, {withCredentials: true,});
        return response.data;

    } catch (error) {
        console.error("Error fetching address:", error);
        return null;
    }
};

export const createAddress = async (address) => {
    try{
        const response = await api.post(url, address, {withCredentials: true,});
        return response.data;

    }catch(error){
        console.error('Error creating address: ', error);
        throw error;
    }
};

export const updateAddress = async (id, updatedAddress) => {
    try{
        const response = api.put(url + `/${id}`, updatedAddress, {withCredentials: true,});
        return response.data;
    } catch (error) {
        console.error(`Error updating address ${id}: `, error);
        throw error;
    }
};

export const deleteAddress = async (id) => {
    try {
        const response = await api.delete(url + `/${id}`, {withCredentials: true,});
        return response.data;
    } catch (error) {
        console.error(`Error deleting address ${id}: `, error);
        throw error;
    }
};