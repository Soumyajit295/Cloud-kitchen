import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slices/userauthSlice'

const store = configureStore({
    reducer : {
        user : userSlice
    }
})

export default store