// src/api.js
const url = 'http://localhost:8090/api/v1/users';

// Kullanıcıları çekmek için GET isteği
export const fetchUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı oluşturmak için POST isteği
  export const createUser = async (user) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı güncellemek için PUT isteği
  export const updateUser = async (id, updatedUser) => {
    const response = await fetch(url + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı silmek için DELETE isteği
  export const deleteUser = async (id) => {
    const response = await fetch(url + `/${id}`, {
      method: 'DELETE',
    });
    return response.ok; // Silme işlemi başarılıysa true döner
  };