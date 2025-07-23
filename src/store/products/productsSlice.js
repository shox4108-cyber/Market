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

export const filterProducts = createAsyncThunk(
  "productsSlice/filterProducts",
  async ({ category, price, sort }) => {
    let url = 'https://dummyjson.com/products';
    if (category && category !== "All Products") {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const { data } = await axios.get(url);
    let products = data.products;

    if (sort) {
      products.sort((a, b) =>
        sort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
    }

    if (price) {
      products = products.filter(
        (product) => product.price >= 0 && product.price <= price
      );
    }

    return products;
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addToCart } = productsSlice.actions;

export default productsSlice.reducer;
