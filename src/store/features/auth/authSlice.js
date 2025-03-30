import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { refreshTokenRequest } from '../../../api/authApi'; 
import { fetchUserByEmail } from '../../../api/userApi';
import { getUsernameFromToken } from '../../../context/authUtils';

const initialState = {
  token: null, // Access token sadece burada saklanacak
  isLogin: false,
  roles: [],
  user: {},
};

// Token'dan kullanıcı bilgilerini almak için async thunk
export const setUserFromToken = createAsyncThunk(
  'auth/setUserFromToken',
  async (token, { rejectWithValue }) => {
    try {
      const username = getUsernameFromToken(token);
      const userData = await fetchUserByEmail(username);
      return userData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Refresh token ile yeni access token almak için async thunk
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshTokenRequest(); // Yeni access token al
      return response.data.token; // Yeni token'ı döndür
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.roles = getRolesFromToken(token);
      state.isLogin = true;
    },
    removeToken: (state) => {
      state.token = null;
      state.isLogin = false;
      state.user = null;
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserFromToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload; // Yeni access token'ı güncelle
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.isLogin = false;
      });
  },
});

const getRolesFromToken = (token) => {
  if (!token) return [];
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.roles || [];
};

export const { saveToken, removeToken } = authSlice.actions;
export default authSlice.reducer;