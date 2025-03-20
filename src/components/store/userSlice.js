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

      const userIndex = allUsers.findIndex((user) => user.id === userid);
      console.log("userExists", userIndex);

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
      // const updateUsers = { ...state, userPic, username, email, password };
      // if (updateUser) {
      //   localStorage.setItem("currentUser", JSON.stringify(updateUsers));
      // }

      return allUsers;
    },
  },
});

export const { loggedinUsers, updateUser } = userSlice.actions;
export default userSlice.reducer;
