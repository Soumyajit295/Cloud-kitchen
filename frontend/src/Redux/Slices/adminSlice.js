import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    foods : []
}

export const addFood = createAsyncThunk(async(data,{rejectWithValue})=>{
    console.log("Food Data : ",data)
    try{
        const promise = axios.post('/api/seller/addfood',data)
        toast.promise(promise,{
            loading : "Adding new food",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const fetchFoodList = createAsyncThunk(async(_,{rejectWithValue})=>{
    try{
        const promise = axios.get()
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{}
})

export default adminSlice.reducer