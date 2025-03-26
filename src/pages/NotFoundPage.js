import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="not-found-link">
          Go Back to Home
        </Link>
      </div>
    </MainLayout>
  );
}