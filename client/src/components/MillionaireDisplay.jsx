import React from "react";
import { useDispatch } from "react-redux";
import { endGame } from "../features/game/gameSlice";

const MillionaireDisplay = () => {
  const dispatch = useDispatch();
  return (
    <div className="start-display">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p className="congrats">CONGRATULATIONS, YOU ARE A MILLIONAIRE!</p>
        <button
          onMouseEnter={(e) => {
            e.target.classList.add("outline");
          }}
          onMouseLeave={(e) => {
            e.target.classList.remove("outline");
          }}
          style={{ width: "40%" }}
          className="new-game-button"
          onClick={() => dispatch(endGame())}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default MillionaireDisplay;
