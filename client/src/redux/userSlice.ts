import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "../types/user.type";
import axios from "axios";

type User = {
  loading: boolean;
  data: UserInfoType[];
};

const initialState: User = {
  loading: false,
  data: [],
};

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    return data.data;
  } catch (err) {
    return err;
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

//export const {  } = usersSlice.actions;
export default usersSlice.reducer;
