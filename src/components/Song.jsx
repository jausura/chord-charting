import { useEffect, useState } from "react";
import Section from "./Section";
import { useLocation, useParams } from "react-router-dom";
import DEMO_SONG from "../assets/demo-song.json";

export default function Song() {
  //const { songId } = useParams();
  const location = useLocation();

  const DEFAULT_CHORD = {
    chordTones: "c,e,g",
    chordName: "CMajor",
  };
  const DEFAULT_SECTION_DATA = {
    id: crypto.randomUUID(),
    title: "Title Here",
    cards: [{ id: crypto.randomUUID(), ...DEFAULT_CHORD }],
    notes: {},
  };
  const LOCAL_STORAGE_KEY = location.state.songId;

  //const [sections, setSections] = useState([DEFAULT_SECTION_DATA]);

  const [sections, setSections] = useState(() => {
    const localValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localValue == null && location.state.songName === "Demo Song") {
      return DEMO_SONG;
    } else if (localValue == null) {
      return [DEFAULT_SECTION_DATA];
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  function getSectionCards(sectionId) {
    return sections.find(({ id }) => id === sectionId).cards;
  }

  function stashNotesData(sectionId, data) {
    updateSection(sectionId, { notes: data });
  }

  function updateChord(sectionId, cardId, newName, newTones) {
    const currentCards = getSectionCards(sectionId);
    updateSection(sectionId, {
      cards: [
        ...currentCards.map((card) => {
          if (card.id === cardId) {
            return {
              id: card.id,
              chordTones: newTones,
              chordName: newName,
            };
          }
          return card;
        }),
      ],
    });
  }

  function updateSection(sectionId, newSectionData) {
    setSections((currentSections) => {
      return currentSections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, ...newSectionData };
        }
        return { ...section };
      });
    });
  }

  function changeTitle(sectionId, newTitle) {
    updateSection(sectionId, { title: newTitle });
  }

  function addSection() {
    setSections((currentSections) => {
      return [...currentSections, DEFAULT_SECTION_DATA];
    });
  }

  function deleteSection(sectionId) {
    setSections((currentSections) => {
      return currentSections.filter((section) => section.id !== sectionId);
    });
  }

  function addCard(sectionId) {
    const currentCards = getSectionCards(sectionId);
    updateSection(sectionId, {
      cards: [
        ...currentCards,
        {
          id: crypto.randomUUID(),
          ...DEFAULT_CHORD,
        },
      ],
    });
  }

  function deleteCard(sectionId, cardId) {
    const currentCards = getSectionCards(sectionId);
    updateSection(sectionId, {
      cards: [...currentCards.filter((card) => card.id !== cardId)],
    });
  }

  return (
    <>
      <h1>{location.state.songName}</h1>

      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          changeTitle={changeTitle}
          addCard={addCard}
          sectionCards={section.cards}
          deleteCard={deleteCard}
          updateChord={updateChord}
          stashNotesData={stashNotesData}
          notes={section.notes}
          deleteSection={deleteSection}
        />
      ))}
      <button className="add-section-btn" onClick={addSection}>
        add new section
      </button>
    </>
  );
}
