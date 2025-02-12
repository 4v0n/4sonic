import { Source } from "../sources/Source";
import LibraryManager from "./LibraryManager";
import Song from "./Song";
import { SubsonicAlbum } from "./SubsonicTypes";

export default class Album {

  private _name: string;
  private _id: string;

  private _songs: string[];

  private _details: SubsonicAlbum;
  private _source: Source;

  constructor(albumDetails: SubsonicAlbum, relevantSource: Source) {
    this._name = albumDetails.name;
    this._id = albumDetails.id;
    this._songs = new Array(albumDetails.songCount);

    this._details = albumDetails;
    this._source = relevantSource;
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

  public get cover() {
    return `${this._source.uri}/getCoverArt${this._source.authParams}&id=${this.id}`;
  }

  public get year() {
    return this._details.year;
  }

  public get songCount() {
    return this._details.songCount;
  }

  public get duration() {
    return this._details.duration;
  }

  public get artist() {
    const lm = LibraryManager.getInstance();
    return lm.artists.get(this._details.artistId);
  }

  public getSongObjects() {
    const songs: Song[] = [];

    const lm = LibraryManager.getInstance();
    for (const songString of this.songs) {
      const song = lm.songs.get(songString);

      if (!song) {
        continue;
      }

      songs.push(song);
    }

    return songs;
  }
}