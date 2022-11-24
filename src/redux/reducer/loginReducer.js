import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginReducer",
  initialState: {
    email: "",
    password: "",
    userName: "",
  },
  reducers: {
    add(state, action) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    edit(state, action) {},
    delete(state, action) {},
  },
});

export const { add, edit } = loginSlice.actions;

export default loginSlice.reducer;
