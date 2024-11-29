import { SubsonicArtist } from "./SubsonicTypes";

export default class Artist {

  private _id: string;
  private _name: string;
  private _artistImageUrl: string;
  private _rating: number;

  private _albums: string[];
  private _songs: string[];

  constructor(artistDetails: SubsonicArtist) {
    this._id = artistDetails.id;
    this._name = artistDetails.name;
    this._artistImageUrl = artistDetails.artistImageUrl;
    this._rating = artistDetails.userRating;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get artistImageUrl() {
    return this._artistImageUrl;
  }

  public get rating() {
    return this._rating;
  }
}