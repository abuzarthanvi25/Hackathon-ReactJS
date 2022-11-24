import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducer/loginReducer";

const store = configureStore({
  reducer: {
    loginReducer: loginSlice,
  },
});

export default store;
