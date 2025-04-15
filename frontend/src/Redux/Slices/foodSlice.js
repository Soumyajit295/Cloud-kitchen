import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    menuFoods : [],
    menuLoading : false
}

export const fetchMenu = createAsyncThunk(
  'user/getMenu',
  async(_,{rejectWithValue})=>{
    try{
      const res = await axios.get('/api/foods/menu')
      return res.data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

export const fetchDesiredMenu = createAsyncThunk(
  'user/getcategory',
  async(category,{rejectWithValue})=>{
    console.log("Category : ",category)
    try{
      const promise = await axios.post('/api/foods/desiredmenu',category)
      return promise.data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

const foodSlice = createSlice({
    name : 'food',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(fetchMenu.pending,(state,action)=>{
            state.menuLoading = true
        })
        builder.addCase(fetchMenu.fulfilled,(state,action)=>{
            state.menuLoading = false,
            state.menuFoods = action.payload.data
        })
        builder.addCase(fetchDesiredMenu.pending,(state,action)=>{
          state.menuLoading = true
        })
        builder.addCase(fetchDesiredMenu.fulfilled,(state,action)=>{
          state.menuLoading = false,
          state.menuFoods = action.payload.data
        })
    }
})

export default foodSlice.reducer