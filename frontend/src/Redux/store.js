import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slices/userauthSlice';
import authSlice from './Slices/authSlice';
import adminSlice from './Slices/adminSlice';
import foodSlice from './Slices/foodSlice';
import cartSlice from './Slices/cartSlice';
import orderSlice from './Slices/orderSlice';
import addressSlice from './Slices/addressSlice';

const store = configureStore({
    reducer : {
        user : userSlice,
        auth : authSlice,
        admin : adminSlice,
        food : foodSlice,
        cart : cartSlice,
        order : orderSlice,
        address : addressSlice
    }
})

export default store