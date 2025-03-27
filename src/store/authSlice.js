import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserByEmail } from '../api/userApi';
import { getUsernameFromToken } from '../context/authUtils';

const initialState = {
  token: null,
  isLogin: false,
  roles: [],
  user: {},
};

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

export const saveTokenAndFetchUser = createAsyncThunk(
  'auth/saveTokenAndFetchUser',
  async (token, { dispatch, rejectWithValue }) => {
    try {
      localStorage.setItem('jwt_token', token);
      const username = getUsernameFromToken(token);
      const userData = await fetchUserByEmail(username);
      dispatch(saveToken(token));
      return userData;
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
      localStorage.setItem('jwt_token', token);
      state.token = token;
      state.roles = getRolesFromToken(token);
      state.isLogin = true;
    },
    removeToken: (state) => {
      localStorage.clear();
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
      .addCase(saveTokenAndFetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
