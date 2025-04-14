import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

const initialState = {
  foods: [],
  loading: false,
  error: null,
  isEdit: false, 
  currentFood: null, 
};

// Add food
export const addFood = createAsyncThunk(
  "admin/addFood",
  async (data, { rejectWithValue }) => {
    try {
      const promise = axios.post("/api/seller/addfood", data);
      toast.promise(promise, {
        loading: "Adding new food...",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to add food",
      });
      const response = await promise;
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// Fetch food list
export const fetchFoodList = createAsyncThunk(
  "admin/fetchFoodList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/foods/allfoods");
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// Change food stock (for edit and stock management)
export const changeFoodStock = createAsyncThunk(
  "admin/changeFoodStock",
  async (data, { rejectWithValue }) => {
    const { foodId, stockStatus } = data;
    try {
      const promise = axios.patch(`/api/seller/updatefood/${foodId}`, {
        instock: stockStatus,
      });
      toast.promise(promise, {
        loading: "Changing stock...",
        success: (res) => res?.data?.message,
        error: "Failed to change stock",
      });
      const response = await promise;
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// Edit food (update details like name, price, etc.)
export const editFood = createAsyncThunk(
  "admin/editFood",
  async ({ foodId, updatedData }, { rejectWithValue }) => {
    try {
      const promise = axios.patch(`/api/seller/updatefood/${foodId}`, updatedData);
      toast.promise(promise, {
        loading: "Editing food...",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to edit food",
      });
      const response = await promise;
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const deleteFood = createAsyncThunk(
  'admin/removeFood',
  async(foodid,{rejectWithValue})=>{
    try{
      const promise = axios.delete(`/api/seller/removefood/${foodid}`)
      toast.promise(promise,{
        loading : "Removing food",
        success : (res)=>res?.data?.message,
        error : (err)=>err?.response?.data?.message
      })
      return (await promise).data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.isEdit = action.payload.isEdit;
      state.currentFood = action.payload.food || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add food
      .addCase(addFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFood.fulfilled, (state, action) => {
        state.loading = false;
        state.foods.push(action.payload.newFood);
      })
      .addCase(addFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch food list
      .addCase(fetchFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload.data;
      })
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change stock status
      .addCase(changeFoodStock.fulfilled, (state, action) => {
        const updatedFood = action.payload.data;
        const index = state.foods.findIndex(f => f._id === updatedFood._id);
        if (index !== -1) {
          state.foods[index] = updatedFood;
        }
      })

      // Edit food (update food item)
      .addCase(editFood.fulfilled, (state, action) => {
        const updatedFood = action.payload.data;
        const index = state.foods.findIndex(f => f._id === updatedFood._id);
        if (index !== -1) {
          state.foods[index] = updatedFood;
        }
      })
      .addCase(editFood.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete food (update food item)
      .addCase(deleteFood.fulfilled,(state,action)=>{
        state.foods = state.foods.filter((food)=>food._id!==action.payload?.data)
      })
  },
});

export const { setEditMode } = adminSlice.actions;
export default adminSlice.reducer;
