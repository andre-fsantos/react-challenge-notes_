import "../styles/components/Note.css";

const Note = ({ title, description, deleteNote, editNote }) => {
  return (
    <div className="note">
      <div className="box-btns">
        <button className="box-btn-edit" onClick={editNote}>
          <img src="/btnEdit.svg" />
        </button>
        <button className="box-btn-close" onClick={deleteNote}>
          <img src="/btnClose.svg" />
        </button>
      </div>
      <h2>{title}</h2>
      <div className="box-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export { Note };
