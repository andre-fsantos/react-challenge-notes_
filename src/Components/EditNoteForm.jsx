import { useState, useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import "./EditNoteForm.css";

export const EditNoteForm = ({ note, onSubmit }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const { closeModal } = useContext(ModalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ id: note.id, title, description });

    closeModal();
  };

  return (
    <>
      <h2>Editar nota</h2>
      <div className="box-form">
        <form onSubmit={handleSubmit}>
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
    </>
  );
};
