import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  loggedIn: false,
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { name } = action.payload;
      state.loggedIn = true;
      state.user = name;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.user = "";
      localStorage.removeItem("token");
      toast.success("Logged out");
    },
  },
});

export default userSlice.reducer;
export const { logIn, logOut } = userSlice.actions;
