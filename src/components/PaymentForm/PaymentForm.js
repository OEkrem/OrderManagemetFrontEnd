import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCalendarAlt, faLock, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './PaymentForm.css';

export default function PaymentForm({ onPaymentSubmit, amount }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [error, setError] = useState(null);


  const handleCardHolderNameChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z\s]/g, '');
    setCardHolderName(value.toUpperCase());
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 16) 
      value = value.slice(0, 16);

    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9/]/g, '');

    if(expiryDate.length > value.length){
      setExpiryDate(value);
      return;
    }

    if (value.length === 2 && !value.includes('/'))
      value = value + '/';

    if (value.length <= 5)
      setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 3) 
      value = value.slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedCardNumber = cardNumber.replace(/\s/g, '');

    if (!formattedCardNumber || !expiryDate || !cvv || !cardHolderName) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    onPaymentSubmit({ formattedCardNumber, expiryDate, cvv, cardHolderName, amount });
    setError(null);
  };

  return (
    <div className="payment-form-container container">
      <h4 className="text-center mb-4">Ödeme Bilgileri</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">

        {/* Kredi Kartı Görseli */}
        <div className="col-md-6">
          <div className="credit-card-preview">
            <div className="credit-card">
              <div className="card-chip"></div>
              <div className="card-number">
                {cardNumber || '#### #### #### ####'}
              </div>
              <div className="card-details">
                <div className="card-holder">
                  <span>Kart Sahibi</span>
                  <p>{cardHolderName || 'Ad Soyad'}</p>
                </div>
                <div className="card-expiry">
                  <span>Son Kullanma Tarihi</span>
                  <p>{expiryDate || 'MM/YY'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ödeme Formu */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="mb-3">
              <label htmlFor="cardHolderName" className="form-label">
                Kart Sahibi Adı
              </label>
              <input
                type="text"
                className="form-control"
                id="cardHolderName"
                value={cardHolderName}
                onChange={handleCardHolderNameChange}
                placeholder="Ad Soyad"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Kart Numarası
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faCreditCard} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="Kart numaranızı girin"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">
                Son Kullanma Tarihi
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="CVV"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Tutar
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  readOnly
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Ödeme Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}