import { Source } from "../sources/Source";
import Album from "./Album";
import LibraryManager from "./LibraryManager";
import { SubsonicSong } from "./SubsonicTypes";

export default class Song {
  private details: SubsonicSong;
  private source: Source;

  constructor(res: SubsonicSong, relevantSource: Source) {
    this.details = res;
    this.source = relevantSource;
  }

  public get id() {
    return this.details.id;
  }

  public get artist() {
    return this.details.artist;
  }

  public get title() {
    return this.details.title;
  }

  public get album(): Album | undefined {
    const libraryManager = LibraryManager.getInstance();
    const album = libraryManager.albums.get(this.details.albumId);
    return album;
  }

  public get stream() {
    return `${this.source.uri}/stream${this.source.authParams}&id=${this.id}`;
  }

  public get cover() {
    return `${this.source.uri}/getCoverArt${this.source.authParams}&id=${this.id}`;
  }

  public get trackNumber() {
    return this.details.track;
  }
}