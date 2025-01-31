import { useState, useMemo } from "react";
import Song from "../../player/Song";
import SongPlayer from "../../player/SongPlayer";
import { useInView } from "react-intersection-observer";

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

  const { ref, inView } = useInView({ triggerOnce: true });

  const [sortColumn, setSortColumn] = useState<keyof Song>("trackNumber");
  const [isAscending, setIsAscending] = useState(true);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  function handleSort(column: keyof Song) {
    if (sortColumn === column) {
      setIsAscending(!isAscending);
    }
    else {
      setSortColumn(column);
      setIsAscending(true);
    }
  }

  function handlePlaySong(song: Song) {
    const player = SongPlayer.getInstance();
    player.setTrack(song.stream);
    player.play();
  }

  const sortedSongs = useMemo(() => {
    const songsCopy = [...songs];

    songsCopy.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return isAscending ? aValue - bValue : bValue - aValue;
      }

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
    <div ref={ref} className="w-full overflow-x-hidden">
      { inView ? (
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
                  className="px-6 py-2 text-left cursor-pointer w-1/4"
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
                onDoubleClick={() => {
                  if (isHovering && selectedSong === song) {
                    handlePlaySong(song);
                  }
                }}
              >
                <td className="px-4 py-2 text-left align-middle">
                  {isHovering && selectedSong === song ? (
                    <button
                      onClick={() => {
                        handlePlaySong(song);
                      }}
                    >
                      <img
                        src="playerIcons/play.svg"
                        alt="Play"
                        className="filter dark:invert w-4 h-4"
                      />
                    </button>
                  ) : (
                    song.trackNumber
                  )}
                </td>
                <td className="px-6 py-2 text-left align-middle">
                  <div className="flex items-center space-x-2">
                    {showArt ? (
                      <img
                        src={song.cover + "&size=80"}
                        alt={`${song.title} cover`}
                        className="w-10 h-10 rounded-sm flex-shrink-0"
                      />
                    ) : null}
                    <div className="flex flex-col overflow-hidden">
                      <h1
                        className="text-sm font-medium truncate"
                        title={song.title}
                      >
                        {song.title}
                      </h1>
                      <h2
                        className="text-xs text-text_gray-light dark:text-text_gray-dark truncate"
                        title={song.artist}
                      >
                        {song.artist}
                      </h2>
                    </div>
                  </div>
                </td>
                {showAlbum ? (
                  <td className="px-6 py-2 text-left align-middle">
                    <span
                      className="text-sm truncate block overflow-hidden"
                      title={song.album?.name}
                    >
                      {song.album?.name}
                    </span>
                  </td>
                ) : null}
                <td className="px-6 py-2 text-center align-middle">
                  <span className="text-sm truncate block overflow-hidden" title={song.fileType}>
                    {song.fileType}
                  </span>
                </td>
                <td className="px-6 py-2 text-center align-middle">
                  <span className="text-sm " title={`${song.sampleRate / 1000}KHz`}>
                    {song.sampleRate / 1000}KHz
                  </span>
                </td>
                <td className="px-6 py-2 text-center align-middle">
                  {/* like button */}
                </td>
                <td className="px-6 py-2 text-center align-middle">
                  <span className="text-sm truncate block overflow-hidden" title={song.getDurationString()}>
                    {song.getDurationString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
