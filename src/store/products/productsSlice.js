import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  total: 0,
  cart: [],
  productDetail: null,
};

export const getProducts = createAsyncThunk(
  "productsSlice/getProducts",
  async ({ search = "", limit = 9, skip = 0 }) => {
    const url = search
      ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const { data } = await axios.get(url);
    return {
      products: data.products,
      total: data.total,
    };
  }
);

export const filterProducts = createAsyncThunk(
  "productsSlice/filterProducts",
  async ({ category, price, sort, page = 1, limit = 9 }) => {
    let url = "https://dummyjson.com/products";
    if (category && category !== "All Products") {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const { data } = await axios.get(url);
    let products = data.products;

    if (sort) {
      products.sort((a, b) =>
        sort === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    }

    if (price) {
      products = products.filter(
        (product) => product.price >= 0 && product.price <= price
      );
    }

    const start = (page - 1) * limit;
    const paginated = products.slice(start, start + limit);

    return {
      products: paginated,
      total: products.length,
    };
  }
);

export const ProductsDetail = createAsyncThunk(
  "productsSlice/ProductsDetail",
  async (id) => {
    const url = `https://dummyjson.com/products/${id}`;

    const { data } = await axios.get(url);
    return data;
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(ProductsDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  },
});

export const { addToCart } = productsSlice.actions;

export default productsSlice.reducer;
