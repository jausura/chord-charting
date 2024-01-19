import { useRef, useState } from "react";

export default function ChordCard({
  deleteCard,
  id,
  sectionId,
  updateChord,
  notes,
  chordName,
}) {
  const notesInput = useRef();
  const chordNameInput = useRef();
  //const [notes, setNotes] = useState("c,e,g");
  //const [chordName, setChordName] = useState("CMajor");
  const [editing, setEditing] = useState(false);
  const [cardHover, setCardHover] = useState(false);

  // function updateChord(e) {
  //   e.preventDefault();
  //   toggleEditing();
  //   setNotes(notesInput.current.value);
  //   setChordName(chordNameInput.current.value);
  // }
  function editChord(e) {
    e.preventDefault();
    const newName = chordNameInput.current.value;
    const newTones = notesInput.current.value;
    toggleEditing();
    updateChord(sectionId, id, newName, newTones);
  }
  function toggleEditing() {
    setCardHover(false);
    setEditing((currentValue) => !currentValue);
  }

  function toggleHover() {
    if (!editing) {
      setCardHover((currentValue) => !currentValue);
    }
  }

  return (
    <div
      className={`chord-card ${cardHover ? "hover" : ""}`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="chord-card-btns">
        <button className="edit-chord-card-btn" onClick={toggleEditing}>
          edit
        </button>
        <button
          className="delete-chord-card-btn"
          onClick={() => deleteCard(sectionId, id)}
        >
          delete
        </button>
      </div>
      {!editing ? (
        <div className="chord-card-display">
          <div className="chord-card-notes">
            {notes.split(",").map((note, i) => (
              <span key={i} className="chord-card-note">
                {note}
              </span>
            ))}
          </div>
          <div className="chord-name">{chordName}</div>
        </div>
      ) : (
        <form className="chord-form" onSubmit={(e) => editChord(e)}>
          <label htmlFor="notesInput">Chord Tones</label>
          <input name="notesInput" ref={notesInput} defaultValue={notes} />
          <label htmlFor="chordNameInput">Chord Name</label>
          <input
            name="chordNameInput"
            ref={chordNameInput}
            defaultValue={chordName}
          />
          <input type="submit" />
        </form>
      )}
    </div>
  );
}
