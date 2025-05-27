import { configureStore } from "@reduxjs/toolkit";
import categoryListSlice from "./categoryList/categoryListSlice";
import productsSlice from "./products/productsSlice";

export const store = configureStore({
    reducer: {
        category : categoryListSlice,
        products: productsSlice,
    }
})