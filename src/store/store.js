import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../auth';

const reducers = {
  auth: authReducer,
};

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export { store };
