import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ id }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/posts/timeline/${id}`
      );
      dispatch(getPostsByDates());
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPosts = createAsyncThunk(
  "post/createPosts",
  async ({ postData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/post",
        postData
      );
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: { posts: [], isLoading: false, error: "" },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;

        state.isLoading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      // Insert a new Post
      .addCase(createPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error);
      });
  },
  reducers: {
    getPostsByDates: (state) => {
      state.posts = state.posts.sort(
        (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
      );
    },
  },
});

export const { getPostsByDates } = postSlice.actions;
export default postSlice.reducer;
