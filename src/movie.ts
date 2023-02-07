import { MovieScreening } from "./movieScreening";

export class Movie {
  private title: string;
  private movieScreenings: Array<MovieScreening> = new Array<MovieScreening>;

  constructor(title: string) {
    this.title = title;
  }

  public addScreening(screening: MovieScreening): void {
    this.movieScreenings.push(screening);
  }

  public toString(): string {
    return `The title of the film is ${this.title}`
  }
}
