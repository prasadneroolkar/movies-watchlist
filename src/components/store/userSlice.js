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
      const userid = action.payload.id;
      const userPic = action.payload.userPic;
      const username = action.payload.username;
      const email = action.payload.email;
      const password = action.payload.password;

      const allUsers = JSON.parse(localStorage.getItem("userDetails")) || [];

      const userIndex = allUsers.findIndex((user) => user.id === userid);

      if (userIndex !== -1) {
        allUsers[userIndex] = {
          ...allUsers[userIndex],
          userPic,
          username,
          email,
          password,
        };
        localStorage.setItem("userDetails", JSON.stringify(allUsers));
        localStorage.setItem(
          "currentUser",
          JSON.stringify(allUsers[userIndex])
        );
      }

      return allUsers;
    },
  },
});

export const { loggedinUsers, updateUser } = userSlice.actions;
export default userSlice.reducer;
