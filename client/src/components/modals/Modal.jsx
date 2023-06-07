const Modal = ({ title = "Hello", isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <button className="close-modal-button" onClick={onClose}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
