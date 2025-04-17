import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setShowSignin } from "./authSlice";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: JSON.parse(localStorage.getItem("loggedInStatus")) || false,
  orders : []
};

export const signup = createAsyncThunk(
  "/user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const promise = axios.post("/api/users/register", data, {
        withCredentials: true,
      });
      toast.promise(promise, {
        loading: "Registering user",
        success: (res) => res?.data?.message,
        error: (error) => error?.response?.data?.message,
      });
      return (await promise).data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signin = createAsyncThunk(
    "/user/signin",
    async (data, { rejectWithValue }) => {
      try {
        const promise = axios.post("/api/users/login", data, {
          withCredentials: true,
        });
        toast.promise(promise, {
          loading: "Validating user",
          success: (res) => res?.data?.message,
          error: (error) => error?.response?.data?.message,
        });
        return (await promise).data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const signout = createAsyncThunk(
    "/user/signout",
    async(_,{rejectWithValue})=>{
        try{
            const promise = axios.get('/api/users/logout')
            toast.promise(promise,{
                loading : "Logging out user",
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

export const validateUser = createAsyncThunk(
  'user/validate',
  async(_,{dispatch,rejectWithValue})=>{
    try{
      const res = await axios.get('/api/auth/validate',{withCredentials : true})
      return res.data?.user
    }
    catch(err){
      localStorage.clear()
      dispatch(setShowSignin(true))
      return rejectWithValue("Session expired")
    }
  }
)

export const addAddress = createAsyncThunk(
  'user/addAddress',
  async(formData,{rejectWithValue})=>{
    try{
      console.log(formData)
      const res = axios.post('/api/address/addaddress',formData)
      toast.promise(res,{
        loading : "Adding new address",
        success : (res)=>res?.data?.message,
        error : (err)=>err?.response?.data?.message
      })
      return (await res).data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

export const setSelectedAddress = createAsyncThunk(
  'user/selectAddress',
  async({addressid},{rejectWithValue})=>{
    try{
      const res = axios.patch(`/api/address/setorderaddress/${addressid}`)
      toast.promise(res,{
        loading : "Changing order address",
        success : (res)=>res?.data?.message,
        error : (err)=>err?.response?.data?.message
      })
      return (await res).data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

export const fetchMyOrders = createAsyncThunk(
  'user/fetchorders',
  async(_,{rejectWithValue})=>{
    try{
      const promise = await axios.get('/api/users/myorders',{withCredentials : true})
      return promise.data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers : (builder)=>{
    builder.addCase(signin.fulfilled,(state,action)=>{
        state.isLoggedIn = true,
        state.user = action?.payload?.data,
        localStorage.setItem('user',JSON.stringify(action?.payload?.data))
        localStorage.setItem('loggedInStatus',true)
        console.log(action.payload.data)
    })
    builder.addCase(signout.fulfilled,(state,action)=>{
        state.isLoggedIn = false,
        state.user = {},
        localStorage.clear()
    })
    builder.addCase(validateUser.fulfilled,(state,action)=>{
      state.isLoggedIn = true,
      state.user = action.payload
    })
    builder.addCase(validateUser.rejected,(state,action)=>{
      state.isLoggedIn = false,
      state.user = {}
    })
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.user.address = action.payload.addresses
      state.user.selectedAddress = action.payload.selectedAddress
      const updatedUser = {
        ...state.user,
        address: action.payload.addresses,
        selectedAddress: action.payload.selectedAddress,
      }
      state.user = updatedUser
      localStorage.setItem("user", JSON.stringify(updatedUser))
    })
    builder.addCase(setSelectedAddress.fulfilled,(state,action)=>{
      state.user.selectedAddress = action.payload.selectedAddress
      const updatedUser = {
        ...state.user,
        selectedAddress : action.payload.selectedAddress,
        address : action.payload.address
      }
      state.user = updatedUser
      localStorage.setItem('user',JSON.stringify(updatedUser))
    })
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      const updatedUser = {
        ...state.user,
        orders: action.payload.data,
      };
      state.user = updatedUser;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    });    
  }
});

export default userSlice.reducer;
