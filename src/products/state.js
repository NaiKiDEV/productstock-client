import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decode } from 'jsonwebtoken';
import { client } from '../api';
import { groupBy } from '../utils';

const name = 'products';

const namespace = (action) => `${name}/${action}`;

const initialState = {
  products: null,
  categories: null,
  users: null,
  productView: null,
};

const getAllProducts = createAsyncThunk(
  namespace('getAllProducts'),
  async () => {
    const { data } = await client.get('products');

    const grouped = Object.values(groupBy(data, 'universalCode')).map((x) => {
      const mappedProducts = x
        ?.map((prod) => {
          return {
            id: prod.id,
            quantity: prod.quantity,
            price: prod.price,
            fullName: `${prod.user?.name} ${prod?.user.surname}`,
          };
        })
        .sort((left, right) => (left.price > right.price ? 1 : -1));

      return {
        name: x[0].name,
        imageUrl: x[0].imageUrl,
        universalCode: x[0].universalCode,
        category: x[0].category,
        sellers: mappedProducts,
      };
    });

    return grouped;
  }
);

const getAllCategories = createAsyncThunk(
  namespace('getAllCategories'),
  async () => {
    const { data } = await client.get('categories');

    return data;
  }
);

const getAllUsers = createAsyncThunk(namespace('getAllUsers'), async () => {
  const { data } = await client.get('users');

  return data;
});

const getSingleProduct = createAsyncThunk(
  namespace('getSingleProduct'),
  async (id) => {
    const { data } = await client.get(`products/${id}`);

    return data;
  }
);

export const productState = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          products: payload,
        };
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        return {
          ...state,
          users: payload,
        };
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        return {
          ...state,
          categories: payload,
        };
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        return {
          ...state,
          productView: payload,
        };
      })
      .addCase(getAllProducts.pending, (state) => {
        return {
          ...state,
          products: null,
        };
      })
      .addCase(getAllCategories.pending, (state) => {
        return {
          ...state,
          categories: null,
        };
      })
      .addCase(getAllUsers.pending, (state) => {
        return {
          ...state,
          users: null,
        };
      })
      .addCase(getSingleProduct.pending, (state) => {
        return {
          ...state,
          productView: null,
        };
      }),
});

const selectProducts = (state) => state.products.products;
const selectCategories = (state) => state.products.categories;
const selectUsers = (state) => state.products.users;
const selectEntireState = (state) => state.products;
const selectProductView = (state) => state.products.productView;

export const productReducer = productState.reducer;
export {
  getAllProducts,
  getAllCategories,
  getAllUsers,
  getSingleProduct,
  selectProducts,
  selectCategories,
  selectUsers,
  selectEntireState,
  selectProductView,
};
export const {} = productState.actions;
