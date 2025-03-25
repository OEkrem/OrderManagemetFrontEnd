import api from './apiClient';

const url = '/products';

  // Kullanıcıları çekmek için GET isteği
  export const fetchProducts = async (page = 0, size = 10, categoryId=null) => {
    //console.log("ProductApi - fetchProducts: ", page, size, categoryId);
    try{
      const params = {
        page: page,
        size: size,
      };
      if (categoryId) {
        params.categoryId = categoryId;
      }

      const response = await api.get(url, {params});
      return response.data;
    }catch(error){
      console.error('Ürünler çekilirken hata oluştu: ', error);
      throw error;
    }
  };

  export const fetchProductsByProductId = async (id) => {
    try{
      const response = await api.get(url + `/${id}`);
      return response.data;
    }catch(error){
      console.error('Ürün çekilirken hata oluştu: ', error);
      throw error;
    }
  };
  
  // Ürün oluşturmak için POST isteği
  export const createProduct = async (product) => {
    try{
      const response = await api.post(url, product);
      return response.data;
    }catch(error){
      console.error('Ürün oluşturulurken hata oluştu: ', error);
      throw error;
    }
  };
  
  // Ürün güncellemek için PUT isteği
  export const updateProduct = async (id, updatedProduct) => {
    try{
      const response = await api.put(url + `/${id}`, updatedProduct);
      return response.data;
    }catch(error){
      console.error(`Ürün ${id} güncellenirken hata oluştu: `, error);
      throw error;
    }
  };
  
  // Ürün silmek için DELETE isteği
  export const deleteProduct = async (id) => {
    try{
      const response = await api.delete(url + `/${id}`);
      return response.status === 204;
    }catch(error){
      console.error(`Ürün ${id} silinirken hata oluştu: `, error);
      throw error;
    }
  };