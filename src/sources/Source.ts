// Toggle this flag to control one-artist/one-album loading
const DEBUG_MODE = true;

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

  private _authParams: string;

  public constructor(json: SourceCredentials) {
    super();

    this._authParams = `?u=${json.username}&t=${json.token}&s=${json.salt}&c=4Sonic&v=1.16.1&f=json`;

    this._name = json.name;
    this._uri = json.uri;
    this._username = json.username;
    this._token = json.token;
    this._salt = json.salt;

    this.retrieveLibrary();
  }

  public async retrieveLibrary(): Promise<void> {
    const lm = LibraryManager.getInstance();

    // Get all artists from the server
    let foundArtists = await this.getIndexes();

    // If in debug mode, keep only the first 3 artists
    if (DEBUG_MODE && foundArtists.length > 3) {
      foundArtists = foundArtists.slice(0, 3);
    }


    // Add the (possibly reduced) artist list to the library
    lm.addArtists(foundArtists);

    // Get albums from these artists
    const albumPromise = this.getAlbumsFromArtists(foundArtists).then((foundAlbums) => {
      lm.addAlbums(foundAlbums);

      // Fetch songs from the albums concurrently
      return this.getSongsFromAlbums(foundAlbums);
    });

    // Once albums are done and songs are fetched, add songs to the library
    albumPromise.then((foundSongs) => {
      this.addSongsToArtists(foundSongs, foundArtists);
      lm.addSongs(foundSongs);
    });
  }

  private addSongsToArtists(songs: Song[], artistArray: Artist[]) {
    const artists = artistArray.reduce((acc, obj) => {
      acc.set(obj.name, obj);
      return acc;
    }, new Map<string, Artist>());

    for (const song of songs) {
      const artist: Artist | undefined = artists.get(song.artist);
      if (artist) {
        artist.addSong(song);
      }
    }
  }

  private async getSongsFromAlbums(albums: Album[]): Promise<Song[]> {
    const songSet: Song[] = [];

    const fetchPromises = albums.map(async (album) => {
      try {
        const res = await fetch(this.uri + "/getAlbum" + this._authParams + `&id=${album.id}`);
        if (res.ok) {
          const resjson = await res.json();
          const songs = resjson["subsonic-response"]?.["album"]?.["song"];

          if (songs) {
            for (const songDetail of songs) {
              const song = new Song(songDetail, this);
              songSet.push(song);
              album.addSong(song);
            }
          }
        }
      }
      catch (err) {
        console.error(err);
      }
    });

    await Promise.all(fetchPromises);
    return songSet;
  }

  private async getAlbumsFromArtists(artists: Artist[]): Promise<Album[]> {
    const albumSet: Album[] = [];

    // In debug mode, fetch only the first artist's albums
    const artistSlice = DEBUG_MODE ? artists.slice(0, 3) : artists;

    const fetchPromises = artistSlice.map(async (artist) => {
      try {
        const res = await fetch(this.uri + "/getArtist" + this._authParams + `&id=${artist.id}`);
        if (res.ok) {
          const resjson = await res.json();
          const albums = resjson["subsonic-response"]?.["artist"]?.["album"];

          if (albums) {
            for (const albumDetail of albums) {
              const album = new Album(albumDetail, this);
              albumSet.push(album);
              artist.addAlbum(album);
            }
          }
        }
      }
      catch (err) {
        console.error(err);
      }
    });

    await Promise.all(fetchPromises);

    return albumSet;
  }

  private async getIndexes(): Promise<Artist[]> {
    const artistSet: Artist[] = [];

    try {
      const res = await fetch(this._uri + "/getIndexes" + this._authParams);
      if (res.ok) {
        const resjson = await res.json();
        const letters = resjson["subsonic-response"]?.["indexes"]?.["index"] || [];
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

  public get authParams() {
    return this._authParams;
  }
}
