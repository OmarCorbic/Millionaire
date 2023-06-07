// ******** React imports ********
import React, { useCallback, useState, useEffect, useRef } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import axios from "axios";
// ******** Component imports ********
import ValidationDialog from "../modals/ValidationDialog";
import Confirmation from "../modals/Confirmation";
import AudienceJoker from "../jokers/AudienceJoker";
import FriendJoker from "../jokers/FriendJoker";
// ******** Sound imports ********
import { Howl } from "howler";
import LetsPlay from "../../sounds/letsPlay.mp3";
// ******** Context imports ********
import { useDispatch, useSelector } from "react-redux";
import { endGame, nextLevel, resetLevel } from "../../features/game/gameSlice";

const MainSection = ({ handleGameWon, questionsData }) => {
  const {
    game: { level },
    joker: { joker },
    user: { loggedIn, user },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  // ******** Question related state and side effect ********

  const [currentQuestion, setCurrentQuestion] = useState(questionsData[level]);
  useEffect(() => {
    level === 0 && playSound(LetsPlay);
    level <= 13 && setCurrentQuestion({ ...questionsData[level] });

    return () => {
      buttonRef.current = null;
      setShowAudienceJoker(false);
      setShowFriendJoker(false);
      setCurrentQuestion(null);
    };
  }, [level, questionsData]);

  // ******** Joker related state, side effect and functions and callbacks ********

  const [showAudienceJoker, setShowAudienceJoker] = useState(false);
  const [showFriendJoker, setShowFriendJoker] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  useEffect(() => {
    switch (joker) {
      case "FRIEND":
        setShowFriendJoker(true);
        break;
      case "FIFTY_FIFTY":
        showFiftyFiftyJoker();
        break;
      case "AUDIENCE":
        setShowAudienceJoker(true);
        break;
      default:
        break;
    }
  }, [joker]);

  const showFiftyFiftyJoker = () => {
    const correctAnswerLetter = currentQuestion.shuffledAnswers.find(
      (answer) => answer.text === currentQuestion.correctAnswer
    ).id;
    let randomWrongLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 4)
    );
    while (randomWrongLetter === correctAnswerLetter) {
      randomWrongLetter = String.fromCharCode(
        65 + Math.floor(Math.random() * 4)
      );
    }

    const newAnswers = currentQuestion.shuffledAnswers.map((answer) => {
      if (
        answer.text === currentQuestion.correctAnswer ||
        answer.id === randomWrongLetter
      ) {
        return answer;
      } else {
        return { ...answer, text: "" };
      }
    });
    setCurrentQuestion((prevQuestion) => {
      return { ...prevQuestion, shuffledAnswers: [...newAnswers] };
    });
  };

  const closeJoker = useCallback((joker) => {
    switch (joker) {
      case "AUDIENCE":
        setShowAudienceJoker(false);
        break;
      case "FRIEND":
        setShowFriendJoker(false);
        break;
      default:
        break;
    }
  }, []);

  // ******** Answer confirmation and validation related state and callbacks ********

  const [answered, setAnswered] = useState("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleAnswer = (button, answer) => {
    buttonRef.current = button;
    button.classList.add("chosen");
    setAnswered(answer);
    setShowConfirmDialog(true);
    setShowAudienceJoker(false);
    setShowFriendJoker(false);
  };

  const handleConfirm = useCallback(async () => {
    buttonRef.current.classList.remove("chosen");

    if (answered === currentQuestion.correctAnswer) {
      if (level === 13) {
        handleGameWon();
        setAnsweredCorrectly(true);
        buttonRef.current.classList.add("correct");
      } else {
        setAnsweredCorrectly(true);
        setShowValidationDialog(true);
        buttonRef.current.classList.add("correct");
      }
    } else {
      buttonRef.current.classList.add("incorrect");
      setAnsweredCorrectly(false);
      setShowValidationDialog(true);
      if (loggedIn) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token available");
          }
          const response = await axios.patch(
            `http://localhost:3000/api/v1/score/reset`,
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          console.log(response.data.message);
        } catch (error) {
          console.log(error);
        }
      }
    }

    setShowConfirmDialog(false);
  }, [answered, currentQuestion]);

  const handleCancel = useCallback(() => {
    setShowConfirmDialog(false);
    setAnswered("");
    buttonRef.current.classList.remove("chosen");
  }, []);

  const handleNextQuestion = useCallback(() => {
    dispatch(nextLevel());
    setShowValidationDialog(false);
    buttonRef.current.classList.remove("correct");
    buttonRef.current.classList.remove("incorrect");
  }, [nextLevel]);

  const playSound = (src) => {
    const sound = new Howl({ src });
    sound.play();
  };

  // ******** Render ********
  return (
    <div className="main-section-wrapper">
      {loggedIn && (
        <div className="top-left">
          Playing as <span style={{ color: "orange" }}>{user}</span>
        </div>
      )}
      <div
        onClick={() => dispatch(endGame())}
        style={{ cursor: "pointer" }}
        className="top-right"
      >
        <BsFillArrowLeftSquareFill size={30} color="orange" />
      </div>
      <div className="pop-ups">
        <div>{showFriendJoker && <FriendJoker onClose={closeJoker} />}</div>
        <div>
          {showConfirmDialog && (
            <Confirmation
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
              answered={answered}
            />
          )}
        </div>
        <div>
          {showAudienceJoker && (
            <AudienceJoker
              onClose={closeJoker}
              answers={currentQuestion.shuffledAnswers}
              correctAnswer={currentQuestion.correctAnswer}
            />
          )}
        </div>
      </div>

      {showValidationDialog && (
        <ValidationDialog
          onNextQuestion={handleNextQuestion}
          answeredCorrectly={answeredCorrectly}
        />
      )}

      <div className="hexagon-question-wrapper">
        <div className="hexagon-question">{currentQuestion.question}</div>
      </div>

      <div
        className={`answers-wrapper${
          showConfirmDialog || showValidationDialog ? " unclickable" : ""
        }`}
      >
        {currentQuestion.shuffledAnswers.map((answer) => {
          return (
            <div key={answer.id} className={`hexagon-answer-wrapper`}>
              <button
                ref={buttonRef}
                onClick={(e) => handleAnswer(e.target, answer.text)}
                className={`hexagon-answer ${!answer.text && "unclickable"} `}
              >
                <span>{answer.id + ":"}</span>
                <p>{answer.text}</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainSection;
