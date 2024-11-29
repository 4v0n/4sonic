export interface SubsonicSong {
  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  track: number;
  year: number;
  genre: string;
  coverArt: string;
  size: number;
  contentType: string;
  suffix: string;
  duration: number;
  bitRate: number;
  path: string;
  discNumber: number;
  created: number;
  albumId: string;
  artistId: string;
  type: string;
  isVideo: boolean;
  bpm: number;
  comment: string;
  sortName: string;
  mediaType: string;
  musicBrainzId: string;
  samplingRate: number;
  channelCount: number;
  [key: string]: unknown;
}

export interface SubsonicAlbum {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt: string;
  songCount: number;
  duration: number;
  playCount: number;
  created: string;
  year: number;
  genre: string;
  played: string;
  userRating: number;
  musicBrainzId: string;
  isCompilation: boolean;
  sortName: string;
  song: SubsonicSong[];
  [key: string]: unknown;
}

export interface SubsonicArtist {
  id: string;
  name: string;
  coverArt: string;
  albumCount: number;
  starred: string;
  userRating: number;
  artistImageUrl: string;
  album: SubsonicAlbum[];
  [key: string]: unknown;
}