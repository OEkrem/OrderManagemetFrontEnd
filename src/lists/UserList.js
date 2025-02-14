import React from 'react';
import { useUsers } from '../context/UserContext'; // UserContext'ten veriyi alıyoruz

function UserList() {
  const { users } = useUsers(); // useUsers hook'u ile veriyi alıyoruz

  return (
    <div>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.username} - Mr. {user.lastName}</h3>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <p>No users available.</p> // Eğer kullanıcı yoksa bir mesaj gösteriyoruz
      )}
    </div>
  );
}

export default UserList;
