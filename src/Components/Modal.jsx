import { useState } from 'react';
import './Modal.css';

<<<<<<< Updated upstream
const Modal = ({ isModalVisible, setIsModalVisible, oldNote, fetchEditNote }) => {
=======
const Modal = ({ isModalVisible, setIsModalVisible, oldNote, onConfirm }) => {
>>>>>>> Stashed changes
    const [title, setTitle] = useState(oldNote.title);
    const [description, setDescription] = useState(oldNote.description);
    const className = 'box-bg-modal';

    const onClose = event => {
        if(event.target.className === className) setIsModalVisible(false);
    }
<<<<<<< Updated upstream
    

    const formData = event => {
        event.preventDefault();
        setIsModalVisible(false);
        fetchEditNote({ title, description });
    }


=======

    const onSubmit = event => {
        event.preventDefault();
        setIsModalVisible(false);
        onConfirm({ ...oldNote, title, description });
    }

>>>>>>> Stashed changes
    return (
        isModalVisible &&
        (
            <div className={className} onClick={onClose}>
                <div className="box-modal">
                    <h2>Editar nota</h2>
                    <div className="box-form">
<<<<<<< Updated upstream
                        <form onSubmit={formData}>
                            <div className="box-input-title">
                                <input type="text" className="input-title" tabIndex={5} value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/>
                            </div>
                            <div>
                                <textarea placeholder="Content" tabIndex={6} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="box-button">
                                <button tabIndex={7}>Salvar</button>
=======
                        <form onSubmit={onSubmit}>
                            <div className="box-input-title">
                                <input type="text" className="input-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/>
                            </div>
                            <div>
                                <textarea placeholder="Content" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="box-button">
                                <button>Salvar</button>
>>>>>>> Stashed changes
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export { Modal }