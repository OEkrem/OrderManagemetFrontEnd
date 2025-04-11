
import { useState } from 'react';
import './addressSelector.css';

export default function AddressSelector({ addresses, onSelect }) {

  const [selectedAddressId, setSelectedAddressId] = useState(null); 

  const handleAddressClick = (addressId) => {
    setSelectedAddressId(addressId); // Seçilen adresin ID'sini güncelle
    onSelect(addressId); // Üst bileşene seçilen adresi bildir
  };

  return (
    <div className="address-selector-container">
      <h4 className="text-center mb-4">Adres Seçimi</h4>
      {addresses.length === 0 ? (
        <p className="text-center">Kayıtlı adres bulunamadı.</p>
      ) : (
        <div className="row">
          {addresses.map((address) => (
            <div className="col-md-4 mb-3" key={address.id}>
              <div
                className={`card address-card ${
                  selectedAddressId === address.id ? 'selected' : ''
                }`} 
                onClick={() => handleAddressClick(address.id)}
              >
                <div className="card-body">
                  <h5 className="card-title">{address.name}</h5>
                  <p className="card-text">
                    {address.street}, {address.city}, {address.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}