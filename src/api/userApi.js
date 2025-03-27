import api from './apiClient';

const url = '/users';

export const fetchUsers = async () => {
  try {
    const response = await api.get(url, {withCredentials: true,});
    return response.data;

  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await api.get(url + `/${id}`, {withCredentials: true,});
    return response.data;

  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const fetchUserByEmail = async (email) => {
  try {
    if(email){
      const response = await api.get(url + `/email`, {params: { email }, withCredentials: true,});
      return response.data;
    } else return null;

  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};


// Kullanıcı oluşturmak için POST isteği
export const createUser = async (user) => {
  try{
    const response = await api.post(url, user, {withCredentials: true,});
    return response.data;

  }catch(error){
    console.error('Kullanıcı oluşturulurken hata oluştu: ', error);
    throw error;
  }
};

// Kullanıcı güncellemek için PUT isteği
export const updateUser = async (id, updatedUser) => {
  try{
    const response = api.put(url + `/${id}`, updatedUser, {withCredentials: true,});
    return response.data;
  } catch (error) {
    console.error(`Kullanıcı ${id} güncellenirken hata oluştu: `, error);
    throw error;
  }
};

// Kullanıcı güncellemek için PUT isteği
export const patchUser = async (id, updatedUser) => {
  try{
    const response = api.patch(url + `/${id}`, updatedUser, {withCredentials: true,});
    return response.data;
  } catch (error) {
    console.error(`Kullanıcı ${id} güncellenirken hata oluştu: `, error);
    throw error;
  }
};

// Kullanıcı silmek için DELETE isteği
export const deleteUser = async (id) => {
  try{
    const response = await api.delete(url + `/${id}`, {withCredentials: true,});
    return response.status === 204;  
  }catch(error){
    console.error(`Kullanıcı ${id} silinirken hata oluştu: `, error);
    throw error
  }
};