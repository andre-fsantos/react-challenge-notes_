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
      </div>
    )
  );
};

export { Modal };
