import './Note.css';
import btnClose from './../../public/btnClose.svg';

const Note = () => {
    return (
        <>
            <div className="note">
                <div className='box-btn-close'>
                    <img src={btnClose}/>
                </div>
                <h2>Note 1</h2>
                <div className='box-content'>
                    <p>This is the content for note 1</p>
                </div>
            </div>
        </>
    )
}

export { Note }