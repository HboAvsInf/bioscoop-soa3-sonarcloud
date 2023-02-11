import { MovieTicket } from "./movieTicket";
import { IPremiumPriceBehaviour } from "./PremiumPriceStrategy/IPremiumPriceBehaviour";
import { CustomerType } from "./enumTypes";
import { RegularPremiumPrice } from "./PremiumPriceStrategy/regularPremiumPrice";
import { StudentPremiumPrice } from "./PremiumPriceStrategy/studentPremiumPrice";
import { IExportBehaviour } from "./ExportStrategy/IExportBehaviour";

export class Order {
  private orderNr: number;
  private seatReservations: Array<MovieTicket> = new Array<MovieTicket>();
  public PremiumPriceBehaviour: IPremiumPriceBehaviour;
  public CustomerType: CustomerType;
  
  public constructor(orderNr: number, customerType: CustomerType) {
    this.orderNr = orderNr;
    this.CustomerType = customerType;
    
    switch (customerType) {
      case CustomerType.STUDENT:
        this.PremiumPriceBehaviour = new StudentPremiumPrice();
        break;

      case CustomerType.REGULAR:
        this.PremiumPriceBehaviour = new RegularPremiumPrice();
        break;
    }
  }

  public getOrderNr(): number {
    return this.orderNr;
  }

  public addSeatReservation(ticket: MovieTicket): void {
    this.seatReservations.push(ticket);
  }

  public calculatePrice(): number {
    let totalPrice = 0.0;
    let isWeekend = this.isWeekend();
    let isSecondTicketFree = this.PremiumPriceBehaviour.isSecondTicketFree(isWeekend);

    for (let i = 0; i < this.seatReservations.length; i++) {
      let ticket = this.seatReservations[i];
      let ticketPrice = this.PremiumPriceBehaviour.getPremiumPrice(ticket.getPrice(), ticket.isPremiumTicket());
      if (isSecondTicketFree) {
        if (i % 2 == 0) {
          totalPrice += ticketPrice;
        }
      } else {
        totalPrice += ticketPrice;
      }
    }

    // get 10% discount if true
    if (this.PremiumPriceBehaviour.getGroupDiscount(this.seatReservations, isWeekend)) {
      totalPrice *= 0.9;
    }

    return totalPrice;
  }

  //check if weekend
  private isWeekend(): boolean {
    let weekendDays: Array<number> = [0, 5, 6]; //sunday, friday, saturday
    for (let ticket of this.seatReservations) {
      let weekdayOfScreening = ticket.getMovieScreening().getDateAndTime().getDay(); //number of weekday
      //if weekdayOfScreening is in weekendDays
      return weekendDays.includes(weekdayOfScreening) ? true : false;
    }
  }

  public export(exportBehaviour: IExportBehaviour): void {
    try {
      exportBehaviour.exportOrder(this);
    } catch (error) {
      throw new Error("Invalid data format");
    }
  }

  public toString(): string {
    return `The order number: ${this.orderNr}, this reservation is for: ${this.CustomerType} and the the seat reservations are: ${this.seatReservations}`;
  }
}
