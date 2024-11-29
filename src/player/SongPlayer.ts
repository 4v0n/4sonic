import Song from "./Song";

export default class SongPlayer extends EventTarget {
  private static instance: SongPlayer;

  private audio: HTMLAudioElement;
  private volume: number;

  private currentTrack: Song;

  private constructor() {
    super();

    this.volume = 1.0;

    this.audio = new Audio();
  }

  public static getInstance(): SongPlayer {
    if (!SongPlayer.instance) {
      SongPlayer.instance = new SongPlayer();
    }
    return SongPlayer.instance;
  }

  public setTrack(stream: string): void {
    this.pause();

    this.audio = new Audio(stream);
  }

  public setSubsonicTrack(song: Song): void {
    this.currentTrack = song;

    this.setTrack(song.stream);

    this.dispatchEvent(new CustomEvent("newSubsonicTrack", { detail: this.currentTrack }));
  }

  public play(): void {
    if (this.audio) {
      this.audio.play();
    }

    this.dispatchEvent(new CustomEvent("playbackStarted"));
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }

    this.dispatchEvent(new CustomEvent("playbackStopped"));
  }

  public setVolume(volume: number): void {
    this.volume = volume;
    if (this.audio) {
      this.audio.volume = volume;
    }
  }
}