import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: 0,
  gameOn: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    nextLevel: (state) => {
      state.level <= 13 && ++state.level;
    },
    resetLevel: (state) => {
      state.level = 0;
    },
    startGame: (state) => {
      state.gameOn = true;
      state.level = 0;
    },
    endGame: (state) => {
      state.gameOn = false;
      state.level = 0;
    },
  },
});

export default gameSlice.reducer;
export const { nextLevel, resetLevel, startGame, endGame } = gameSlice.actions;
