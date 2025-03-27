import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../api/categoryApi';
import { createProduct } from '../../api/productApi';
import './CreateProductFrom.css';

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    image: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await createProduct(product);
      console.log('Product created:', createdProduct);
      setProduct({
        name: '',
        categoryId: '',
        description: '',
        price: '',
        image: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form className="create-product-form" onSubmit={handleSubmit}>
      <h3> Ürün Oluşturma Formu </h3>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}  
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Product</button>
    </form>
  );
};

export default CreateProductForm;