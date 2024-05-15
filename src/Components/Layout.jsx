import { fetchNotesApi } from "../infrastructure/fetchNotesApi";
import { Modal } from "./Modal";
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import { NoteForm } from "./NoteForm";
import { NotesList } from "./NotesList";
import { Note } from "./Note";
import "./Layout.css";

const Layout = () => {
  const [notes, setNotes] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [noteData, setNoteData] = useState({});

  const getNotes = async () => {
    try {
      const notes = await fetchNotesApi({ type: "getNotes" });
      const orderedNotes = [...notes].reverse();
      setNotes(orderedNotes);
    } catch (error) {
      setToastConfig({ message: error.message, type: "error" });
      setIsToastVisible(true);
      console.log("An error has occurred:", error.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

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
            <Note
              key={note.id.toString()}
              title={note.title}
              description={note.description}
              onDelete={() => deleteNote(note.id)}
              onEdit={() => {
                setNoteData(note);
                setIsModalVisible(true);
              }}
            />
          );
        }}
      />
    </main>
  );
};

export { Layout };
