import { SubsonicSong } from "./SubsonicTypes";

export default class Song {
  private _title: string;
  private _album: string;
  private _artist: string;
  private _trackNum: string;
  private _year: string;
  private _genre: string;
  private _albumArtist: string;
  private _coverString: string;
  private _resourceUrl: string;

  private _format: string;

  private _id: string;
  private _albumId: string;
  private _artistId: string;

  constructor(res: SubsonicSong) {
    this._title = res.title;
  }

  public get title() {
    return this._title;
  }
}