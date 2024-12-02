import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';

export class Album {
  readonly #id: string;
  #name: string;
  #year: number;
  #artistId: string | null;
  #liked: boolean;

  constructor(name: string, year: number, artistid: string) {
    this.#id = uuidv4();
    this.#name = name;
    this.#year = year;
    this.#artistId = artistid;
    this.#liked = false;
  }

  getId() {
    return this.#id;
  }

  getArtistId() {
    return this.#artistId;
  }

  update({
    name,
    year,
    artistId,
  }: {
    name?: string;
    year?: number;
    artistId?: string;
  }) {
    if (name) {
      this.#name = name;
    }
    if (year) {
      this.#year = year;
    }
    if (artistId) {
      if (!isUUID(artistId)) {
        throw new Error('Not valid artistId');
      }
      this.#artistId = artistId;
    }
  }

  like() {
    this.#liked = true;
  }

  unlike() {
    this.#liked = false;
  }

  isLiked() {
    return this.#liked;
  }

  unlinkArtist() {
    this.#artistId = null;
  }

  getAlbumData(): AlbumDto {
    return {
      id: this.#id,
      name: this.#name,
      year: this.#year,
      artistId: this.#artistId,
    };
  }
}
