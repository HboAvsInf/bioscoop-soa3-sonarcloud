import { MovieTicket } from "../movieTicket";

export interface IPremiumPriceBehaviour {
  getPremiumPrice(ticketPrice: number, isPremium: boolean): number;

  getGroupDiscount(tickets : Array<MovieTicket>, isWeekend: boolean): boolean;

  isSecondTicketFree(isWeekend: boolean) : boolean;
}