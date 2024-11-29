import { SubsonicSong } from "./SubsonicTypes";

export default class Song {
  private details: SubsonicSong;

  constructor(res: SubsonicSong) {
    this.details = res;
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

  public get trackNumber() {
    return this.details.track;
  }
}