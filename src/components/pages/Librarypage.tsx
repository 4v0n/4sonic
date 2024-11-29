import { useEffect, useState } from "react";
import LibraryManager from "../../player/LibraryManager";
import Artist from "../../player/Artist";
import Album from "../../player/Album";
import Song from "../../player/Song";
import SongPlayer from "../../player/SongPlayer";
import Button from "../shared/Button";

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

    return () => {
      lm.removeEventListener("artistAdded", handleArtistUpdate as EventListener);
      lm.removeEventListener("albumAdded", handleAlbumUpdate as EventListener);
      lm.removeEventListener("songAdded", handleSongUpdate as EventListener);
    };

  }, [artists, albums, songs]);

  function handlePlaySong(song: Song) {
    const player = SongPlayer.getInstance();
    player.setSubsonicTrack(song);
    player.play();
  }

  return (
    <div>
      <ul>
        {[...songs.entries()].map(([songId, song]) => (
          <li key={songId}>
            <Button
              onClick={() => {
                handlePlaySong(song);
              }}
            >
              {song.artist} - {song.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};