import { useState} from 'react';
import Jokers from './Jokers';

const Ladder = ({ gameOn, level, onJokerCall }) =>{
    
    const [ladderValues, setLadderValues] = useState([
        {
            id:0,
            value: 500,
            passed: false,
        },
        {
            id:1,
            value: 1000,
            passed: false,
        },
        {
            id:2,
            value: 2000,
            passed: false,
        },
        {
            id:3,
            value: 3000,
            passed: false,
        },
        {
            id:4,
            value: 5000,
            passed: false,
            breakPoint: true,
        },
        {
            id:5,
            value: 7000,
            passed: false,
        },
        {
            id:6,
            value: 10000,
            passed: false,
        },
        {
            id:7,
            value: 20000,
            passed: false,
        },
        {
            id:8,
            value: 30000,
            passed: false,
        },
        {
            id:9,
            value: 50000,
            passed: false,
            breakPoint: true,
        },
        {
            id:10,
            value: 100000,
            passed: false,
        },
        {
            id:11,
            value: 250000,
            passed: false,
        },
        {
            id:12,
            value: 500000,
            passed: false,
        },
        {
            id:13,
            value: '1 MILLION',
            passed: false,
            breakPoint: true,
        }
    ])  

    return (
        <div className="ladder-wrapper">
            <Jokers gameOn={gameOn} onJokerCall={onJokerCall}/>
            
            <div className='levels'>
                {ladderValues.map(step => {
                    return <div key={step.id} className={`${step.breakPoint ? 'break-point' : ''}${level === step.id ? ' current-step' : ''}`}> <span>{step.id+1}</span> $ {step.value}</div>
                })}
            </div>
        </div>
    )
}

export default Ladder;