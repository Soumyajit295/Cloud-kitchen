import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: JSON.parse(localStorage.getItem("loggedInStatus")) || false,
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
  }
});

export default userSlice.reducer;
