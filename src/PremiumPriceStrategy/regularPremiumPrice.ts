import { MovieTicket } from "../movieTicket";
import { IPremiumPriceBehaviour } from "./IPremiumPriceBehaviour";

export class RegularPremiumPrice implements IPremiumPriceBehaviour {
  public RegularPremiumPrice() {}

  getGroupDiscount(tickets: MovieTicket[], isWeekend: boolean): boolean {
    let amountOfTickets = tickets.length;
    return amountOfTickets >= 6 ? isWeekend : false;
  }

  getPremiumPrice(ticketPrice: number, isPremium: boolean): number {
    return isPremium ? ticketPrice + 3 : ticketPrice;
  }

  isSecondTicketFree(isWeekend: boolean): boolean {
    return !isWeekend;
  }
}
