import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./userSlice"

const store=configureStore({
    reducer:{
        users:usersSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;
