import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decode } from 'jsonwebtoken';
import { client } from '../api';
import { groupBy } from '../utils';

const name = 'products';

const namespace = (action) => `${name}/${action}`;

const initialState = {
  products: null,
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

export const productState = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      return {
        ...state,
        products: payload,
      };
    }),
});

const selectProducts = (state) => state.products.products;

export const productReducer = productState.reducer;
export { getAllProducts, selectProducts };
export const {} = productState.actions;
