import React from 'react';
import { useUsers } from '../context/UserContext'; // UserContext'ten veriyi alıyoruz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './UserList.css';

function UserList() {
  const { users } = useUsers(); // useUsers hook'u ile veriyi alıyoruz

  const onEdit = (userId) => {
    console.log('Edit user with ID:', userId);
    // Edit işlemini burada gerçekleştirin
  }

  const onDelete = (userId) => {
    console.log('Delete user with ID:', userId);
    // Delete işlemini burada gerçekleştirin
  }

  if (!users || users.length === 0) {
    return <div className="text-center mt-4">Kayıtlı herhangi bir kullanıcı bulunamadı.</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary">Kullanıcı Listesi</h3>
      <ul className="list-group user-list">
        {users.map((user) => (
          <li key={user.id} className="list-group-item user-item">
            <div className="d-flex justify-content-between align-items-center">
              <div className="user-info">
                <h5 className="mb-1">
                  {user.firstName} {user.lastName}
                </h5>
                <p className="mb-0">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                  {user.email}
                </p>
                <p className="mb-0">
                  <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                  {user.phone}
                </p>
              </div>
              <div className="user-actions">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(user.id)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Düzenle
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(user.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Sil
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
