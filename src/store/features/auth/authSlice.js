import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { refreshTokenRequest } from '../../../api/authApi'; 
import { fetchUserByEmail } from '../../../api/userApi';
import { getUsernameFromToken } from '../../../context/authUtils';

const initialState = {
  token: null, // Access token sadece burada saklanacak
  isLogin: false,
  roles: [],
  user: null,
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      
      if(!token)
        return rejectWithValue("Token bulunamadı.");

      const username = getUsernameFromToken(token);
      if(!username)
        return rejectWithValue("Kullanıcı adı bulunamadı.");

      const user = await fetchUserByEmail(username);
      return user;

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshTokenRequest();
      return response?.data?.token;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
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
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogin = true;
        state.roles = getRolesFromToken(state.token);
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.isLogin = false;
        state.user = null;
        state.roles = [];
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