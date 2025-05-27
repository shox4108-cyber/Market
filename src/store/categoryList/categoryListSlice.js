import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    categories : null, 
    currentCategory: 'All Products'
}

export const getCategories = createAsyncThunk('categoryListSlice/getCategories', async ()=> {
    const { data } = await axios.get('https://dummyjson.com/products/category-list')
    return data
})

const categoryListSlice = createSlice({
    name: 'categoryListSlice',
    initialState,
    reducers: {
        getCurrentCategory(state, action) {
            state.currentCategory = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})

export const { getCurrentCategory } = categoryListSlice.actions

export default categoryListSlice.reducer