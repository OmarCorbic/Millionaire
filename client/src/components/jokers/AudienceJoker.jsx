import { useEffect, useState } from "react";

const AudienceJoker = ({ onClose, answers, correctAnswer }) => {
  const [results, setResults] = useState([]);
  const random = (min, max) => Math.ceil(Math.random() * (max - min) + min);

  useEffect(() => {
    let total = 100;
    let correctResult = random(30, total);
    total -= correctResult;

    const correctId = answers.find(
      (answer) => answer.text === correctAnswer
    ).id;

    setResults(
      answers.map((answer) => {
        if (answer.id === correctId) {
          return { id: answer.id, result: correctResult };
        } else {
          const randomNum = random(0, total);
          total -= randomNum;
          return { id: answer.id, result: randomNum };
        }
      })
    );
    //console.log('Audience joker useEffect triggered!');
  }, [answers, correctAnswer]);

  return (
    <div className="jocker-window">
      <p>These are the results from audience: </p>
      <div className="audience-results">
        {results.map((value) => {
          return (
            <div
              key={value.id}
              style={{ height: "100%", width: `${value.result}%` }}
            >
              {value.id}
              {value.result + "%"}
            </div>
          );
        })}
      </div>
      <button
        id="AUDIENCE"
        onClick={(e) => onClose(e.target.id)}
        className="btn"
      >
        Close
      </button>
    </div>
  );
};

export default AudienceJoker;
