import { Component } from "react";
import Button from "./Button";
import Song from "../../player/Song";

interface playerState {
  songCover: string;
  songArtist: string;
  songTitle: string;
  songAlbum: string;
  isPlaying: boolean;
}

export default class Player extends Component<unknown, playerState> {

  private static instance: Player | null = null;

  private audio: HTMLAudioElement | null;

  constructor() {
    super({});

    if (Player.instance) {
      return Player.instance;
    }

    Player.instance = this;
    this.state = {
      songCover: "noImage.svg",
      songArtist: "Artist",
      songTitle: "Title",
      songAlbum: "Album",
      isPlaying: false,
    };
  }

  public static getInstance() {
    return Player.instance;
  }

  public setSong(song: Song) {
    this.setState({
      songCover: song.cover,
      songArtist: song.artist,
      songTitle: song.title,
      songAlbum: song.albumName,
      isPlaying: false,
    });
    this.audio = new Audio(song.stream);
  }

  public play() {
    this.audio?.play();
    this.setState({ isPlaying: true });
  }

  public previous() {
    // todo
  }

  public pause() {
    this.audio?.pause();
    this.setState({ isPlaying: false });
  }

  public next() {
    // todo
  }

  render() {
    return (
      <div className="w-full h-20 fixed bottom-0 left-0 bottomBar bg-background-light dark:bg-background-dark">
        <hr className="bottomBar" />
        <div className="flex justify-between items-center h-full px-2">
          <div className="flex space-x-2">
            <img src={this.state.songCover} className="object-contain h-16 w-16" />
            <div>
              <h1 className="font-bold">
                {this.state.songArtist} - {this.state.songTitle}
              </h1>
              <h2>
                {this.state.songAlbum}
              </h2>
            </div>
          </div>
          <div>
            <div className="flex justify-center space-x-2">
              <Button icon="playerIcons/shuffleOff.svg" />
              <Button icon="playerIcons/previous.svg" onClick={this.previous}/>
              {!this.state.isPlaying && <Button icon="playerIcons/play.svg" onClick={this.play} />}
              {this.state.isPlaying && <Button icon="playerIcons/pause.svg" onClick={this.pause} />}
              <Button icon="playerIcons/next.svg" onClick={this.next} />
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
            >
              <Button icon="playerIcons/volumeUp.svg" />
            </div>

            {/* <ClickableIcon icon="playerIcons/audioDevice.svg" /> */}
            <Button icon="playerIcons/queue.svg" />
          </div>
        </div>
      </div>
    );
  }
}