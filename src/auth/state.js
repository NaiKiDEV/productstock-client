import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decode } from 'jsonwebtoken';
import { clearToken, client, getToken, setToken } from '../api';

const name = 'auth';

const namespace = (action) => `${name}/${action}`;

const initialState = {
  isAuthenticated: false,
  email: '',
  role: null,
  expiresAt: '',
  authError: '',
};

const authorize = createAsyncThunk(namespace('authorize'), async (payload) => {
  const {
    data: { jwtToken },
  } = await client.post('auth', payload);

  if (!jwtToken) {
    return Promise.reject();
  }

  setToken(jwtToken);

  return decode(jwtToken);
});

const initAuth = createAsyncThunk(namespace('init'), async () => {
  const token = getToken();

  if (!token) {
    return Promise.reject();
  }

  const {
    data: { jwtToken },
  } = await client.post('auth/validate', { jwtToken: getToken() });

  setToken(jwtToken);

  return decode(jwtToken);
});

export const authState = createSlice({
  name: name,
  initialState,
  reducers: {
    logout: () => {
      clearToken();
      return { ...initialState };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        authorize.fulfilled,
        (state, { payload: { email, role, exp } }) => {
          return {
            ...state,
            email,
            role,
            expiresAt: exp,
            isAuthenticated: true,
            authError: '',
          };
        }
      )
      .addCase(authorize.rejected, (state, { error }) => {
        return {
          ...initialState,
          isAuthenticated: false,
          authError: error.message,
        };
      })
      .addCase(
        initAuth.fulfilled,
        (state, { payload: { email, role, exp } }) => {
          return {
            ...state,
            email,
            role,
            expiresAt: exp,
            isAuthenticated: true,
          };
        }
      ),
});

const selectAuth = (state) => state.auth;

export const authReducer = authState.reducer;
export { authorize, initAuth, selectAuth };
export const { logout } = authState.actions;
