export default class SongPlayer extends EventTarget {
  private static instance: SongPlayer;

  private tempFile = "temp.flac";
  private audio: HTMLAudioElement | null = null;
  private volume: number;

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
    this.audio?.pause();

    this.audio = new Audio(stream);
  }

  public play(): void {
    this.audio?.play();
  }

  public pause(): void {
    this.audio?.pause();
  }

  public setVolume(volume: number): void {
    this.volume = volume;
    if (this.audio) {
      this.audio.volume = volume;
    }
  }
}