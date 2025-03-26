import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi'; // API çağrıları
import Product from '../models/Product';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(page, 9, null);
        const productObjects = data.content.map((product) => new Product(product.id, product.name, product.category_id, product.description, product.price, product.image));
        setProducts(productObjects);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Veri çekilemedi:', error);
      }
    };

    getProducts();
  }, [page]);

  return (
    <ProductContext.Provider value={{ products, page, setPage, totalPages }}>
      {children}
    </ProductContext.Provider>
  );
};