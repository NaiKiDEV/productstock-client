import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../auth';
import { productReducer } from '../products/state';

const reducers = {
  auth: authReducer,
  products: productReducer,
};

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export { store };
