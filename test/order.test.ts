import { Order } from "../src/order";
import { Movie } from "../src/movie";
import { MovieScreening } from "../src/movieScreening";
import { MovieTicket } from "../src/movieTicket";
import { TicketExportFormat } from "../src/ticketExportFormat";

describe("Order class testing public methods", () => {
  it("getOrderNr should return order nr", () => {
    const order = new Order(1, true);
    expect(order.getOrderNr()).toBe(1);
  });
});

describe("Order class testing calculate price method", () => {
  it("A student can book a premium ticket and should get a +2 fee", () => {
    const order = new Order(1, true);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, true, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(4);
  });

  it("A student can book two premium tickets and should get second ticket free (including the +2 fee)", () => {
    const order = new Order(1, true);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, true, 2, 15);
    var ticket1 = new MovieTicket(movieScreening, true, 2, 16);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket1);
    expect(order.calculatePrice()).toBe(4);
  });

  it("A student can book a regular ticket and should not get a fee", () => {
    const order = new Order(1, true);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, false, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(2);
  });

  it("A student can book a 2 regular ticket on weekend day and should not get a ticket free", () => {
    const order = new Order(1, false);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/5/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, false, 2, 15);
    var ticket1 = new MovieTicket(movieScreening, false, 2, 15);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket1);
    expect(order.calculatePrice()).toBe(4);
  });

  it("A customer can buy a premium ticket and should get a +3 fee", () => {
    const order = new Order(1, false);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, true, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(5);
  });

  it("A customer can buy a regular ticket and should not get a fee", () => {
    const order = new Order(1, false);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, false, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(2);
  });

  it("A student can buy 6 tickets and should get each second ticket free including additional fees", () => {
    const order = new Order(1, true);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, true, 2, 15);
    var ticket2 = new MovieTicket(movieScreening, false, 2, 17);
    var ticket3 = new MovieTicket(movieScreening, false, 2, 19);
    var ticket4 = new MovieTicket(movieScreening, true, 2, 19);
    var ticket5 = new MovieTicket(movieScreening, false, 2, 19);
    var ticket6 = new MovieTicket(movieScreening, false, 2, 19);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket2);
    order.addSeatReservation(ticket3);
    order.addSeatReservation(ticket4);
    order.addSeatReservation(ticket5);
    order.addSeatReservation(ticket6);
    expect(order.calculatePrice()).toBe(8);
  });


  it("A customer can buy 6 tickets and should get a 10% discount in the weekend", () => {
    const order = new Order(1, false);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, true, 2, 15);
    var ticket2 = new MovieTicket(movieScreening, false, 2, 17);
    var ticket3 = new MovieTicket(movieScreening, false, 2, 19);
    var ticket4 = new MovieTicket(movieScreening, true, 2, 19);
    var ticket5 = new MovieTicket(movieScreening, false, 2, 19);
    var ticket6 = new MovieTicket(movieScreening, false, 2, 19);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket2);
    order.addSeatReservation(ticket3);
    order.addSeatReservation(ticket4);
    order.addSeatReservation(ticket5);
    order.addSeatReservation(ticket6);
    expect(order.calculatePrice()).toBe(16.2);
  });

  it("A customer can buy 6 tickets and in the regular day and doesn't get a discount", () => {
    const order = new Order(1, false);
    var movie = new Movie("Leuke film");
    var movieScreening = new MovieScreening(
      new Date("2/6/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    var ticket = new MovieTicket(movieScreening, true, 2, 15);
    var ticket2 = new MovieTicket(movieScreening, false, 2, 17);
    var ticket3 = new MovieTicket(movieScreening, false, 2, 19);
    var ticket4 = new MovieTicket(movieScreening, true, 2, 19);
    var ticket5 = new MovieTicket(movieScreening, false, 2, 19);
    var ticket6 = new MovieTicket(movieScreening, false, 2, 19);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket2);
    order.addSeatReservation(ticket3);
    order.addSeatReservation(ticket4);
    order.addSeatReservation(ticket5);
    order.addSeatReservation(ticket6);
    expect(order.calculatePrice()).toBe(9);
  });
});
