import api from './apiClient';

const url = '/users';

// Kullanıcıları çekmek için GET isteği
export const fetchUsers = async () => {
  //console.log("UserApi - fetchUsers");
    const token = localStorage.getItem("jwt_token");
    if(!token){
      console.error("Token is not found in localstorage"); 
      return null;
    }
    try {
      const response = await api.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;

    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

  export const fetchUserById = async (id) => {
    //console.log("UserApi - fetchUsers");
      const token = localStorage.getItem("jwt_token");
      if(!token){
        console.error("Token is not found in localstorage"); 
        return null;
      }
      try {
        const response = await api.get(url + `/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true,
        });
  
        return response.data;
  
      } catch (error) {
        console.error("Error fetching users:", error);
        return null;
      }
    };

    export const fetchUserByEmail = async (email) => {
      //console.log("UserApi - fetchUserByEmail ... Email : ", email);
        const token = localStorage.getItem("jwt_token");
        if(!token){
          console.error("Token is not found in localstorage"); 
          return null;
        }
        try {
          const response = await api.get(url + `/email`, {
            params: { email },
            headers: {
              Authorization: `Bearer ${token}`, // JWT token ekleniyor
            },
          });
    
          return response.data;
    
        } catch (error) {
          console.error("Error fetching users:", error);
          return null;
        }
      };

  
  // Kullanıcı oluşturmak için POST isteği
  export const createUser = async (user) => {
    //console.log("UserApi - createUser");
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      console.error("Token is not found in localstorage");
      return null;
    }
    try{
      const response = await api.post(url, user, {
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
        withCredentials: true,
      });

      return response.data;

    }catch(error){
      console.error('Kullanıcı oluşturulurken hata oluştu: ', error);
      throw error;
    }
  };
  
  // Kullanıcı güncellemek için PUT isteği
  export const updateUser = async (id, updatedUser) => {
    //console.log("UserApi - updateUser");
    const token = localStorage.getItem("jwt_token");
    console.log("UpdatedUser: ", updatedUser);
    /*if (!token) {
      console.error("Token is not found in localstorage");
      return null;
    }
    try{
      const response = api.put(url + `/${id}`, updatedUser, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Kullanıcı ${id} güncellenirken hata oluştu: `, error);
      throw error;
    }*/
  };
  
  // Kullanıcı silmek için DELETE isteği
  export const deleteUser = async (id) => {
    //console.log("UserApi - deleteUser");
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      console.error("Token is not found in localstorage");
      return null;
    }
    try{
      const response = await api.delete(url + `/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
        withCredentials: true,
      });
      return response.status === 204;  
    }catch(error){
      console.error(`Kullanıcı ${id} silinirken hata oluştu: `, error);
      throw error
    }
  };