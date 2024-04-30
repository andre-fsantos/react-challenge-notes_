<<<<<<< Updated upstream
import { Note } from "./Note"
import { getNotes } from "../infrastructure/getNotes";
import { saveNote } from "../infrastructure/saveNote";
import { deleteNote } from "../infrastructure/deleteNote";
import { editNote } from "../infrastructure/editNote";
=======
import { Note } from "./Note";
import { fetchGetNotes } from "../infrastructure/getNotes";
import { fetchAddNote } from "../infrastructure/saveNote";
import { fetchDeleteNote } from "../infrastructure/deleteNote";
import { fetchEditNote } from "../infrastructure/editNote";
import { Modal } from "./Modal";
>>>>>>> Stashed changes
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import './Layout.css';

const Layout = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastConfig, setToastConfig] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteData, setNoteData] = useState({});
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

    const getNotes = async () => {
        try {
            const notes = await fetchGetNotes();
            const orderedNotes = [...notes].reverse();
            setNotes(orderedNotes);
        } catch (error) {
            console.log('erro no fecthGetNotes');
        }
    }

    useEffect(() => {
        getNotes();
    }, []);


    const addNote = async () => {
        try {
            const note = await fetchAddNote({ title, description });
            
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
            const response = await fetchDeleteNote(noteId);

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

    const editNote = async newNote => {
        try {
            const response = await fetchEditNote(newNote);

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


    const fetchEditNote = async note => {
        try {
            const atualizaArray = (array, id, novaNota) => {
                for(let i = 0; i < array.length; i++) {
                    if(array[i].id === id) {
                        array[i] = { ...array[i], ...novaNota }
                    }
                }
                return array;
            }

            const response = await editNote(note);

            if(response.id) {
                const notesArray = atualizaArray([...notes], response.id, { title: response.title, description: response.description });
                setNotes(notesArray);
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
<<<<<<< Updated upstream
                    fetchEditNote={note => fetchEditNote({id: noteData.id, ...note})}
=======
                    onConfirm={editNote}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                                deleteNote={() => fetchDeleteNote(note.id)}
                                
                                editNote={() => {
                                    setIsModalVisible(true);
                                    setNoteData({ id: note.id, title: note.title, description: note.description });
=======
                                deleteNote={() => deleteNote(note.id)}

                                editNote={() => {
                                    setIsModalVisible(true);
                                    setNoteData(note);
>>>>>>> Stashed changes
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