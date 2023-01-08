
const Confirmation = ({ handleConfirm, handleCancel, answered }) =>{
    return (
        <div className="confirmation-window">
            <p>Is "{answered}" your final answer?</p>
            <div>
                <button onClick={handleConfirm} className="btn">Yes</button>
                <button onClick={handleCancel} className="btn">No</button>
            </div>
        </div>
    )
}

export default Confirmation;