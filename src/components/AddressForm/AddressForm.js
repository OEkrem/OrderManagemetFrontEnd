import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createAddress } from "../../api/addressApi";

const AddressForm = ({ userId, setAddresses }) => {
  const [error, setError] = useState();
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    doorNumber: "",
    floor: "",
    buildingNumber: "",
    street: "",
    city: "",
    country: ""
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const addressWithUserId = { ...address, userId: userId };
      const createdAddress = await createAddress(addressWithUserId);
      setAddresses((prevAddresses) => [...prevAddresses, createdAddress]);
    } catch(error){
      setError(error);
    }

    setShowForm(false);
    setAddress({
      name: "",
      doorNumber: "",
      floor: "",
      buildingNumber: "",
      street: "",
      city: "",
      country: ""
    });
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-primary" onClick={toggleForm}>
        Add Address <span className="ms-2">+</span>
      </button>
      {showForm && (
        <div className="card mt-3 p-3">
          <form onSubmit={handleSubmit}>
            {Object.keys(address).map((key) => (
              <div className="mb-2" key={key}>
                <label className="form-label text-capitalize">{key}</label>
                <input
                  type="text"
                  className="form-control"
                  name={key}
                  value={address[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-success mt-2 float-end">
              Kaydet
            </button>
          </form>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddressForm;