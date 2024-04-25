import { Note } from "./Note"
import { getNotes } from "../infrastructure/getNotes";
import { saveNote } from "../infrastructure/saveNote";
import { deleteNote } from "../infrastructure/deleteNote"
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import './Layout.css';

const Layout = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const [messageToast, setMessageToast] = useState('');
    const [toastType, setToastType] = useState('');


    const fecthGetNotes = async () => {
        try {
            const notes = await getNotes();
            const orderedNotes = [...notes].reverse();
            setNotes(orderedNotes);
        } catch (error) {
            console.log('erro no fecthGetNotes');
        }
    }

    useEffect(() => {
        fecthGetNotes();
    }, []); 


    const addNote = async () => {
        try {
            const response = await saveNote({ title, description });
            const id = response.id;
            
            if(id) {
                setMessageToast('Nota adicionada!');
                setToastType('success');
                setIsToastVisible(true);

                setTitle('');
                setDescription('');
                setNotes((oldNotes) => [{ id, title, description }, ...oldNotes ]);
            }
        } catch(error) {
            console.log('erro no saveNote');
        }
    }

    const delNote = async noteId => {
        try {
            const response = await deleteNote(noteId);
            const id = response.id;

            if(id) {
                setMessageToast('Nota excluída com sucesso!');
                setToastType('success');
                setIsToastVisible(true);

                setNotes(oldNotes => oldNotes.filter(note => note.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main>
            {
                <Toast
                    message={messageToast}
                    type={toastType}
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
                        <input type="text" placeholder="Title" className="inputTitle" value={title} onChange={e => setTitle(e.target.value)} required/>
                    </div>
                    <div className="box-textarea">
                        <textarea placeholder="Content" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <button>Add Note</button>
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
                                delNote={() => delNote(note.id)}
                            />
                        ))
                    )
                }
            </div>
        </main>
    )
}

export { Layout }