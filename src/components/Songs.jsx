import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Songs() {
  const DEFAULT_SONG = { songName: "Demo Song", songId: crypto.randomUUID() };
  const LOCAL_STORAGE_KEY = "mysongs";
  const newSongName = useRef();

  const [songs, setSongs] = useState(() => {
    const localValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localValue == null) {
      return [DEFAULT_SONG];
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(songs));
  }, [songs]);

  function deleteSong(songId) {
    setSongs((currentSongs) => {
      return [...currentSongs.filter((song) => song.songId !== songId)];
    });
  }

  function createSong(e) {
    e.preventDefault();
    const songNameToStore = newSongName.current.value;
    setSongs((currentSongs) => {
      return [
        ...currentSongs,
        { songName: songNameToStore, songId: crypto.randomUUID() },
      ];
    });
    newSongName.current.value = "";
  }

  return (
    <>
      <ul>
        {songs.map((song) => {
          return (
            <li key={song.songId}>
              <Link to={song.songId} state={{ ...song }}>
                {song.songName}
              </Link>
              <button onClick={() => deleteSong(song.songId)}>
                delete song
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={(e) => createSong(e)}>
        <input ref={newSongName} />
        <button>create new song</button>
      </form>
    </>
  );
}
