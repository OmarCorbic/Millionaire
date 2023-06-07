import { useSelector } from "react-redux";
import Jokers from "../jokers/Jokers";

const Ladder = () => {
  const level = useSelector((state) => state.game.level);

  const ladderValues = [
    500, 1000, 2000, 3000, 5000, 7000, 10000, 20000, 30000, 50000, 100000,
    250000, 500000, 1000000,
  ];

  const breakPoints = [5000, 50000, 1000000];

  return (
    <div className="ladder-wrapper">
      <Jokers />
      <div className="levels">
        {ladderValues.map((step, index) => {
          return (
            <div
              key={index}
              className={`${breakPoints.includes(step) ? "break-point" : ""}${
                level === index ? " current-step" : ""
              }`}
            >
              {" "}
              <span>{index + 1}</span> $ {step}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ladder;
