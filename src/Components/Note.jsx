import "./Note.css";

const Note = ({ title, description, onEdit, onDelete }) => {
  return (
    <div className="note">
      <div className="box-btns">
        <button className="box-btn-edit" onClick={onEdit}>
          <img src="/btnEdit.svg" />
        </button>
        <button className="box-btn-close" onClick={onDelete}>
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
