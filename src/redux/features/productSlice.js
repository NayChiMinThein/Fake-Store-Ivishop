import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    products: [],
    error: ''
}

export const getAllProducts = createAsyncThunk('products/fetchAllProducts', () => {
    return axios.get('https://fakestoreapi.com/products')
                .then(res => res.data)
                .catch(err => console.log(err))
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, state => {
            state.isLoading = true
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.error = action.error.message;
        });
    }
})

export default productSlice.reducer