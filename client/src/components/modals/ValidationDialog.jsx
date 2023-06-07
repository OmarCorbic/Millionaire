import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { endGame } from "../../features/game/gameSlice";
// sounds
import { Howl } from "howler";
import IncorrectAnswer from "../../sounds/incorrectAnswer.mp3";
import CorrectAnswer from "../../sounds/correctAnswer.mp3";
// image
import image from "../../images/studio.jpg";

const ValidationDialog = ({ onNextQuestion, answeredCorrectly }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (answeredCorrectly) {
      playSound(CorrectAnswer);
    } else {
      playSound(IncorrectAnswer);
    }
  });

  const playSound = (src) => {
    const sound = new Howl({ src });
    sound.play();
  };

  if (answeredCorrectly) {
    return (
      <div
        className="validation-dialog-box"
        style={{ border: "1px solid #70ad47", color: "#70ad47" }}
      >
        <div className="image-wrapper">
          <img src={image} alt="correct answer" />
        </div>
        <p>Your answer is correct!</p>
        <button onClick={onNextQuestion} className="btn">
          Next question
        </button>
      </div>
    );
  } else {
    return (
      <div
        className="validation-dialog-box"
        style={{ border: "1px solid red", color: "red" }}
      >
        <div className="image-wrapper">
          <img src={image} alt="incorrect answer" />
        </div>
        <p>Your answer is incorrect!</p>
        <button onClick={() => dispatch(endGame())} className="btn">
          Play again
        </button>
      </div>
    );
  }
};

export default ValidationDialog;
