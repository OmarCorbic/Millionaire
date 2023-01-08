import MainSection from './MainSection.js';
import Ladder from './Ladder.js';
import { useState, useEffect } from 'react';

const StartDisplay = () =>{

    const [gameOn, setGameOn] = useState(false);
    const [level, setLevel] = useState(0);
    const [isMillionaire, setIsMillionaire] = useState(false);
    const [calledJoker, setCalledJoker] = useState('');

    useEffect(() =>{
        if(level === 14){
            setIsMillionaire(true);
        }
        if(!gameOn){
            setLevel(0);
            setCalledJoker('');
        }

        //console.log('Start display useEffect triggered!');
    }, [level, gameOn])

    const startGame = () =>{
        setGameOn(true);
    }

    const handleLevelChange = (num) =>{
        setLevel(num);
    }

    const handleJokerCall = (joker) =>{
        setCalledJoker(joker);
    }

    const handlePlayAgain = () =>{
        setGameOn(false);
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
                    <MainSection onPlayAgain={handlePlayAgain} calledJoker={calledJoker} onLevelChange={handleLevelChange} />
                    <Ladder gameOn={gameOn} level={level} onJokerCall={handleJokerCall}/>
                </div>
            )
        }        
    }   
}

export default StartDisplay;