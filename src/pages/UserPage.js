import React from 'react';
import Layout from '../components/layouts/Layout';
import { UserProvider } from '../context/UserContext';
import UserList from '../lists/UserList';

export default function CategoryPage() {
  return (
    <div>
      <Layout>

        <UserProvider>
          <div className='user-container'>
            <UserList/>
          </div> 
        </UserProvider>
        
      </Layout>
    </div>
  )
}
