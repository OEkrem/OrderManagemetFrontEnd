
import { getUsernameFromToken } from './authUtils';
import { fetchUserByEmail } from '../api/userApi';

export const getUserFromToken = async (token) => {
  try {
    if( token == null ) token = localStorage.getItem("jwt_token");
    const email = getUsernameFromToken(token);
    return await fetchUserByEmail(email);
  } catch (error) {
    console.error("Error when getting user from token:", error);
    return null;
  }
};