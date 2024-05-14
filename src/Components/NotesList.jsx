const NotesList = ({ notes, renderNote }) => {
  return (
    <div className="notes">
      {notes.length > 0 && notes.map((note) => renderNote(note))}
    </div>
  );
};

export { NotesList };
