import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CategoryProvider } from '../context/CategoryContext';
import CategoryLinkList from '../lists/CategoryLinkList';

export default function Layout({children}) {
  return (
    <div>
      <Header/>
      <CategoryProvider><CategoryLinkList/></CategoryProvider>
      <main>{children}</main> 
      <Footer/>
    </div>
  )
}
