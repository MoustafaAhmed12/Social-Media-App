import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI) => {
    const user = jwtDecode(localStorage.getItem("userToken"));
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/user/${user._id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: {}, isLoading: false, error: '' },
  reducers: {
    logOutFun: (state, action) => {
      state.currentUser = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      });
  },
});

export const { logOutFun } = userSlice.actions;
export default userSlice.reducer;
