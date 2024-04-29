import { useState } from 'react';
import './Modal.css';

const Modal = ({ isModalVisible, setIsModalVisible, oldNote, fetchEditNote }) => {
    const [title, setTitle] = useState(oldNote.title);
    const [description, setDescription] = useState(oldNote.description);
    const className = 'box-bg-modal';

    const onClose = event => {
        if(event.target.className === className) setIsModalVisible(false);
    }
    

    const formData = event => {
        event.preventDefault();
        setIsModalVisible(false);
        fetchEditNote({ title, description });
    }


    return (
        isModalVisible &&
        (
            <div className={className} onClick={onClose}>
                <div className="box-modal">
                    <h2>Editar nota</h2>
                    <div className="box-form">
                        <form onSubmit={formData}>
                            <div className="box-input-title">
                                <input type="text" className="input-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/>
                            </div>
                            <div>
                                <textarea placeholder="Content" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="box-button">
                                <button>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export { Modal }