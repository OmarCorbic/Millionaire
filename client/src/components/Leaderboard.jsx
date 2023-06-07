import React, { useEffect, useState } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFire,
  BsFillTrophyFill,
} from "react-icons/bs";
import axios from "axios";

const Leaderboard = ({ onClose }) => {
  const [leaderboardState, setLeaderboardState] = useState({
    loading: true,
    users: [],
    error: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLeaderboardState((prevState) => {
            return {
              ...prevState,
              loading: false,
              error: "No token available",
            };
          });
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/v1/score/leaderboard",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const { users } = response.data;

        setLeaderboardState((prevState) => {
          return { ...prevState, loading: false, users: users };
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="leaderboard-display">
      <div onClick={onClose} style={{ cursor: "pointer" }} className="top-left">
        <BsFillArrowLeftSquareFill size={30} color="orange" />
      </div>{" "}
      <div className="leaderboard">
        {leaderboardState.loading ? (
          "Loading..."
        ) : leaderboardState.error ? (
          leaderboardState.error
        ) : (
          <>
            <div className="row">
              <span className="index">
                <BsFillTrophyFill color="white" />
              </span>
              <span className="name">Name</span>
              <span className="times-millionaire">TM</span>
              <span className="win-streak">
                <BsFire />
              </span>
            </div>
            {leaderboardState.users?.map((user, index) => {
              return (
                <div key={index} className="row">
                  <span className="index">{index + 1}.</span>
                  <span className="name">{user.name}</span>
                  <span className="times-millionaire">
                    {user.timesMillionaire}
                  </span>
                  <span className="win-streak">{user.winStreak}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
