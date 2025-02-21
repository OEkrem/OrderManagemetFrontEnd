
// src/api.js
const url = 'http://localhost:8090/api/v1/categories';

// Kullanıcıları çekmek için GET isteği
export const fetchCategories = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  export const fetchCategory = async (id) => {
    const response = await fetch(url + `/${id}`)
    const data = await response.json();
    return data;
  }

  
  // Kullanıcı oluşturmak için POST isteği
  export const createCategory = async (category) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı güncellemek için PUT isteği
  export const updateCategory = async (id, updatedCategory) => {
    const response = await fetch(url + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı silmek için DELETE isteği
  export const deleteCategory = async (id) => {
    const response = await fetch(url + `/${id}`, {
      method: 'DELETE',
    });
    return response.ok; // Silme işlemi başarılıysa true döner
  };