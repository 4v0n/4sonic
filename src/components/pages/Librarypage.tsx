import { useEffect, useState } from "react";
import LibraryManager from "../../player/LibraryManager";
import Artist from "../../player/Artist";
import Album from "../../player/Album";
import Song from "../../player/Song";
import LibrarySideBar from "../shared/LibrarySideBar";
import SongTable from "../shared/SongTable";
import { createCanvas, loadImage } from "canvas";

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

  async function getOverallColour(url: string) {
    const img = await loadImage(url);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    const pixels = data.length / 4;
    r = Math.floor(r / pixels);
    g = Math.floor(g / pixels);
    b = Math.floor(b / pixels);

    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <div className="flex min-h-full">
      <LibrarySideBar />
      <div className="flex-1 pt-2 ml-28">

        {[...albums.entries()].map(([albumId, album]) => (
          <div>
            <div className="flex bg-surface1-light dark:bg-surface1-dark shadow-lg rounded-sm ">
              <img
                src={album.cover}
                className="w-48 h-48 object-cover rounded-sm shadow-lg"
              />
              <div>
                <h1
                  className="font-bold text-3xl truncate"
                >
                  {album.name}
                </h1>
                <h2
                  className="flex items-center space-x-2"
                >
                  <img
                    src={album.artist?.artistImageUrl}
                    className="w-8 h-8 object-cover rounded-full shadow-lg"
                  />
                  {album.artist?.name}
                </h2>
              </div>
            </div>
            <SongTable
              songs={album.getSongObjects()}
              showArt={true}
            />
          </div>
        ))}

        {/* <ul>
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
        </ul> */}
      </div>
    </div>
  );
};