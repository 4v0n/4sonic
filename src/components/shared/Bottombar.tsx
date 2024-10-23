import ClickableIcon from "./ClickablaIcon";

function Bottombar() {


  const handleNext = (): void => {
    // TODO
  };

  const handlePrevious = (): void => {
    // TODO
  };


  return (
    <div className="w-full h-20 fixed bottom-0 bottomBar">
      <hr className="bottomBar" />
      <div className="flex justify-between items-center h-full px-2">
        <div className="flex space-x-2">
          <img src="playerIcons/tempSongCover.jpg" className="object-contain h-16 w-16" />
          <div>
            <h1 className="font-bold">
              Song Title
            </h1>
            <h2>
              Song Artist
            </h2>
          </div>
        </div>
        <div>
          <div className="flex justify-center space-x-2">
            <ClickableIcon icon="playerIcons/shuffleOff.svg" />
            <ClickableIcon icon="playerIcons/previous.svg" onClick={handlePrevious}/>
            <ClickableIcon icon="playerIcons/play.svg" />
            <ClickableIcon icon="playerIcons/next.svg" onClick={handleNext} />
            <ClickableIcon icon="playerIcons/loop.svg" />
          </div>
          <div className="flex justify-center">
            Progress Bar
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ClickableIcon icon="playerIcons/volumeUp.svg" />
          <ClickableIcon icon="playerIcons/audioDevice.svg" />
          <ClickableIcon icon="playerIcons/queue.svg" />
        </div>
      </div>
    </div>
  );
}
;
export default Bottombar;