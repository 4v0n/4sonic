import Album from "./Album";
import Artist from "./Artist";
import Song from "./Song";

export default class LibraryManager extends EventTarget {
  private static instance: LibraryManager;

  private _artists: Artist[];
  private _albums: Album[];
  private _songs: Song[];

  constructor() {
    super();
    this._artists = [];
  }

  public static getInstance() {
    if (!LibraryManager.instance) {
      LibraryManager.instance = new LibraryManager();
    }
    return LibraryManager.instance;
  }

  public addArtist(artist: Artist) {
    this._artists.push(artist);
  }

  public addArtists(artists: Artist[]) {
    for (const artist of artists) {
      this._artists.push(artist);
    }
  }
}