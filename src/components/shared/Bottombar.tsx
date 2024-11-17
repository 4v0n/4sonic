import { useEffect, useState } from "react";
import songPlayer from "../../player/songPlayer";
import ClickableIcon from "./ClickablaIcon";
import { IPicture } from "music-metadata-browser";

function Bottombar() {
  const player = songPlayer.getInstance();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1.0);

  // metadata
  const [songTitle, setSongTitle] = useState("Unknown Title");
  const [songArtist, setSongArtist] = useState("Unknown Artist");
  const [songAlbum, setSongAlbum] = useState("Unknown Album");
  const [songCover, setSongCover] = useState("noImage.svg");

  // play pause
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = (): void => {
    player.play();
    setIsPlaying(true);
  };

  const handlePause = (): void => {
    player.pause();
    setIsPlaying(false);
  };

  const handleNext = (): void => {
    // TODO
  };

  const handlePrevious = (): void => {
    // TODO
  };

  const handleVolumeChange = (e: { target: { value: string; }; }): void => {
    const newVolume = parseInt(e.target.value);
    player.setVolume(newVolume);
    setVolume(newVolume);
  };

  useEffect(() => {
    const updateMetadata = () => {
      setSongTitle(player.metadata?.common.title || "Unknown Title");
      setSongArtist(player.metadata?.common.artist || "Unknown Artist");
      setSongAlbum(player.metadata?.common.album || "Unknown Album");
      setSongCover(player.metadata?.common.picture?.toString || "noImage.svg");
    };

    player.addEventListener("metadataUpdated", updateMetadata);

    return () => {
      player.removeEventListener("metadataUpdated", updateMetadata);
    };
  }, [player]);

  return (
    <div className="w-full h-20 fixed bottom-0 bottomBar">
      <hr className="bottomBar" />
      <div className="flex justify-between items-center h-full px-2">
        <div className="flex space-x-2">
          <img src={songCover} className="object-contain h-16 w-16" />
          <div>
            <h1 className="font-bold">
              {songArtist} - {songTitle}
            </h1>
            <h2>
              {songAlbum}
            </h2>
          </div>
        </div>
        <div>
          <div className="flex justify-center space-x-2">
            <ClickableIcon icon="playerIcons/shuffleOff.svg" />
            <ClickableIcon icon="playerIcons/previous.svg" onClick={handlePrevious}/>
            {!isPlaying && <ClickableIcon icon="playerIcons/play.svg" onClick={handlePlay} />}
            {isPlaying && <ClickableIcon icon="playerIcons/pause.svg" onClick={handlePause} />}
            <ClickableIcon icon="playerIcons/next.svg" onClick={handleNext} />
            <ClickableIcon icon="playerIcons/loop.svg" />
          </div>
          <div className="flex justify-center">
            [currentTime]
            Progress Bar
            [endTime]
          </div>
        </div>
        <div className="flex items-center space-x-2">

          <div
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <ClickableIcon icon="playerIcons/volumeUp.svg" />

            {showVolumeSlider && (
              <div></div>
            )}
          </div>

          <ClickableIcon icon="playerIcons/audioDevice.svg" />
          <ClickableIcon icon="playerIcons/queue.svg" />
        </div>
      </div>
    </div>
  );
}
;
export default Bottombar;