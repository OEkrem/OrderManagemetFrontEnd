import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { UserProvider } from '../context/UserContext';
import UserList from '../lists/UserList';

export default function UserPage() {
  return (
    <div>
      <MainLayout>

        <UserProvider>
          <div className='user-container'>
            <UserList/>
          </div> 
        </UserProvider>
        
      </MainLayout>
    </div>
  )
}
