
export function getUsernameFromToken(token) {
  try {
    if (!token) return '';

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("Invalid token");
    }

    const payload = parts[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload.sub;
  } catch (error) {
    console.error("Error while getting username from token: ", error);
    return '';
  }
}

export function isExpired(token) {
  try {
    if (!token) return true;

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = JSON.parse(atob(parts[1])); 
    const currentTime = Math.floor(Date.now() / 1000); 

    return payload.exp < currentTime; 
  } catch (error) {
    console.error("Error while checking token expiration:", error);
    return true; 
  }
}

export function getRolesFromToken(token) {
  try {
    if (!token) return [];

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = JSON.parse(atob(parts[1])); 
    return payload.roles || []; 
  } catch (error) {
    console.error("Error while extracting roles from token:", error);
    return []; 
  }
}