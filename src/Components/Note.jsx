import './Note.css';

const Note = () => {
    return (
        <div className="note">
            <div className='box-btn-close'>
                <img src='/btnClose.svg' />
            </div>
            <h2>Note 1</h2>
            <div className='box-content'>
                <p>This is the content for note 1</p>
            </div>
        </div>
    )
}

export { Note }