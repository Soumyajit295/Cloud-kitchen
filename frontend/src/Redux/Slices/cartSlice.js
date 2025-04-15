import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { validateUser } from "./userauthSlice";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    cartItem : [],
    totalBill : 0,
    cartLoading : false
}

export const addToCart = createAsyncThunk(
    'user/addtocart',
    async ({ ingridiants }, { dispatch, rejectWithValue }) => {
      dispatch(validateUser())
      try {
        const promise = axios.post('/api/cart/addtocart', { ingridiants });
  
        toast.promise(promise, {
          loading: "Adding to cart...",
          success: (res) => res?.data?.message || "Added to cart!",
          error: (err) => err?.response?.data?.message || "Failed to add to cart",
        });
  
        const res = await promise;
        console.log("Res : ", res);
        return res.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const getCartDetails = createAsyncThunk(
    'user/getCart',
    async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get('/api/cart/getcart')
            console.log("Response : ",res.data)
            return res.data
        }
        catch(err){
            return rejectWithValue(err.message)
        }
    }
)

export const updateCartQuantity = createAsyncThunk(
    'user/updateCart',
    async({foodid,quantity},{rejectWithValue})=>{
        try{
            const res = axios.patch(`/api/cart/updatequantity/${foodid}`,{quantity})
            toast.promise(res,{
                loading : "Updating quantity",
                success : (res)=>res.data.message,
                error : (error)=>error.response.data.message
            })
            return (await res).data
        }
        catch(err){
            return rejectWithValue(err.message)
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removefood',
    async(foodid,{rejectWithValue})=>{
        console.log("FoodId : ",foodid)
        try{
            const res = axios.post(`/api/cart/removefromcart/${foodid}`)
            toast.promise(res,{
                loading : "Removing food from cart",
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
  
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(addToCart.pending,(state,action)=>{
            state.cartLoading = true
        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.cartLoading = false
        })
        builder.addCase(getCartDetails.pending,(state,action)=>{
            state.cartLoading = true
        })
        builder.addCase(getCartDetails.fulfilled,(state,action)=>{
            state.cartLoading = false,
            state.cartItem = action.payload.data,
            state.totalBill = action.payload.totalCartValue
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.cartItem = action.payload.data;
            state.totalBill = action.payload.data.reduce((acc, item) => {
              return acc + (item.food.price * item.quantity);
            }, 0);
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.cartItem = action.payload.data;
            state.totalBill = action.payload.data.reduce((acc,item)=>{
                return acc+ (item.food.price * item.quantity);
            },0);
        })
    }
})

export default cartSlice.reducer