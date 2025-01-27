import { useState, useMemo } from "react";
import Song from "../../player/Song";
import SongPlayer from "../../player/SongPlayer";

interface TableProps {
  songs: Song[];
  showArt?: boolean;
  showAlbum?: boolean;
}

export default function SongTable({
  songs,
  showArt = false,
  showAlbum = false,
}: TableProps) {
  // Sort state: which column and is it ascending or descending
  const [sortColumn, setSortColumn] = useState<keyof Song>("trackNumber");
  const [isAscending, setIsAscending] = useState(true);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Handle clicking on the table headers to sort
  function handleSort(column: keyof Song) {
    // if clicked on the same column, toggle ascending/descending
    if (sortColumn === column) {
      setIsAscending(!isAscending);
    }
    else {
      // otherwise, set new column and default to ascending
      setSortColumn(column);
      setIsAscending(true);
    }
  }

  // Sort songs whenever they or the sort state changes
  const sortedSongs = useMemo(() => {
    // Make a shallow copy so we don’t sort in place
    const songsCopy = [...songs];

    songsCopy.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // For numeric columns (trackNumber, bitrate), just compare as numbers:
      if (typeof aValue === "number" && typeof bValue === "number") {
        return isAscending ? aValue - bValue : bValue - aValue;
      }

      // For string columns (title, artist, fileType):
      if (typeof aValue === "string" && typeof bValue === "string") {
        return isAscending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return songsCopy;
  }, [songs, sortColumn, isAscending]);

  return (
    <div className="w-full overflow-x-hidden">
      <table className="w-full table-fixed">
        <thead>
          <tr className="text-left text-sm text-text_gray-light dark:text-text_gray-dark tracking-wider border-b border-border-light dark:border-border-dark">
            <th
              className="px-4 py-2 text-left cursor-pointer w-12"
              onClick={() => handleSort("trackNumber")}
            >
              #
            </th>
            <th
              className="px-6 py-2 text-left cursor-pointer w-1/3"
              onClick={() => handleSort("title")}
            >
              Title
            </th>
            {showAlbum ? (
              <th
                className="px-6 py-2 text-center cursor-pointer w-1/4"
                onClick={() => handleSort("album")}
              >
                Album
              </th>
            ) : null}
            <th
              className="px-6 py-2 text-center cursor-pointer w-1/6"
              onClick={() => handleSort("fileType")}
            >
              Filetype
            </th>
            <th
              className="px-6 py-2 text-center cursor-pointer w-1/6"
              onClick={() => handleSort("sampleRate")}
            >
              Quality
            </th>
            <th className="px-6 py-2 text-center w-12"></th>
            <th
              className="px-6 py-2 text-center cursor-pointer w-24"
              onClick={() => handleSort("duration")}
            >
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSongs.map((song) => (
            <tr
              key={song.trackNumber}
              className="hover:bg-surface1-light dark:hover:bg-surface1-dark"
              onMouseOver={() => {
                setSelectedSong(song);
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
              }}
            >
              <td className="px-4 py-2 text-left align-middle">
                {isHovering && (selectedSong == song) ? (
                  <button
                    onClick={() => {
                      const player = SongPlayer.getInstance();
                      player.setTrack(song.stream);
                      player.play();
                    }}
                  >
                    <img src="playerIcons/play.svg" className="filter dark:invert" />
                  </button>
                ) : song.trackNumber}
              </td>
              <td className="px-6 py-2 text-left align-middle">
                <div className="flex items-center space-x-2">
                  {showArt ? (
                    <img
                      src={song.cover}
                      alt={`${song.title} cover`}
                      className="w-10 h-10 rounded-sm flex-shrink-0"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium truncate" title={song.title}>
                      {song.title}
                    </h1>
                    <h2 className="text-xs text-text_gray-light dark:text-text_gray-dark truncate" title={song.artist}>
                      {song.artist}
                    </h2>
                  </div>
                </div>
              </td>
              {showAlbum ? (
                <td className="px-6 py-2 text-center align-middle">
                  <span className="text-sm truncate" title={song.album?.name}>
                    {song.album?.name}
                  </span>
                </td>
              ) : null}
              <td className="px-6 py-2 text-center align-middle">
                {song.fileType}
              </td>
              <td className="px-6 py-2 text-center align-middle">
                {song.sampleRate / 1000}KHz
              </td>
              <td className="px-6 py-2 text-center align-middle">
                {/* like button */}
              </td>
              <td className="px-6 py-2 text-center align-middle">
                {song.getDurationString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
