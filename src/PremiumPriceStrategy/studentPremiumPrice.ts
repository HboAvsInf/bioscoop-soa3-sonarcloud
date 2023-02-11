import { MovieTicket } from "../movieTicket";
import { IPremiumPriceBehaviour } from "./IPremiumPriceBehaviour";

export class StudentPremiumPrice implements IPremiumPriceBehaviour {

  getGroupDiscount(tickets: MovieTicket[], isWeekend: boolean): boolean {
    return false;
  }

  getPremiumPrice(ticketPrice: number, isPremium: boolean): number {
    return isPremium ? ticketPrice + 2 : ticketPrice;
  }

  isSecondTicketFree(isWeekend: boolean): boolean {
    return true;
  }
}
