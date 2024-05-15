import { useState } from "react";
import { fetchNotesApi } from "../infrastructure/fetchNotesApi";
import { Toast } from "./Toast";
import "./NoteForm.css";

const NoteForm = ({ onFinishSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState({});

  const addNote = async () => {
    try {
      const noteData = { title, description };
      const note = await fetchNotesApi({ type: "setNote", payload: noteData });

      if (note.id) {
        setToastConfig({ message: "Nota adicionada!", type: "success" });
        setIsToastVisible(true);

        onFinishSubmit(note);
      }
    } catch (error) {
      setToastConfig({
        message: "Não foi possível adicionar a nota!",
        type: "error",
      });
      setIsToastVisible(true);
    }

    setTitle("");
    setDescription("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addNote();
  };

  return (
    <>
      {
        <Toast
          toastConfig={toastConfig}
          isToastVisible={isToastVisible}
          setIsToastVisible={setIsToastVisible}
        />
      }

      <form onSubmit={onSubmit}>
        <div className="box-input-title">
          <input
            type="text"
            placeholder="Title"
            className="note-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="box-textarea">
          <textarea
            placeholder="Content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button>Add Note</button>
        </div>
      </form>
    </>
  );
};

export { NoteForm };
