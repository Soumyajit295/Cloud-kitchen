import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slices/userauthSlice';
import authSlice from './Slices/authSlice';

const store = configureStore({
    reducer : {
        user : userSlice,
        auth : authSlice
    }
})

export default store