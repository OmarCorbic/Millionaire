const FriendJoker = ({ onClose }) => {
    return ( 
        <div className="jocker-window">
            <p>You called your friend on the phone and asked him what is, in his opinion, the correct answer. <br /><br />
            Your friend said <span style={{ color: 'orange' }}>{String.fromCharCode(65 + Math.random() * 4)}</span>.</p>
            <div>
                <button id="FRIEND" onClick={(e) => onClose(e.target.id)} className="btn">Close</button>
            </div>
        </div>
     );
}
 
export default FriendJoker;