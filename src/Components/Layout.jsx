import { Note } from "./Note"
import './Layout.css';
import { getNotes } from "../Iinfrastructure/getNotes";
import { useEffect, useState } from "react";

const Layout = () => {
    const [notes, setNotes] = useState([]);

    const fecthGetNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (error) {
            console.log('erro');
        }
    }

    useEffect(() => {
        fecthGetNotes();
    }, []);

    return (
        <main>
            <aside>
                <div className="box-input-title">
                    <input type="text" placeholder="Title" className="inputTitle" />
                </div>
                <div className="box-textarea">
                    <textarea placeholder="Content"></textarea>
                </div>
                <div>
                    <button>Add Note</button>
                </div>
            </aside>
            <div className="notes">
                {
                    notes.length > 0 && (
                        notes.map(note => (
                            <Note
                                key={note.id.toString()}
                                id={note.id}
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