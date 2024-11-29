import Song from "./Song";
import { SubsonicAlbum } from "./SubsonicTypes";

export default class Album {

  private _name: string;
  private _id: string;

  private _songs: string[];

  constructor(albumDetails: SubsonicAlbum) {
    this._name = albumDetails.name;
    this._id = albumDetails.id;
    this._songs = new Array(albumDetails.songCount);
  }

  public addSong(song: Song) {
    this._songs[song.trackNumber] = song.id;
  }

  public get songs() {
    return this._songs;
  }

  public get name() {
    return this._name;
  }

  public get id() {
    return this._id;
  }
}