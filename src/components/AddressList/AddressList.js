import React, { useState, useEffect } from 'react';
import { fetchAddressesByUserId, deleteAddress } from '../../api/addressApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faToggleOff, faToggleOn, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import './AddressList.css';

const AddressList = ({ user }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAddressId, setExpandedAddressId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addressesData = await fetchAddressesByUserId(user.id);
        setAddresses(addressesData);
        setLoading(false);
      } catch (err) {
        setError("Adres verileri alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchAddresses();
    }
  }, [user]);

  const toggleAddressDetails = (addressId) => {
    setExpandedAddressId(expandedAddressId === addressId ? null : addressId);
  };

  const handleUpdateAddres = (addressId) => {
    console.log('Guncelleme yapilacak address id:', addressId); 
  };

  const handleDeleteAddress = async (addressId) => {
    console.log('Silme yapilacak address id:', addressId);
    try{await deleteAddress(addressId);}
    catch(error){console.error('Error deleting address: ', error);}
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                        <FontAwesomeIcon icon={faToggleOn} /> : 
                        <FontAwesomeIcon icon={faToggleOff} />
                        }
                    </button>
                    <div>
                        {address.name} <i>{address.city}/{address.country}</i>
                    </div>
                </div>
              
              <div className='addressButtonsDiv'>
                    {/*<button className="btn btn-warning" onClick={() => handleUpdateAddres(address.id)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>*/}
                    <button className="btn btn-danger" onClick={() => handleDeleteAddress(address.id)}>
                        {<FontAwesomeIcon icon={faTrashCan} />}
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