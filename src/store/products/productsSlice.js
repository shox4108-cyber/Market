import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: null,
  cart: [],
};

export const getProducts = createAsyncThunk(
  "productsSlice/getProducts",
  async (search) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${search}`
    );
    return data.products;
  }
);

export const filterABC = createAsyncThunk(
  "productsSlice/filterABC",
  async ({ price, sort }) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products?sortBy=title&order=${sort}`
    );
    const filtered = data.products.filter(
      (product) => product.price >= 0 && product.price <= price
    );
    return filtered;
  }
);

export const filterCategory = createAsyncThunk(
  "productsSlice/filterCategory",
  async (category) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return data.products;
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload)
      }
      console.log(state.cart.length);
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterABC.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterCategory.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addToCart } = productsSlice.actions;

export default productsSlice.reducer;
