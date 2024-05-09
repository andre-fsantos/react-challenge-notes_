import './note-form.css';

const NoteForm = ({ title, description, onTitleChange, onDescriptionChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="box-input-title">
                <input type="text" placeholder="Title" className="note-title" value={title} onChange={onTitleChange} required/>
            </div>
            <div className="box-textarea">
                <textarea placeholder="Content" value={description} onChange={onDescriptionChange} required></textarea>
            </div>
            <div>
                <button>Add Note</button>
            </div>
        </form>
    )
}

export { NoteForm }