

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
  }, [pathname]); // Rota değiştiğinde çalışır

  return null;
}