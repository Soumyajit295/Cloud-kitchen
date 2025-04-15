import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSignin: false,
    showSignup: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setShowSignin: (state, action) => {
            state.showSignin = action.payload;
        },
        setShowSignup: (state, action) => {
            state.showSignup = action.payload;
        },
        onSwitchToSignup: (state) => {
            state.showSignin = false;
            state.showSignup = true;
        },
        onSwitchToSignin: (state) => {
            state.showSignin = true;
            state.showSignup = false;
        },
    },
});

export const {
    setShowSignin,
    setShowSignup,
    onSwitchToSignup,
    onSwitchToSignin,
} = authSlice.actions;

export default authSlice.reducer;
