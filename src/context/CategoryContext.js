import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories } from '../api/categoryApi'; // API çağrıları
import Category from '../models/Category';

const Categorycontext = createContext();

export const useCategories = () => {
  return useContext(Categorycontext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        const userObjects = data.map( (category) => new Category(category.id, category.name, category.description));
        setCategories(userObjects);
      } catch (error) {
        console.error('Veri çekilemedi:', error);
      }
    };

    getCategories();
  }, []);

  return (
    <Categorycontext.Provider value={{ categories }}>
      {children}
    </Categorycontext.Provider>
  );
};