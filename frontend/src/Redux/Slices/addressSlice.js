import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    addressess : [],
    selectedAddress : null
}

export const fetchMyAddress = createAsyncThunk(
    'user/address',
    async(_,{rejectWithValue})=>{
        const res = await axios.get('/api/users/address',{withCredentials : true})
        return res.data
    }
)


const addressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(fetchMyAddress.fulfilled,(state,action)=>{
            state.addressess = action.payload.address,
            state.selectedAddress = action.payload.selectedAddress
        })
    }
})

export default addressSlice.reducer