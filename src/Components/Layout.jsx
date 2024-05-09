import { fetchNotesApi } from "../infrastructure/fetchNotesApi";
import { Note } from "./Note";
import { Modal } from "./Modal";
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import './Layout.css';

const Layout = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastConfig, setToastConfig] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteData, setNoteData] = useState({});

    const getNotes = async () => {
        try {
            const notes = await fetchNotesApi({ type: 'getNotes' });
            const orderedNotes = [...notes].reverse();
            setNotes(orderedNotes);
        } catch (error) {
            setToastConfig({ message: error.message, type: 'error' });
            setIsToastVisible(true);
            console.log('An error has occurred:', error.message);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);


    const addNote = async () => {
        try {
            const noteData = { title, description };
            const note = await fetchNotesApi({ type: 'setNote', payload: noteData });

            if(note.id) {
                setToastConfig({ message: 'Nota adicionada!', type: 'success' });
                setIsToastVisible(true);

                setNotes((oldNotes) => [note, ...oldNotes ]);
            }
        } catch (error) {
            setToastConfig({ message: 'Não foi possível adicionar a nota!', type: 'error' });
            setIsToastVisible(true);
        }

        setTitle('');
        setDescription('');
    }


    const deleteNote = async noteId => {
        try {
            const response = await fetchNotesApi({ type: 'deleteNote', payload: {id: noteId} });

            if(response.id) {
                setToastConfig({ message: 'Nota excluída com sucesso!', type: 'success' });
                setIsToastVisible(true);

                setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
            }
        } catch (error) {
            setToastConfig({ message: 'Não foi possível excluir a nota!', type: 'error' });
            setIsToastVisible(true);
        }
    }

    const editNote = async (newNote) => {
        try {
            const response = await fetchNotesApi({ type: 'editNote', payload: newNote });

            if(response.id) {
                const nextNotes = notes.map(oldNote => oldNote.id === newNote.id ? newNote : oldNote);

                setNotes(nextNotes);
                setIsModalVisible(false);

                setToastConfig({ message: 'Nota editada com sucesso!', type: 'success' });
                setIsToastVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main>
            {
                isModalVisible &&
                <Modal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    oldNote={noteData}
                    onConfirm={editNote}
                />
            }
            {
                <Toast
                    toastConfig={toastConfig}
                    isToastVisible={isToastVisible}
                    setIsToastVisible={setIsToastVisible}
                />
            }
            <aside>
                <form onSubmit={
                    event => {
                        event.preventDefault();
                        addNote();
                    }
                }>
                    <div className="box-input-title">
                        <input type="text" placeholder="Title" tabIndex={1} className="inputTitle" value={title} onChange={e => setTitle(e.target.value)} required/>
                    </div>
                    <div className="box-textarea">
                        <textarea placeholder="Content" tabIndex={2} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <button tabIndex={3}>Add Note</button>
                    </div>
                </form>
            </aside>
            <div className="notes">
                {
                    notes.length > 0 && (
                        notes.map(note => (
                            <Note
                                key={note.id.toString()}
                                title={note.title}
                                description={note.description}
                                deleteNote={() => deleteNote(note.id)}

                                editNote={() => {
                                    setIsModalVisible(true);
                                    setNoteData(note);
                                }}
                            />
                        ))
                    )
                }
            </div>
        </main>
    )
}

export { Layout }