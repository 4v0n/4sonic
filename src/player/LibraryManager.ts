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
  }

  public addArtists(artists: Artist[]) {
    for (const artist of artists) {
      this._artists.set(artist.id, artist);
    }
  }

  public addAlbums(albums: Album[]) {
    for (const album of albums) {
      this._albums.set(album.id, album);
    }
  }

  public addSongs(songs: Song[]) {
    for (const song of songs) {
      this._songs.set(song.id, song);
    }
  }
}