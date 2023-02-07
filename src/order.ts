import { MovieTicket } from "./movieTicket";
import { TicketExportFormat } from "./ticketExportFormat";
import * as fs from "fs";

export class Order {
  private orderNr: number;
  private isStudentOrder: boolean;
  private seatReservations: Array<MovieTicket> = new Array<MovieTicket>();

  public constructor(orderNr: number, isStudentOrder: boolean) {
    this.orderNr = orderNr;
    this.isStudentOrder = isStudentOrder;
  }

  public getOrderNr(): number {
    return this.orderNr;
  }

  public addSeatReservation(ticket: MovieTicket): void {
    this.seatReservations.push(ticket);
  }

  public calculatePrice(): number {
    let totalPrice = 0.0;
    let premiumFee = this.isStudentOrder ? 2 : 3;
    let isSecondTicketFree = this.isSecondTicketFree();

    for (let i = 0; i < this.seatReservations.length; i++) {
      let ticket = this.seatReservations[i];
      let ticketPrice = ticket.isPremiumTicket()
        ? ticket.getPrice() + premiumFee
        : ticket.getPrice();
      if (isSecondTicketFree) {
        if (i % 2 == 0) {
          totalPrice += ticketPrice;
        }
      } else {
        totalPrice += ticketPrice;
      }
    }

    // get 10% discount if true
    if (this.isGroupDiscount()) {
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

  // get discount if group != isStudent && .length >=6
  private isGroupDiscount(): boolean {
    let amountOfTickets = this.seatReservations.length;
    return this.isStudentOrder == false && amountOfTickets >= 6
      ? this.isWeekend()
      : false;
  }

  //if student order
  private isSecondTicketFree(): boolean {
    return this.isStudentOrder ? this.isStudentOrder : !this.isWeekend();
  }

  public export(exportFormat: TicketExportFormat): void {
    if (exportFormat == TicketExportFormat.PLAINTEXT) {
      fs.writeFile(
        `resources/txt/order-${this.orderNr}.txt`,
        this.toString(),
        function (err) {
          if (err) {
            return console.error(err);
          }
          console.log("Order has been created!");
        }
      );
    } else if (exportFormat == TicketExportFormat.JSON) {
      const content = JSON.stringify(this, null, 2);
      fs.writeFile(
        `resources/json/order-${this.orderNr}.json`,
        content,
        (err) => {
          if (err) {
            return console.error(err);
          }
          console.log("Order has been created!");
        }
      );

      // sla op in een download
    } else {
      throw new Error("Invalid data format");
    }
  }

  public toString(): string {
    return `The order number: ${this.orderNr}, the order is from a student ${this.isStudentOrder}, the seat reservations are: ${this.seatReservations}`;
  }
}
