import Album from "./Album";
import Song from "./Song";
import { SubsonicArtist } from "./SubsonicTypes";

export default class Artist {

  private details: SubsonicArtist;

  private _albums: string[];
  private _songs: string[];

  constructor(artistDetails: SubsonicArtist) {
    this.details = artistDetails;
    this._albums = [];
    this._songs = [];
  }

  public addAlbum(album: Album) {
    this._albums.push(album.id);
  }

  public addSong(song: Song) {
    this._songs.push(song.id);
  }

  public get id() {
    return this.details.id;
  }

  public get name() {
    return this.details.name;
  }

  public get artistImageUrl() {
    return this.details.artistImageUrl;
  }

  public get rating() {
    return this.details.userRating;
  }
}