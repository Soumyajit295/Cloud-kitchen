import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slices/userauthSlice';
import authSlice from './Slices/authSlice';
import adminSlice from './Slices/adminSlice';

const store = configureStore({
    reducer : {
        user : userSlice,
        auth : authSlice,
        admin : adminSlice
    }
})

export default store