import { MovieScreening } from "./movieScreening";

export class MovieTicket {
  private rowNr: number;
  private seatNr: number;
  private movieScreening: MovieScreening;
  private isPremiumReservation: boolean;

  public constructor(
    movieScreening: MovieScreening,
    isPremiumReservation: boolean,
    rowNr: number,
    seatNr: number
  ) {
    this.rowNr = rowNr;
    this.seatNr = seatNr;
    this.movieScreening = movieScreening;
    this.isPremiumReservation = isPremiumReservation;
  }

  public isPremiumTicket(): boolean {
    return this.isPremiumReservation;
  }

  public getPrice(): number {
    return this.movieScreening.getPricePerSeat();
  }

  public getMovieScreening(): MovieScreening {
    return this.movieScreening;
  }

  public toString(): string {
    return `\n\t- Ticket with row: ${this.rowNr} and ${
      this.isPremiumReservation ? "premium " : ""
    }seat: ${
      this.seatNr
    } and with movie screening:\n\t\t ${this.movieScreening.tostring()}`;
  }
}
