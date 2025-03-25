import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddressForm = ({ onSave }) => {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    doorNumber: "",
    floor: "",
    buildingNumber: "",
    street: "",
    city: "",
    country: "",
    userId: "",
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
    setShowForm(false);
    setAddress({
      name: "",
      doorNumber: "",
      floor: "",
      buildingNumber: "",
      street: "",
      city: "",
      country: "",
      userId: "",
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
    </div>
  );
};

export default AddressForm;