import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUsers } from '../api/userApi'; // API çağrıları
import User from '../models/User';

const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        const userObjects = data.map( (userdata) => new User(userdata.id, userdata.username, userdata.firstName, userdata.lastName, userdata.email, userdata.password, userdata.phone));
        setUsers(userObjects);
      } catch (error) {
        console.error('Veri çekilemedi:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};