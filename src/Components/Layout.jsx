import { Note } from "./Note"
import { getNotes } from "../infrastructure/getNotes";
import { saveNote } from "../infrastructure/saveNote";
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
                <form onSubmit={e => e.preventDefault()}>
                    <div className="box-input-title">
                        <input type="text" placeholder="Title" className="inputTitle" value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="box-textarea">
                        <textarea placeholder="Content" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <button onClick={addNote}>Add Note</button>
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
                            />
                        ))
                    )
                }
            </div>
        </main>
    )
}

export { Layout }