import api from './apiClient';

const url = '/categories';

  // Kategori çekmek için GET isteği
  export const fetchCategories = async () => {
    try{
      const response = await api.get(url);
      return response.data;
    }catch(error){
      console.error('Kategoriler çekilirken hata oluştu: ', error);
      throw error;
    }
  };

  export const fetchCategory = async (id) => {
    try{
      const response = await api.get(url + `/${id}`);
      //console.log("Category Api - FetchCategory");
      return response.data;
    }catch(error){
      console.error(`Kategori ${id} çekilirken hata oluştu: `, error);
      throw error;
    }
  }
  
  // Kategori oluşturmak için POST isteği
  export const createCategory = async (category) => {
    try{
      const response = await api.post(url, category);
      //console.log("Category Api - CreateCategory");
      return response.data;
    }catch(error){
      console.error('Kategori oluşturulurken hata oluştu: ', error);
      throw error;
    }
  };
  
  // Kategori güncellemek için PUT isteği
  export const updateCategory = async (id, updatedCategory) => {
    try{
      const response = await api.put(url + `/${id}`, updatedCategory);
      //console.log("Category Api - UpdateCategory");
      return response.data;
    }catch(error){
      console.error(`Kategori ${id} güncellenirken hata oluştu: `, error);
      throw error;
    }
  };
  
  // Kategori silmek için DELETE isteği
  export const deleteCategory = async (id) => {
    try{
      //console.log("Category Api - DeleteCategory");
      const response = await api.delete(url + `/${id}`);
      return response.status === 204; // Silme işlemi başarılıysa true döner
    }catch(error){
      console.error(`Kategori ${id} silinirken hata oluştu: `, error);
      throw error;
    }
  };