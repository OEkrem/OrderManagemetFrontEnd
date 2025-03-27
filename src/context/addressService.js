
import { fetchAddressesByUserId } from "../api/addressApi";

export const getAddressesByUserId = async (userId) => {
  try {
    if( userId == null ) return null;
    return await fetchAddressesByUserId(userId);
  } catch (error) {
    console.error("Error when getting addresses from userId: ", error);
    return null;
  }
};