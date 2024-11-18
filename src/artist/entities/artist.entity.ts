import { v4 as uuidv4 } from 'uuid';

export class Artist {
  readonly #id: string;
  #name: string;
  #hasWonGrammy: boolean;
  constructor(name: string, hasWonGrammy: boolean) {
    this.#id = uuidv4();
    this.#name = name;
    this.#hasWonGrammy = hasWonGrammy;
  }

  getId(): string {
    return this.#id;
  }

  update(name?: string, hasWonGrammy?: boolean) {
    if (name) {
      this.#name = name;
    }
    if (hasWonGrammy !== undefined) {
      this.#hasWonGrammy = hasWonGrammy;
    }
    return this;
  }

  getArtistData(): ArtistDto {
    return {
      id: this.#id,
      name: this.#name,
      grammy: this.#hasWonGrammy,
    };
  }
}
