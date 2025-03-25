import React, { useState, useEffect } from "react";
import api from '../api/apiClient';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async (category, page) => {
        try {
        const response = await api.get(`/products`, {
            params: { page: page, size: 10, categoryId: category},
        });
        //console.log("Response: ", response);
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        } catch (error) {
        console.error("Ürünleri çekerken hata oluştu:", error);
        }
    };
    fetchProducts(selectedCategory, currentPage);
  }, [selectedCategory, currentPage]);


  return (
    <div>
      <h2>{selectedCategory} Kategorisindeki Ürünler</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price}₺</li>
        ))}
      </ul>

      {/* Sayfalama Kontrolleri */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i)} disabled={i === currentPage}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
