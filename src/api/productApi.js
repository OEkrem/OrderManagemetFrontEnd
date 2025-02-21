
// src/api.js
const url = 'http://localhost:8090/api/v1/products';

// Kullanıcıları çekmek için GET isteği
export const fetchProducts = async () => {
    const response = await fetch(url);
    const data = await response.json(url);
    return data;
  };

  export const fetchProductsByCategoryId = async (id) => {
    const response = await fetch(url + `/categories/${id}`);
    const data = await response.json();
    return data;
  };

  export const fetchProductsByProductId = async (id) => {
    const response = await fetch(url + `/${id}`);
    const data = await response.json();
    return data;
  };

  
  // Kullanıcı oluşturmak için POST isteği
  export const createProduct = async (product) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı güncellemek için PUT isteği
  export const updateProduct = async (id, updatedProduct) => {
    const response = await fetch(url + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı silmek için DELETE isteği
  export const deleteProduct = async (id) => {
    const response = await fetch(url + `/${id}`, {
      method: 'DELETE',
    });
    return response.ok; // Silme işlemi başarılıysa true döner
  };