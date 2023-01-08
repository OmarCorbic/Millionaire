import { useEffect, useState } from "react";

const AudienceJoker = ({ onClose, answers, correctAnswer }) => {

    const [results, setResults] = useState([]);
    const random = (min, max) => Math.floor(Math.random() * (max-min) + min);

    useEffect(() => {
        const correctId = answers.find(answer => answer.text === correctAnswer).id;
        setResults(answers.map(answer => {
            if(answer.id === correctId){
                return {id: correctId, result: random(70,100)};
            }else{
                return {id: answer.id, result: random(10, 65)};
            }
        }));
        //console.log('Audience joker useEffect triggered!');
    }, [answers, correctAnswer]);

    return (
        <div className="jocker-window">
            <p>These are the results from audience: </p>
            <div className="audience-results">
                {results.map(value => {
                    return <div key={value.id} style={ {height: '100%', width: `${value.result}%`} } >{value.id}</div>
                })}
            </div>
            <button id="AUDIENCE" onClick={ e => onClose(e.target.id) } className="btn">Close</button>
        </div>
    );
}


 
export default AudienceJoker;