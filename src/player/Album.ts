import { SubsonicAlbum } from "./SubsonicTypes";

export default class Album {

  private _name: string;
  private _id: string;

  constructor(albumDetails: SubsonicAlbum) {
    this._name = albumDetails.name;
    this._id = albumDetails.id;
  }

  public get name() {
    return this._name;
  }

  public get id() {
    return this._id;
  }
}