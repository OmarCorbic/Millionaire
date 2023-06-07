import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  joker: "",
};

const jokerSlice = createSlice({
  name: "joker",
  initialState,
  reducers: {
    useJoker: (state, action) => {
      state.joker = action.payload;
    },
  },
});

export default jokerSlice.reducer;
export const { useJoker } = jokerSlice.actions;
