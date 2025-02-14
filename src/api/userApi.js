// src/api.js

// Kullanıcıları çekmek için GET isteği
export const fetchUsers = async () => {
    const response = await fetch('http://localhost:8090/api/users');
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı oluşturmak için POST isteği
  export const createUser = async (user) => {
    const response = await fetch('http://localhost:8090/api/users', {
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
    const response = await fetch(`http://localhost:8090/api/users/${id}`, {
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
    const response = await fetch(`http://localhost:8090/api/users/${id}`, {
      method: 'DELETE',
    });
    return response.ok; // Silme işlemi başarılıysa true döner
  };