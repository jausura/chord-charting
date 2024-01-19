import { useEffect, useState } from "react";
import ChordCard from "./ChordCard";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import DraftEditor from "./DraftEditor";

export default function Section({
  id,
  title,
  changeTitle,
  addCard,
  sectionCards,
  deleteCard,
  updateChord,
  stashNotesData,
  notes,
  deleteSection,
}) {
  //const [cards, setCards] = useState([{ id: crypto.randomUUID() }]);
  //const [sectionTitle, setSectionTitle] = useState("Section Title");
  const [showingNotes, setShowingNotes] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    if (Object.keys(notes).length === 0) {
      return EditorState.createEmpty();
    } else {
      return EditorState.createWithContent(convertFromRaw(notes));
    }
  });

  useEffect(() => {
    const delayedEditorStateBackup = setTimeout(() => {
      const editorDataRaw = convertToRaw(editorState.getCurrentContent());
      stashNotesData(id, editorDataRaw);
    }, 5000);
    return () => {
      clearTimeout(delayedEditorStateBackup);
    };
  }, [editorState]);

  // function addCard() {
  //   setCards((currentCards) => {
  //     return [...currentCards, { id: crypto.randomUUID() }];
  //   });
  // }

  // function deleteCard(id) {
  //   setCards((currentCards) => {
  //     return currentCards.filter((card) => card.id !== id);
  //   });
  // }

  return (
    <>
      <div className="section-container">
        <div className="section-header">
          <input
            className="section-title"
            value={title}
            onChange={(e) => changeTitle(id, e.target.value)}
          />
          <button className="delete-section" onClick={() => deleteSection(id)}>
            delete section
          </button>
        </div>
        <button
          className="toggle-notes"
          onClick={() => setShowingNotes(!showingNotes)}
        >
          {showingNotes ? "hide notes" : "show notes"}
        </button>
        {showingNotes ? (
          <DraftEditor
            editorState={editorState}
            placeholder="Add notes here"
            onChange={setEditorState}
          />
        ) : null}
        <div className="card-container">
          {sectionCards.map((card) => (
            <ChordCard
              key={card.id}
              deleteCard={deleteCard}
              id={card.id}
              sectionId={id}
              updateChord={updateChord}
              notes={card.chordTones}
              chordName={card.chordName}
            />
          ))}

          <button className="add-card-btn" onClick={() => addCard(id)}>
            add
          </button>
        </div>
      </div>
    </>
  );
}
