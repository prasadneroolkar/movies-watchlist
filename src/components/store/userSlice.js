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
      console.log("userid", userid);

      const allUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
      console.log("allUsers", allUsers);

      const userExists = allUsers.some((user) => user.id === userid);
      console.log("userExists", userExists);

      if (userExists) {
        const finduser = allUsers.find((user) => user.id === userid);
        console.log("finduser", finduser);
        const finalUpdate = {
          ...finduser,
          userPic,
          username,
          email,
          password,
        };
        console.log("finfinalUpdateduser", finalUpdate);
      }
      const updateUsers = { ...state, userPic, username, email, password };
      // localStorage.setItem("userDetails", JSON.stringify(updateUsers));

      return updateUsers;
    },
  },
});

export const { loggedinUsers, updateUser } = userSlice.actions;
export default userSlice.reducer;
