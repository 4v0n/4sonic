import { IAudioMetadata, parseBlob } from "music-metadata-browser";

class songPlayer extends EventTarget {
  private static instance: songPlayer;

  private tempFile = "temp.flac";
  private audio: HTMLAudioElement | null = null;
  private volume: number;
  public metadata: IAudioMetadata | null = null;

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

  private async loadMetadata(filePath: string): Promise<void> {
    try {
      const res = await fetch(filePath);
      const blob = await res.blob();
      this.metadata = await parseBlob(blob);
    }
    catch (error) {
      console.error("Error loading metadata:", error);
    }

    this.dispatchEvent(new Event("metadataUpdated"));
  }

  public play(): void {
    this.loadMetadata(this.tempFile);
    this.audio?.play();
  }

  public pause(): void {
    this.loadMetadata(this.tempFile);
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