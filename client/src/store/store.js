import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import jokerReducer from "../features/joker/jokerSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    joker: jokerReducer,
    user: userReducer,
  },
});

export default store;
