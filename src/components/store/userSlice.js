import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loggedinUsers(state) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
      return currentUser;
    },

    updateUser(state, action) {
      const profilepic = action.payload.profilepic;
      const username = action.payload.username;
      const email = action.payload.email;
      const password = action.payload.password;

      const allUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
      console.log("allUsers", allUsers);

      // const userExists = allUsers.some((user) => user.email === email);
      // console.log("userExists", userExists);

      // if (userExists) {
      const finduser = allUsers.find((user) => user.email === email);

      const finalUpdate = {
        ...finduser,
        profilepic,
        username,
        email,
        password,
      };
      console.log("finfinalUpdateduser", finalUpdate);
      // localStorage.setItem("userDetails", JSON.stringify(finalUpdate));

      const updateUsers = { ...state, profilepic, username, email, password };

      return updateUsers;
    },
  },
});

export const { loggedinUsers, updateUser } = userSlice.actions;
export default userSlice.reducer;
