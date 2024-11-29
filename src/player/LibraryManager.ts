import Album from "./Album";
import Artist from "./Artist";
import Song from "./Song";

export default class LibraryManager extends EventTarget {
  private static instance: LibraryManager;

  private _artists: Map<string, Artist>;
  private _albums: Map<string, Album>;
  private _songs: Map<string, Song>;

  constructor() {
    super();
    this._artists = new Map();
    this._albums = new Map();
    this._songs = new Map();
  }

  public static getInstance() {
    if (!LibraryManager.instance) {
      LibraryManager.instance = new LibraryManager();
    }
    return LibraryManager.instance;
  }

  public addArtist(artist: Artist) {
    this._artists.set(artist.id, artist);
    this.dispatchEvent(new CustomEvent("artistAdded", { detail: this._artists }));
  }

  public addArtists(artists: Artist[]) {
    for (const artist of artists) {
      this.addArtist(artist);
    }
  }

  public addAlbum(album: Album) {
    this._albums.set(album.id, album);
    this.dispatchEvent(new CustomEvent("albumAdded", { detail: this._albums }));
  }

  public addAlbums(albums: Album[]) {
    for (const album of albums) {
      this.addAlbum(album);
    }
  }

  public addSong(songs: Song) {
    this._songs.set(songs.id, songs);
    this.dispatchEvent(new CustomEvent("songAdded", { detail: this._songs }));
  }

  public addSongs(songs: Song[]) {
    for (const song of songs) {
      this.addSong(song);
    }
  }

  public get artists() {
    return this._artists;
  }

  public get albums() {
    return this._albums;
  }

  public get songs() {
    return this._songs;
  }
}