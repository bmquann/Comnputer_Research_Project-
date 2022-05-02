import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isAdmin: false,
    users:null,
    user:null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.error= false;
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isAdmin=action.payload.user.isAdmin
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
      localStorage.clear()
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
    findUserSuccess: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure,getUsersSuccess,findUserSuccess,logout } = userSlice.actions;
export default userSlice.reducer;
