import { useEffect, useState } from "react";
import SongPlayer from "../../player/SongPlayer";
import Button from "./Button";

function Bottombar() {
  const player = SongPlayer.getInstance();
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
            <Button icon="playerIcons/shuffleOff.svg" />
            <Button icon="playerIcons/previous.svg" onClick={handlePrevious}/>
            {!isPlaying && <Button icon="playerIcons/play.svg" onClick={handlePlay} />}
            {isPlaying && <Button icon="playerIcons/pause.svg" onClick={handlePause} />}
            <Button icon="playerIcons/next.svg" onClick={handleNext} />
            <Button icon="playerIcons/loop.svg" />
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
            <Button icon="playerIcons/volumeUp.svg" />

            {showVolumeSlider && (
              <div></div>
            )}
          </div>

          {/* <ClickableIcon icon="playerIcons/audioDevice.svg" /> */}
          <Button icon="playerIcons/queue.svg" />
        </div>
      </div>
    </div>
  );
}
;
export default Bottombar;