import { FaPhoneAlt } from "react-icons/fa";
import { BsFillPeopleFill, BsHexagonHalf } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJoker } from "../../features/joker/jokerSlice";

const Jokers = () => {
  const { gameOn } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const friendBtnRef = useRef();
  const fiftyBtnRef = useRef();
  const audienceBtnRef = useRef();

  useEffect(() => {
    if (!gameOn) {
      friendBtnRef.current.classList.remove("unclickable");
      fiftyBtnRef.current.classList.remove("unclickable");
      audienceBtnRef.current.classList.remove("unclickable");
    }
  }, [gameOn]);

  const handleClick = (e) => {
    if (!e.target.classList.contains("unclickable")) {
      e.target.classList.add("unclickable");
    }
    dispatch(useJoker(e.target.id));
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
