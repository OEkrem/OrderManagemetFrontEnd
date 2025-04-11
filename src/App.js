import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/HomePage';
import Product from './pages/ProductsPage';
import Category from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import UserDetailsPage from './pages/UserDetailsPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, refreshToken } from './store/features/auth/authSlice';
import PaymentPage from './pages/PaymentPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {

  const dispatch = useDispatch();
  const {user} = useSelector( (state)=> state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if(!user){
          await dispatch(refreshToken()).unwrap();
          await dispatch(fetchUser()).unwrap();  
        }
      } catch (error) {
        console.error("Uygulama başlatılırken bir hata oluştu:", error);
      }
    };
  
    initializeApp();
  }, [dispatch, user]);

  return (

      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/userdetails" element={<UserDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orderdetails" element={<OrderDetailsPage />} />
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>  
    
  );
}

export default App;
