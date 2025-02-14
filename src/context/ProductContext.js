import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi'; // API çağrıları
import Product from '../models/Product';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const userObjects = data.map( (product) => new Product(product.id, product.name, product.category_id, product.description, product.price, product.image));
        setProducts(userObjects);
      } catch (error) {
        console.error('Veri çekilemedi:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};