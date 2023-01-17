import React, { useCallback } from 'react';
import { useState, useEffect, useRef } from "react";
import Confirmation from "./Confirmation";
import AudienceJoker from "./AudienceJoker";
import FriendJoker from "./FriendJoker";
import ValidationDialog from "./ValidationDialog";
import { Howl } from 'howler';
import LetsPlay from "../sounds/letsPlay.mp3";

const MainSection = ({ questionsData, onPlayAgain, calledJoker, onLevelChange }) =>{

    const [currentQuestion, setCurrentQuestion] = useState(questionsData[0]);
    const [answered, setAnswered] = useState('');
    const [level, setLevel] = useState(0);
    
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showAudienceJoker, setShowAudienceJoker] = useState(false);
    const [showFriendJoker, setShowFriendJoker] = useState(false);  
    const [showValidationDialog, setShowValidationDialog] = useState(false);

    const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

    const buttonRef = useRef(null); 

    useEffect(() => {
        level === 0 && playSound(LetsPlay);

        setCurrentQuestion({...questionsData[level]});
        return () => {
            buttonRef.current = null;
            setShowAudienceJoker(false);
            setShowFriendJoker(false);
            setCurrentQuestion(null);
        }
    }, [level, questionsData]);

    useEffect(() => {
        switch(calledJoker){
            case 'FRIEND':
                setShowFriendJoker(true);
                break;
                case 'FIFTY_FIFTY':
                    showFiftyFiftyJoker();
                    break;
            case 'AUDIENCE':
                setShowAudienceJoker(true);
                break;
            default:
            break;
        }
    }, [calledJoker]);
    
    const handleClick = (button, answer) =>{
        buttonRef.current = button;
        button.classList.add('chosen');
        setAnswered(answer);
        setShowConfirmDialog(true);
        setShowAudienceJoker(false);
        setShowFriendJoker(false);
    }

    const handleConfirm = useCallback(() => {
        buttonRef.current.classList.remove('chosen');
        
        if(answered === currentQuestion.correctAnswer){
            buttonRef.current.classList.add('correct');
            setAnsweredCorrectly(true);
            setShowValidationDialog(true);
        }else{
            buttonRef.current.classList.add('incorrect')
            setAnsweredCorrectly(false);
            setShowValidationDialog(true);
        }
        setShowConfirmDialog(false);
    }, [answered, currentQuestion]);
    
    const handleCancel = useCallback(() => {
        setShowConfirmDialog(false);
        setAnswered('');
        buttonRef.current.classList.remove('chosen');
    }, []);
    
    const closeJoker = useCallback((joker) =>{
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
    }, []);   

    const handleNextQuestion = useCallback(() =>{
        setLevel(level + 1, onLevelChange(level+1));
        setShowValidationDialog(false);
        buttonRef.current.classList.remove('correct');
        buttonRef.current.classList.remove('incorrect');
    }, [level, onLevelChange]);
    

    const playSound = (src) =>{
        const sound = new Howl({ src });
        sound.play();
    }

    const showFiftyFiftyJoker = () =>{
        const correctAnswerLetter = currentQuestion.shuffledAnswers.find(answer => answer.text === currentQuestion.correctAnswer).id;
        let randomWrongLetter = String.fromCharCode(65 + Math.floor(Math.random() * 4));
        while(randomWrongLetter === correctAnswerLetter){
            randomWrongLetter = String.fromCharCode(65 + Math.floor(Math.random() * 4));
        }
        
        const newAnswers = currentQuestion.shuffledAnswers.map(answer => {
            if(answer.text === currentQuestion.correctAnswer || answer.id === randomWrongLetter){
                return answer;   
            }else{
                return {...answer, text: ''};
            }
        });
        
        setCurrentQuestion(prevQuestion => {
            return {...prevQuestion, shuffledAnswers: [...newAnswers]}
        })
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
                        <AudienceJoker onClose={closeJoker} answers={currentQuestion.shuffledAnswers} correctAnswer={currentQuestion.correctAnswer}/>
                    )}
                </div>
            </div>

            {showValidationDialog && (
                <ValidationDialog onPlayAgain={onPlayAgain} onNextQuestion={handleNextQuestion} answeredCorrectly={answeredCorrectly}/>
                )}
          
            <div className="hexagon-question-wrapper">
                <div className="hexagon-question">{currentQuestion.question}</div>
            </div>

            <div className={`answers-wrapper${showConfirmDialog || showValidationDialog ? ' unclickable':''}`}>
                {currentQuestion.shuffledAnswers.map((answer) => {
                    return (
                        <div key={answer.id}  className="hexagon-answer-wrapper">
                            <button 
                                ref={buttonRef}
                                onClick={(e) => handleClick(e.target, answer.text)} 
                                className={`hexagon-answer`}>
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