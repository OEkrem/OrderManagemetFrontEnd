import React, { useState } from 'react';
import { deleteAddress } from '../../api/addressApi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from '../Icons/Icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddressList.css';

const AddressList = ({ addresses, setAddresses }) => {
  const [error, setError] = useState(null);
  const [expandedAddressId, setExpandedAddressId] = useState(null);

  const toggleAddressDetails = (addressId) => {
    setExpandedAddressId(expandedAddressId === addressId ? null : addressId);
  };

  const handleUpdateAddres = (addressId) => {
    console.log('Guncelleme yapilacak address id:', addressId); 
  };

  const handleDeleteAddress = async (addressId) => {
    try{
      await deleteAddress(addressId);
      const updatedAddresses = addresses.filter((address) => address.id !== addressId);
      setAddresses(updatedAddresses);
    }
    catch(error){setError(error);}
  };

  if (!addresses || addresses.length === 0) {return <div>Kayıtlı herhangi bir adres bulunamadı.</div>;}
  if (error) {return <div>{error}</div>;}

  return (
    <div className='addressList-container'>
      <h3>Adres Listesi</h3>
      {addresses.length === 0 && <p>Kayıtlı herhangi bir address bulunamadı..</p>}
      <ul className="list-group addressItems">
        {addresses?.map((address) => (
          <li key={address.id} className="list-group-item addressItem">
            <div className="addressItemHead">
                <div className='addressYaziDiv'>
                    <button className="btn btn-info" onClick={() => toggleAddressDetails(address.id)}>
                        {expandedAddressId === address.id ? 
                        <FontAwesomeIcon icon={Icons.ToggleOn} /> : 
                        <FontAwesomeIcon icon={Icons.ToggleOff} />
                        }
                    </button>
                    <div>
                        {address.name} <i>{address.city}/{address.country}</i>
                    </div>
                </div>
              
              <div className='addressButtonsDiv'>
                    <button className="btn btn-warning" onClick={() => handleUpdateAddres(address.id)}>
                        <FontAwesomeIcon icon={Icons.Edit} />
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteAddress(address.id)}>
                        <FontAwesomeIcon icon={Icons.Trash} />
                    </button>
              </div>
              
            </div>
            {expandedAddressId === address.id && (
              <div className={`addressItemDetails ${expandedAddressId === address.id ? ' opened' : ''}`}>
                <p><strong>Ad:</strong> {address.name}</p>
                <p><strong>Daire:</strong> {address.doorNumber}</p>
                <p><strong>Kat:</strong> {address.floor}</p>
                <p><strong>Bina No:</strong> {address.buildingNumber}</p>
                <p><strong>Sokak:</strong> {address.street}</p>
                <p><strong>Şehir:</strong> {address.city}</p>
                <p><strong>Ülke:</strong> {address.country}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;