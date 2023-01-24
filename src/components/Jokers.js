import { FaPhoneAlt } from "react-icons/fa";
import { BsFillPeopleFill, BsHexagonHalf } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { GameContext } from "./StartDisplay";
import { useContext } from "react";

const Jokers = ({ onJokerCall }) => {
  const { gameOn } = useContext(GameContext);

  const friendBtnRef = useRef();
  const fiftyBtnRef = useRef();
  const audienceBtnRef = useRef();

  useEffect(() => {
    if (!gameOn) {
      friendBtnRef.current.classList.remove("unclickable");
      fiftyBtnRef.current.classList.remove("unclickable");
      audienceBtnRef.current.classList.remove("unclickable");
    }

    //console.log('Jokers useEffect triggered!');
  }, [gameOn]);

  const handleClick = (e) => {
    if (!e.target.classList.contains("unclickable")) {
      e.target.classList.add("unclickable");
    }
    onJokerCall(e.target.id);
  };

  return (
    <div className="jokers-wrapper">
      <button ref={friendBtnRef} id="FRIEND" onClick={(e) => handleClick(e)}>
        {" "}
        <FaPhoneAlt className="unclickable" color="white" />{" "}
      </button>
      <button
        ref={fiftyBtnRef}
        id="FIFTY_FIFTY"
        onClick={(e) => handleClick(e)}
      >
        {" "}
        <BsHexagonHalf className="unclickable" color="white" />{" "}
      </button>
      <button
        ref={audienceBtnRef}
        id="AUDIENCE"
        onClick={(e) => handleClick(e)}
      >
        {" "}
        <BsFillPeopleFill className="unclickable" color="white" />{" "}
      </button>
    </div>
  );
};

export default Jokers;
