// src/api.js
const url = 'http://localhost:8090/api/v1/users';


// Kullanıcıları çekmek için GET isteği
export const fetchUsers = async () => {
    const token = localStorage.getItem("jwt_token");
    if(!token){
      console.error("Token is not found in localstorage"); 
      return null;
    }
    try {
      console.log("Using Token: ", token);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        // Hata yönetimi
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };
  
  // Kullanıcı oluşturmak için POST isteği
  export const createUser = async (user) => {
    const token = localStorage.getItem("jwt_token");
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı güncellemek için PUT isteği
  export const updateUser = async (id, updatedUser) => {
    const token = localStorage.getItem("jwt_token");
    const response = await fetch(url + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(updatedUser),
    });
    const data = await response.json();
    return data;
  };
  
  // Kullanıcı silmek için DELETE isteği
  export const deleteUser = async (id) => {
    const token = localStorage.getItem("jwt_token");
    const response = await fetch(url + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`, 
      }
    });
    return response.ok; // Silme işlemi başarılıysa true döner
  };