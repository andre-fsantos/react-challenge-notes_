import './Note.css';

const Note = ({ title, description, deleteNote, editNote }) => {
    return (
        <div className="note">
            <div className='box-btns'>
                <div className='box-btn-edit' onClick={editNote}>
                    <img src='/btnEdit.svg' />
                </div>
                <div className='box-btn-close' onClick={deleteNote}>
                    <img src='/btnClose.svg' />
                </div>
            </div>
            <h2>{title}</h2>
            <div className='box-content'>
                <p>{description}</p>
            </div>
        </div>
    )
}

export { Note }