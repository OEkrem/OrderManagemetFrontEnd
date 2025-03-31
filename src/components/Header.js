import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {logout} from '../api/authApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from '../components/Icons/Icons';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../store/features/order/orderSlice';
import { fetchUser, removeToken } from '../store/features/auth/authSlice';

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLogin, roles, token } = /*useAuth();*/ useSelector( (state) => state.auth);
  const { order } = useSelector ( (state) => state.order);
  const [basketLenght, setBasketLength] = useState();

  // Sayfa yenilendiğinde kullanıcı bilgilerini yükle
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser()).unwrap().catch((error) => {
        console.error('Kullanıcı bilgileri yüklenirken bir hata oluştu:', error);
      });
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if(user?.id)
        dispatch(fetchOrder());
  }, [dispatch, user]);

  useEffect(() => {
    if(user?.id)
      dispatch(fetchOrder());
  }, [dispatch, user, order?.orderDetails]);

  useEffect(() => {
    if (order?.orderDetailResponses) {
      const totalQuantity = order.orderDetailResponses.reduce(
        (total, item) => total + item.quantity, 0
      );
      setBasketLength(totalQuantity);
    }
  }, [order?.orderDetailResponses]);

  const handleLogout = async () => {
    await logout();
    dispatch(removeToken());
    navigate("/");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Sol Taraf - Şirket İkonu ve İsmi */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src="/image/url/company-logo.png" alt="Company Logo" width="130" height="130" className="me-2" />
          <span className="fw-bold">MyCompany</span>
        </NavLink>

        {/* Orta Kısım - Home, Products, Categories */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            {isLogin && roles.includes('ROLE_ADMIN') ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">Orders</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/payments">Payments</NavLink>
                </li>
              </>
            
            ) : (<></>)}
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
          </ul>
        </div>

        {/* Sağ Taraf - Login ve Register */}
        <div className="d-flex">
          {isLogin ? (
            <>
              <NavLink className="basket btn btn-primary d-flex justify-content-center align-items-center me-2" to="/orderdetails"> <FontAwesomeIcon icon={Icons.Basket} />
              { basketLenght ? (
                <div className='orderDetailsLength'>{basketLenght}</div>
              ) : null}

              </NavLink>
              <NavLink className="btn btn-outline-primary me-2" to="/userdetails">
              <img src={'/image/url/user.png'} alt="User" width="40" height="40" className="rounded-circle me-2" />
              <span className="me-3">{user?.username ? user?.username : "User"}</span>
              </NavLink>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-outline-primary me-2" to="/login">Login</NavLink>
              <NavLink className="btn btn-primary" to="/register">Register</NavLink>
            </>
          )}
          
        </div>
      </div>
    </nav>

  )
}

