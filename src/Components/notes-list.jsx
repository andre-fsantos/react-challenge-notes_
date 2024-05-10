import { Note } from "./Note"

const NotesList = ({ notes, deleteNote, editNote }) => {
    return (
        <div className="notes">
            {
                notes.length > 0 && (
                    notes.map(note => (
                        <Note
                            key={note.id.toString()}
                            title={note.title}
                            description={note.description}
                            deleteNote={() => deleteNote(note.id)}
                            editNote={() => {editNote(note)}}
                        />
                    ))
                )
            }
        </div>
    )
}

export { NotesList }