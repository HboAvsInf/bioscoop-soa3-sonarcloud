import { Movie } from "./movie";

export class MovieScreening {
  private dateAndTime: Date;
  private pricePerSeat: number;
  private isWeekend: boolean;

  public constructor(dateAndTime: Date, pricePerSeat: number, movie: Movie) {
    this.dateAndTime = dateAndTime;
    this.pricePerSeat = pricePerSeat;
  }

  public getPricePerSeat(): number {
    return this.pricePerSeat;
  }

  public getDateAndTime(): Date {
    return this.dateAndTime;
  }

  public tostring(): string {
    return `Date and time: ${this.dateAndTime.toLocaleString()} and with price per seat ${
      this.pricePerSeat
    }`;
  }
}
