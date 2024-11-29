import { useEffect, useState } from "react";
import LibraryManager from "../../player/LibraryManager";
import Artist from "../../player/Artist";
import Album from "../../player/Album";
import Song from "../../player/Song";

export function LibraryPage() {

  const lm = LibraryManager.getInstance();

  const [artists, setArtists] = useState<Map<string, Artist>>(lm.artists);
  const [albums, setAlbums] = useState<Map<string, Album>>(lm.albums);
  const [songs, setSongs] = useState<Map<string, Song>>(lm.songs);

  useEffect(() => {

    function handleArtistUpdate(event: CustomEvent<Map<string, Artist>>) {
      setArtists(new Map(event.detail));
    }

    function handleAlbumUpdate(event: CustomEvent<Map<string, Album>>) {
      setAlbums(new Map(event.detail));
    }

    function handleSongUpdate(event: CustomEvent<Map<string, Song>>) {
      setSongs(new Map(event.detail));
    }

    lm.addEventListener("artistAdded", handleArtistUpdate as EventListener);
    lm.addEventListener("albumAdded", handleAlbumUpdate as EventListener);
    lm.addEventListener("songAdded", handleSongUpdate as EventListener);

  }, [artists, albums, songs]);

  return (
    <div>
      <ul>
        {[...songs.entries()].map(([songId, song]) => (
          <li key={songId}>
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
};