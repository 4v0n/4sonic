import { Source, SourceCredentials } from "./Source";

export default class SourceManager extends EventTarget {
  private static instance: SourceManager;

  private sources: Map<string, Source>;

  private constructor() {
    super();
    this.sources = new Map();
  }

  public static getInstance() {
    if (!SourceManager.instance) {
      SourceManager.instance = new SourceManager();
    }

    return SourceManager.instance;
  }

  public loadSavedSources() {
    const sourceString = localStorage.getItem("servers");

    if (!sourceString) {
      return;
    }

    const savedServers: SourceCredentials[] = JSON.parse(sourceString);

    savedServers.forEach((server: SourceCredentials) => {
      const source = new Source(server);
      this.sources.set(source.name, source);
    });

    this.dispatchEvent(new CustomEvent("sourcesUpdated", { detail: this.sources }));
  }

  public writeSources() {
    const servers: SourceCredentials[] = [];

    this.sources.forEach((source: Source) => {
      servers.push({
        name: source.name,
        uri: source.uri,
        username: source.username,
        token: source.token,
        salt: source.salt,
      });
    });

    localStorage.setItem("servers", JSON.stringify(servers));
  }

  public hasSource(source: Source): boolean {
    for (const existingSource of this.sources.values()) {
      if ((source.name === existingSource.name) || (source.uri === existingSource.uri)) {
        return true;
      }
    }
    return false;
  }

  public addSource(source: Source) {
    this.sources.set(source.name, source);
    this.dispatchEvent(new CustomEvent("sourcesUpdated", { detail: this.sources }));
  }

  public addSourceFromCredentials(sourceCredentials: SourceCredentials) {
    const source = new Source(sourceCredentials);
    this.sources.set(source.name, source);
    this.dispatchEvent(new CustomEvent("sourcesUpdated", { detail: this.sources }));
  }

  public resetSources() {
    this.sources.clear();
    this.dispatchEvent(new CustomEvent("sourcesUpdated", { detail: this.sources }));
  }

  public deleteSource(source: Source) {
    this.sources.delete(source.name);
    this.dispatchEvent(new CustomEvent("sourcesUpdated", { detail: this.sources }));
  }

  public getSources(): Map<string, Source> {
    return this.sources;
  }
}