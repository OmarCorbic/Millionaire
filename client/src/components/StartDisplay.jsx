import MainSection from "./game/MainSection.jsx";
import Ladder from "./game/Ladder.jsx";
import { useState, useEffect } from "react";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { endGame, resetLevel } from "../features/game/gameSlice.js";
import { useJoker } from "../features/joker/jokerSlice.js";
import Menu from "./Menu.jsx";
import axios from "axios";
import MillionaireDisplay from "./MillionaireDisplay.jsx";

const StartDisplay = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isMillionaire, setIsMillionaire] = useState(false);
  const {
    game: { gameOn },
    user: { loggedIn },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const dataFetch = async () => {
      const result = (
        await Promise.all([
          fetch(
            "https://the-trivia-api.com/api/questions?limit=5&difficulty=medium"
          ),
          fetch(
            "https://the-trivia-api.com/api/questions?limit=9&difficulty=hard"
          ),
        ])
      ).map((r) => r.json());

      const [mediumQuestions, hardQuestions] = await Promise.all(result);

      const allQuestions = [...mediumQuestions, ...hardQuestions].map(
        ({ question, correctAnswer, incorrectAnswers }) => {
          const shuffledAnswers = _.shuffle([
            correctAnswer,
            ...incorrectAnswers,
          ]).map((answer, index) => {
            return {
              id: String.fromCharCode(65 + index),
              text: answer,
            };
          });
          return {
            question: question,
            correctAnswer: correctAnswer,
            shuffledAnswers: shuffledAnswers,
          };
        }
      );

      setQuestionsData([...allQuestions]);
    };

    !gameOn && dataFetch();

    return () => {
      setIsMillionaire(false);
      dispatch(resetLevel());
      dispatch(useJoker(""));
    };
  }, [gameOn]);

  const handleGameWon = async () => {
    dispatch(resetLevel());
    setIsMillionaire(true);
    if (loggedIn) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        const response = await axios.patch(
          `http://localhost:3000/api/v1/score/update`,
          {
            isMillionaire: true,
          },
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
  };

  if (!gameOn) {
    return (
      <div className="start-display">
        <Menu />
      </div>
    );
  } else {
    if (isMillionaire) {
      return <MillionaireDisplay />;
    } else {
      return (
        <div className="container">
          <MainSection
            handleGameWon={handleGameWon}
            questionsData={questionsData}
          />
          <Ladder />
        </div>
      );
    }
  }
};

export default StartDisplay;
