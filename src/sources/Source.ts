import Album from "../player/Album";
import Artist from "../player/Artist";
import LibraryManager from "../player/LibraryManager";
import Song from "../player/Song";

export interface SourceCredentials {
  name: string;
  uri: string;
  username: string;
  token: string;
  salt: string;
}

export class Source extends EventTarget {
  private _name: string;
  private _uri: string;
  private _username: string;
  private _token: string;
  private _salt: string;

  private authParams: string;

  public constructor(json: SourceCredentials) {
    super();

    this.authParams = `?u=${json.username}&t=${json.token}&s=${json.salt}&c=4Sonic&v=1.16.1&f=json`;

    this._name = json.name;
    this._uri = json.uri;
    this._username = json.username;
    this._token = json.token;
    this._salt = json.salt;

    this.retrieveLibrary();
  }

  public async retrieveLibrary(): Promise<void> {
    const lm = LibraryManager.getInstance();

    const foundArtists = await this.getIndexes();

    const foundAlbums = await this.getAlbumsFromArtists(foundArtists);

    const foundSongs = await this.getSongsFromAlbums(foundAlbums);

    this.addSongsToArtists(foundSongs, foundArtists);

    lm.addArtists(foundArtists);
    lm.addAlbums(foundAlbums);
    lm.addSongs(foundSongs);

    console.log(lm);
  }

  private addSongsToArtists(songs: Song[], artistArray: Artist[]) {
    const artists = artistArray.reduce((acc, obj) => {
      acc.set(obj.name, obj);
      return acc;
    }, new Map());

    for (const song of songs) {
      const artist: Artist = artists.get(song.artist);

      if (artist) {
        artist.addSong(song);
      }
    }
  }

  private async getSongsFromAlbums(albums: Album[]): Promise<Song[]> {
    const songSet: Song[] = [];

    for (const album of albums) {
      try {
        const res = await fetch(this.uri + "/getAlbum" + this.authParams + `&id=${album.id}`);
        if (res.ok) {
          const resjson = await res.json();
          const songs = resjson["subsonic-response"]["album"]["song"];

          for (const songDetail of songs) {
            const song = new Song(songDetail);
            songSet.push(song);

            album.addSong(song);
          }
        }
      }
      catch (err) {
        console.error(err);
      }
    }

    return songSet;
  }

  private async getAlbumsFromArtists(artists: Artist[]): Promise<Album[]> {
    const albumSet: Album[] = [];

    for (const artist of artists) {
      try {
        const res = await fetch(this.uri + "/getArtist" + this.authParams + `&id=${artist.id}`);
        if (res.ok) {
          const resjson = await res.json();
          const albums = resjson["subsonic-response"]["artist"]["album"];

          for (const albumDetail of albums) {
            const album = new Album(albumDetail);
            albumSet.push(album);

            artist.addAlbum(album);
          }
        }
      }
      catch (err) {
        console.error(err);
      }
    }

    return albumSet;
  }

  private async getIndexes(): Promise<Artist[]> {
    const artistSet: Artist[] = [];

    try {
      const res = await fetch(this._uri + "/getIndexes" + this.authParams);
      if (res.ok) {
        const resjson = await res.json();
        const letters = resjson["subsonic-response"]["indexes"]["index"];

        for (const letter of letters) {
          for (const artistDetail of letter["artist"]) {
            const artist = new Artist(artistDetail);
            artistSet.push(artist);
          }
        }
      }
    }
    catch (err) {
      console.error(err);
    }

    return artistSet;
  }

  public get name() {
    return this._name;
  }

  public get uri() {
    return this._uri;
  }

  public get username() {
    return this._username;
  }

  public get token() {
    return this._token;
  }

  public get salt() {
    return this._salt;
  }
}