import { fetchNotesApi } from "../infrastructure/fetchNotesApi";
import { Modal } from "./Modal";
import { Toast } from "./Toast";
<<<<<<< refactor-modal-and-toast
import { EditNoteForm } from "./EditNoteForm";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../contexts/ToastContext";
import { ModalContext } from "../contexts/ModalContext";
=======
import { useEffect, useState } from "react";
import { NoteForm } from "./NoteForm";
import { NotesList } from "./NotesList";
import { Note } from "./Note";
>>>>>>> main
import "./Layout.css";

const Layout = () => {
  const [notes, setNotes] = useState([]);
<<<<<<< refactor-modal-and-toast
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [noteData, setNoteData] = useState({});

  const { showToast } = useContext(ToastContext);
  const { openModal } = useContext(ModalContext);

=======
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [noteData, setNoteData] = useState({});

>>>>>>> main
  const getNotes = async () => {
    try {
      const notes = await fetchNotesApi({ type: "getNotes" });
      const orderedNotes = [...notes].reverse();
      setNotes(orderedNotes);
    } catch (error) {
<<<<<<< refactor-modal-and-toast
      showToast({
        message: error.message,
        type: "error",
      });
=======
      setToastConfig({ message: error.message, type: "error" });
      setIsToastVisible(true);
      console.log("An error has occurred:", error.message);
>>>>>>> main
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

<<<<<<< refactor-modal-and-toast
  const addNote = async () => {
    try {
      const noteData = { title, description };
      const note = await fetchNotesApi({ type: "setNote", payload: noteData });

      if (note.id) {
        showToast({
          type: "success",
          message: "Nota adicionada com sucesso!",
        });

        setNotes((oldNotes) => [note, ...oldNotes]);
      }
    } catch (error) {
      showToast({
        message: "Não foi possível adicionar a nota!",
        type: "error",
      });
    }

    setTitle("");
    setDescription("");
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetchNotesApi({
        type: "deleteNote",
        payload: { id: noteId },
      });

      if (response.id) {
        showToast({
          message: "Nota excluída com sucesso!",
          type: "success",
        });

        setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
      }
    } catch (error) {
      showToast({
        message: "Não foi possível excluir a nota!",
        type: "error",
      });
    }
  };

  const editNote = async (newNote) => {
    try {
      const response = await fetchNotesApi({
        type: "editNote",
        payload: newNote,
      });

      if (response.id) {
        const nextNotes = notes.map((oldNote) =>
          oldNote.id === newNote.id ? newNote : oldNote
        );

        setNotes(nextNotes);

        showToast({
          message: "Nota editada com sucesso!",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Toast />

      <Modal>
        <EditNoteForm note={noteData} onSubmit={editNote} />
      </Modal>

      <aside>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addNote();
          }}
        >
          <div className="box-input-title">
            <input
              type="text"
              placeholder="Title"
              tabIndex={1}
              className="inputTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="box-textarea">
            <textarea
              placeholder="Content"
              tabIndex={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button tabIndex={3}>Add Note</button>
          </div>
        </form>
      </aside>
      <div className="notes">
        {notes.length > 0 &&
          notes.map((note) => (
=======
  const deleteNote = async (noteId) => {
    try {
      const response = await fetchNotesApi({
        type: "deleteNote",
        payload: { id: noteId },
      });

      if (response.id) {
        setToastConfig({
          message: "Nota excluída com sucesso!",
          type: "success",
        });
        setIsToastVisible(true);

        setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
      }
    } catch (error) {
      setToastConfig({
        message: "Não foi possível excluir a nota!",
        type: "error",
      });
      setIsToastVisible(true);
    }
  };

  const editNote = async (newNote) => {
    try {
      const response = await fetchNotesApi({
        type: "editNote",
        payload: newNote,
      });

      if (response.id) {
        const nextNotes = notes.map((oldNote) =>
          oldNote.id === newNote.id ? newNote : oldNote
        );

        setNotes(nextNotes);
        setIsModalVisible(false);

        setToastConfig({
          message: "Nota editada com sucesso!",
          type: "success",
        });
        setIsToastVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {isModalVisible && (
        <Modal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          oldNote={noteData}
          onConfirm={editNote}
        />
      )}
      {
        <Toast
          toastConfig={toastConfig}
          isToastVisible={isToastVisible}
          setIsToastVisible={setIsToastVisible}
        />
      }
      <aside>
        <NoteForm
          onFinishSubmit={(note) => setNotes((oldNotes) => [note, ...oldNotes])}
        />
      </aside>

      <NotesList
        notes={notes}
        renderNote={(note) => {
          return (
>>>>>>> main
            <Note
              key={note.id.toString()}
              title={note.title}
              description={note.description}
<<<<<<< refactor-modal-and-toast
              deleteNote={() => deleteNote(note.id)}
              editNote={() => {
                setNoteData(note);
                openModal();
              }}
            />
          ))}
      </div>
=======
              onDelete={() => deleteNote(note.id)}
              onEdit={() => {
                setNoteData(note);
                setIsModalVisible(true);
              }}
            />
          );
        }}
      />
>>>>>>> main
    </main>
  );
};

export { Layout };
