import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../features/game/gameSlice";
import LogInForm from "./auth/LogInForm";
import { useEffect, useState } from "react";
import Modal from "./modals/Modal";
import SignUpForm from "./auth/SignUpForm";
import { Toaster } from "react-hot-toast";
import { logOut } from "../features/user/userSlice";
import Leaderboard from "./Leaderboard";

const Menu = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (showLeaderboard) {
      if (!loggedIn) {
        setShowLoginModal(true);
        setShowLeaderboard(false);
      } else {
        setShowLeaderboard(true);
      }
    }
  }, [loggedIn, showLeaderboard]);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  const handleRedirect = () => {
    console.log(showLoginModal, showSignUpModal);
    if (showLoginModal) {
      setShowLoginModal(false);
      setShowSignUpModal(true);
    } else if (showSignUpModal) {
      setShowSignUpModal(false);
      setShowLoginModal(true);
    }
  };
  const handleLogOut = () => {
    dispatch(logOut());
  };

  if (showLeaderboard && loggedIn) {
    return <Leaderboard onClose={handleCloseLeaderboard} />;
  } else {
    return (
      <div className="main-menu">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "0.4em",
              zIndex: "9999",
            },
          }}
        ></Toaster>

        <Modal
          handleRedirect={handleRedirect}
          title="Log in"
          isOpen={showLoginModal}
          onClose={handleCloseLoginModal}
        >
          <LogInForm closeLoginModal={handleCloseLoginModal} />
          <p className="form-redirect">
            Don't have an account yet?{" "}
            <span onClick={handleRedirect} className="custom-link">
              Sign up
            </span>
          </p>
        </Modal>

        <Modal
          handleRedirect={handleRedirect}
          title="Sign up"
          isOpen={showSignUpModal}
          onClose={handleCloseSignUpModal}
        >
          <SignUpForm closeSignUpModal={handleCloseSignUpModal} />
          <p className="form-redirect">
            Already have an account?{" "}
            <span onClick={handleRedirect} className="custom-link">
              Log in
            </span>
          </p>
        </Modal>
        {loggedIn ? (
          <div className="top-left">
            <button onClick={handleLogOut} className="login-button">
              Log out
            </button>
          </div>
        ) : (
          <div className="top-left">
            <button
              onClick={() => setShowLoginModal(true)}
              className="login-button"
            >
              Log in
            </button>
            <button
              onClick={() => setShowSignUpModal(true)}
              className="signup-button"
            >
              Sign up
            </button>
          </div>
        )}
        <div className="centered-buttons">
          <button
            onMouseEnter={(e) => {
              e.target.classList.add("outline");
            }}
            onMouseLeave={(e) => {
              e.target.classList.remove("outline");
            }}
            onClick={() => dispatch(startGame())}
            className="new-game-button"
          >
            New Game
          </button>
          <button
            onClick={handleShowLeaderboard}
            onMouseEnter={(e) => {
              e.target.classList.add("outline");
            }}
            onMouseLeave={(e) => {
              e.target.classList.remove("outline");
            }}
            className="leaderboard-button"
          >
            Leaderboard
          </button>
        </div>
      </div>
    );
  }
};

export default Menu;
