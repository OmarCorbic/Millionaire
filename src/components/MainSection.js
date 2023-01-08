import { useState, useEffect, useRef } from "react";
import React from 'react';
import _ from 'lodash';
import { Howl } from 'howler';

import Confirmation from "./Confirmation";
import AudienceJoker from "./AudienceJoker";
import FriendJoker from "./FriendJoker";
import ValidationDialog from "./ValidationDialog";

import LetsPlay from "../sounds/letsPlay.mp3";

const MainSection = ({ onPlayAgain, calledJoker, onLevelChange }) =>{

    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [answered, setAnswered] = useState('');
    const [level, setLevel] = useState(0);
    
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showAudienceJoker, setShowAudienceJoker] = useState(false);
    const [showFriendJoker, setShowFriendJoker] = useState(false);
    const [showFiftyFiftyJoker, setShowFiftyFiftyJoker] = useState(false);
    const [showValidationDialog, setShowValidationDialog] = useState(false);

    const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

    const buttonRef = useRef(null); 

    useEffect(() => {
        
        level === 0 && playSound(LetsPlay);

        let query = 'easy';

        if(level < 5){
            query = 'easy';
        }else if(level < 10){
            query = 'medium';
        }else if(level < 14){
            query = 'hard';
        }

        fetch("https://the-trivia-api.com/api/questions?limit=1&difficulty=" + query)
        .then(response => response.json())
        .then(([{question, correctAnswer, incorrectAnswers}]) => {
            setQuestion(question);
            setCorrectAnswer(correctAnswer);
            setShuffledAnswers(_.shuffle([...incorrectAnswers, correctAnswer]).map((answer, i) => {
               return {
                id: String.fromCharCode(65 + i),
                text: answer,
            };
            }));
            setShowAudienceJoker(false);
            setShowFriendJoker(false);
        })
        .catch(err => console.log(err));
        //console.log('Main section fetch useEffect triggered!');
        buttonRef.current = null;
    }, [level]);

    useEffect(() => {
        switch(calledJoker){
            case 'FRIEND':
                setShowFriendJoker(true);
                break;
            case 'FIFTY_FIFTY':
                setShowFiftyFiftyJoker(true);
                break;
            case 'AUDIENCE':
                setShowAudienceJoker(true);
                break;
            default:
            break;
        }
        console.log('Main section joker useEffect triggered!');
    }, [calledJoker]);

    const handleClick = (button, answer) =>{
        buttonRef.current = button;
        setAnswered(answer);
        setShowConfirmDialog(true);
        setShowAudienceJoker(false);
        setShowFriendJoker(false);
    }

    const handleConfirm = () => {
        buttonRef.current.classList.remove('chosen');

        if(answered === correctAnswer){
            buttonRef.current.classList.add('correct');
            setAnsweredCorrectly(true);
            setShowValidationDialog(true);
        }else{
            buttonRef.current.classList.add('incorrect')
            setAnsweredCorrectly(false);
            setShowValidationDialog(true);
        }
        setShowConfirmDialog(false);
    }
    
    const handleCancel = () => {
        setShowConfirmDialog(false);
        setAnswered('');
    }

    const closeJoker = (joker) =>{
        switch(joker){
            case 'AUDIENCE': 
                setShowAudienceJoker(false);
                break;
            case 'FRIEND': 
                setShowFriendJoker(false);
                break;
            default:
                break;
        }
    }   

    const handleNextQuestion = () =>{
        setLevel(level + 1, onLevelChange(level+1));
        setShowValidationDialog(false);
    }

    const playSound = (src) =>{
        const sound = new Howl({ src });
        sound.play();
    }

    return (
        <div className="main-section-wrapper">

            <div className="pop-ups">
                <div>
                    {showFriendJoker && (
                        <FriendJoker onClose={closeJoker} />
                    )}                    
                </div>
                <div>
                    {showConfirmDialog && (
                        <Confirmation handleConfirm={handleConfirm} handleCancel={handleCancel} answered={answered} />
                    )}
                </div>
                <div>
                    {showAudienceJoker && (
                        <AudienceJoker onClose={closeJoker} answers={shuffledAnswers} correctAnswer={correctAnswer}/>
                    )}
                </div>
            </div>

            {showValidationDialog && (
                <ValidationDialog onPlayAgain={onPlayAgain} onNextQuestion={handleNextQuestion} answeredCorrectly={answeredCorrectly}/>
                )}
          
            <div className="hexagon-question-wrapper">
                <div className="hexagon-question">{question}</div>
            </div>
            
            <div className={`answers-wrapper${showConfirmDialog || showValidationDialog ? ' unclickable':''}`}>
                {shuffledAnswers.map((answer) => {
                    return (
                        <div key={answer.id}  className="hexagon-answer-wrapper">
                            <button 
                                ref={buttonRef}
                                onClick={(e) => handleClick(e.target, answer.text)} 
                                className={`hexagon-answer${answer.text === answered ? ' chosen ' : ''}`}>
                                <span>{answer.id + ':'}</span>
                                <p>{answer.text}</p>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default MainSection;