import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  orderDetail : null,
  key : null,
  paymentStatus : null,
  allOrders: [],
  loading: false,
};

export const createCODorder = createAsyncThunk(
  "user/codorder",
  async (_, { rejectWithValue }) => {
    try {
      const res = axios.post("/api/order/createorder", null, {
        withCredentials: true,
      });
      toast.promise(res, {
        loading: "Placing order",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message,
      });
      return (await res).data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createOnlineOrder = createAsyncThunk(
  'user/createOnlineorder',
  async(_,{rejectWithValue})=>{
    try{
      const res = await axios.post('/api/payment/createrazorpayorder',{withCredentials : true})
      console.log("Razorpay orderid : ",res.data)
      return res.data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

export const getKey = createAsyncThunk(
  'order/getKey',
  async(_,{rejectWithValue})=>{
    try{
      const res = await axios.get('/api/payment/getkey',{withCredentials : true})
      console.log("Key Data : ",res.data)
      return res.data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

export const verifyPayment = createAsyncThunk(
  'order/verifyPayment',
  async({paymentData},{rejectWithValue})=>{
    console.log(paymentData)
    try{
      const res = await axios.post('/api/payment/verifypayment',paymentData)
      console.log("Verify payment res : ",res.data)
      return res.data
    }
    catch(err){
      return rejectWithValue(err.message)
    }
  }
)

export const getAllOrders = createAsyncThunk(
  "admin/allorders",
  async (_, { rejectWithValue }) => {
    try {
      const res = axios.get("/api/order/allorder", {
        withCredentials: true,
      });
      toast.promise(res, {
        loading: "Fetching all orders",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message,
      });
      return (await res).data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderid, orderStatus }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/order/updateorder/${orderid}`, {
        orderStatus,
      });
      toast.success("Order status updated");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.allOrders.findIndex(
          (order) => order._id === action.payload.orderid
        );
        if (index !== -1) {
          state.allOrders[index].orderStatus = action.payload.orderStatus;
        }
      })
      .addCase(createOnlineOrder.pending,(state,action)=>{
        state.loading = true
      })
      .addCase(createOnlineOrder.fulfilled,(state,action)=>{
        state.loading = false,
        state.orderDetail = action.payload.data
      })
      .addCase(getKey.fulfilled,(state,action)=>{
        state.key = action.payload.data
      })
      .addCase(verifyPayment.fulfilled,(state,action)=>{
        state.paymentStatus = action.payload.success
      })
  },
});

export default orderSlice.reducer;
