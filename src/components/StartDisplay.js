import MainSection from './MainSection.js';
import Ladder from './Ladder.js';
import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

const StartDisplay = () =>{

    const [questionsData, setQuestionsData] = useState([]);
    const [gameOn, setGameOn] = useState(false);
    const [level, setLevel] = useState(0);
    const [isMillionaire, setIsMillionaire] = useState(false);
    const [calledJoker, setCalledJoker] = useState('');

    useEffect(() =>{

        const dataFetch = async () =>{

            const result = (
                await Promise.all([
                    fetch("https://the-trivia-api.com/api/questions?limit=5&difficulty=medium"),
                    fetch("https://the-trivia-api.com/api/questions?limit=9&difficulty=hard")
                ])
            ).map(r => r.json());

            const [mediumQuestions, hardQuestions] = await Promise.all(result);

            const allQuestions = [...mediumQuestions, ...hardQuestions].map( ({question, correctAnswer, incorrectAnswers}) => {

                const shuffledAnswers = _.shuffle([correctAnswer, ...incorrectAnswers]).map((answer, index) => {
                    return {
                        id: String.fromCharCode(65 + index),
                        text: answer
                    }
                });
                return {
                    question: question, 
                    correctAnswer: correctAnswer, 
                    shuffledAnswers: shuffledAnswers
                };
            });
            
            setQuestionsData([...allQuestions]);
        }
        
        !gameOn && dataFetch();

        return () =>{
            setLevel(0);
            setCalledJoker('');
        }
    }, [gameOn])

    useEffect(() => {
        if(level === 14){
            setIsMillionaire(true);
        }
    }, [level]);

    
    const handleLevelChange = useCallback((num) =>{
        setLevel(num);
    }, []);
    
    const handleJokerCall = useCallback((joker) =>{
        setCalledJoker(joker);
    }, []);
    
    const handlePlayAgain = useCallback(() =>{
        setGameOn(false);
    }, []);
    
    const startGame = () =>{
        setGameOn(true);
    }

    if(!gameOn){
        return (
        <div className="start-display">
            <button onClick={startGame}className="start-game-btn">START GAME</button>
        </div>
        )
    }else{
        if(isMillionaire){
            return(
                <div className="start-display">CONGRATULATIONS, YOU ARE A MILLIONAIRE!!!</div>
            )
        }else{
            return (
                <div className="container">
                    <MainSection questionsData={questionsData} onPlayAgain={handlePlayAgain} calledJoker={calledJoker} onLevelChange={handleLevelChange} />
                    <Ladder gameOn={gameOn} level={level} onJokerCall={handleJokerCall}/>
                </div>
            )
        }        
    }   
}

export default StartDisplay;