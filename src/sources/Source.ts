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

  private _authedURI: string;

  public constructor(json: SourceCredentials) {
    super();

    this._authedURI = `${json.uri}?u=${json.username}&t=${json.token}&s=${json.salt}&c=4Sonic&f=json`;

    this._name = json.name;
    this._uri = json.uri;
    this._username = json.username;
    this._token = json.token;
    this._salt = json.salt;
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