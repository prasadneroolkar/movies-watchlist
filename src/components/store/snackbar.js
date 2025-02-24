import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false, message: "" };

const snackbarSlice = createSlice({
  name: "snackbarmsg",
  initialState,
  reducers: {
    showMsg(state, action) {
      state.open = true;
      state.message = action.payload;
    },
    closeMsg(state) {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showMsg, closeMsg } = snackbarSlice.actions;
export default snackbarSlice.reducer;
