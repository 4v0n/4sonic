class songPlayer extends EventTarget {
  private static instance: songPlayer;

  private tempFile = "temp.flac";
  private audio: HTMLAudioElement | null = null;
  private volume: number;

  private constructor() {
    super();

    this.volume = 1.0;

    this.audio = new Audio(this.tempFile);
  }

  public static getInstance(): songPlayer {
    if (!songPlayer.instance) {
      songPlayer.instance = new songPlayer();
    }
    return songPlayer.instance;
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

export default songPlayer;