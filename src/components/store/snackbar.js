import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false, message: "", type: "info" };

const snackbarSlice = createSlice({
  name: "snackbarmsg",
  initialState,
  reducers: {
    showMsg(state, action) {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    closeMsg(state) {
      state.open = false;
    },
  },
});

export const { showMsg, closeMsg } = snackbarSlice.actions;
export default snackbarSlice.reducer;
