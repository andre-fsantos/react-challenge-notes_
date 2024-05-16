<<<<<<< refactor-modal-and-toast
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import "./Modal.css";

const Modal = ({ children }) => {
  const { isOpen, closeModal } = useContext(ModalContext);

  const handleClick = (event) => {
    if (event.target.className === "box-bg-modal") closeModal();
  };

  return (
    isOpen && (
      <div className="box-bg-modal" onClick={handleClick}>
        <div className="box-modal">{children}</div>
=======
import { useState } from "react";
import "./Modal.css";

const Modal = ({ isModalVisible, setIsModalVisible, oldNote, onConfirm }) => {
  const [title, setTitle] = useState(oldNote.title);
  const [description, setDescription] = useState(oldNote.description);
  const className = "box-bg-modal";

  const onClose = (event) => {
    if (event.target.className === className) setIsModalVisible(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsModalVisible(false);
    onConfirm({ ...oldNote, title, description });
  };

  return (
    isModalVisible && (
      <div className={className} onClick={onClose}>
        <div className="box-modal">
          <h2>Editar nota</h2>
          <div className="box-form">
            <form onSubmit={onSubmit}>
              <div className="box-input-title">
                <input
                  type="text"
                  className="input-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Content"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="box-button">
                <button>Salvar</button>
              </div>
            </form>
          </div>
        </div>
>>>>>>> main
      </div>
    )
  );
};

export { Modal };
