import { Order } from "../src/order";
import { Movie } from "../src/movie";
import { MovieScreening } from "../src/movieScreening";
import { MovieTicket } from "../src/movieTicket";
import { CustomerType } from "../src/enumTypes";

describe("Order class testing public methods", () => {
  it("getOrderNr should return order nr", () => {
    const order = new Order(1, CustomerType.STUDENT);
    expect(order.getOrderNr()).toBe(1);
  });
});

describe("Order class testing calculate price method", () => {
  it("A student can book a premium ticket and should get a +2 fee", () => {
    const order = new Order(1, CustomerType.STUDENT);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(4);
  });

  it("A student can book two premium tickets and should get second ticket free (including the +2 fee)", () => {
    const order = new Order(1, CustomerType.STUDENT);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    let ticket1 = new MovieTicket(movieScreening, true, 2, 16);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket1);
    expect(order.calculatePrice()).toBe(4);
  });

  it("A student can book a regular ticket and should not get a fee", () => {
    const order = new Order(1, CustomerType.STUDENT);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, false, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(2);
  });

  it("A student can book 2 regular tickets on weekend day and should get a ticket free", () => {
    const order = new Order(1, CustomerType.STUDENT);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/5/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, false, 2, 15);
    let ticket1 = new MovieTicket(movieScreening, false, 2, 16);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket1);
    expect(order.calculatePrice()).toBe(2);
  });

  it("A customer can buy a premium ticket and should get a +3 fee", () => {
    const order = new Order(1, CustomerType.REGULAR);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(5);
  });

  it("A customer can buy a regular ticket and should not get a fee", () => {
    const order = new Order(1, CustomerType.REGULAR);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, false, 2, 15);
    order.addSeatReservation(ticket);
    expect(order.calculatePrice()).toBe(2);
  });

  it("A student can buy 6 tickets and should get each second ticket free including additional fees", () => {
    const order = new Order(1, CustomerType.STUDENT);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    let ticket2 = new MovieTicket(movieScreening, false, 2, 17);
    let ticket3 = new MovieTicket(movieScreening, false, 2, 19);
    let ticket4 = new MovieTicket(movieScreening, true, 2, 19);
    let ticket5 = new MovieTicket(movieScreening, false, 2, 19);
    let ticket6 = new MovieTicket(movieScreening, false, 2, 19);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket2);
    order.addSeatReservation(ticket3);
    order.addSeatReservation(ticket4);
    order.addSeatReservation(ticket5);
    order.addSeatReservation(ticket6);
    expect(order.calculatePrice()).toBe(8);
  });


  it("A customer can buy 6 tickets and should get a 10% discount in the weekend", () => {
    const order = new Order(1, CustomerType.REGULAR);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/4/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    let ticket2 = new MovieTicket(movieScreening, false, 2, 17);
    let ticket3 = new MovieTicket(movieScreening, false, 2, 19);
    let ticket4 = new MovieTicket(movieScreening, true, 2, 19);
    let ticket5 = new MovieTicket(movieScreening, false, 2, 19);
    let ticket6 = new MovieTicket(movieScreening, false, 2, 19);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket2);
    order.addSeatReservation(ticket3);
    order.addSeatReservation(ticket4);
    order.addSeatReservation(ticket5);
    order.addSeatReservation(ticket6);
    expect(order.calculatePrice()).toBe(16.2);
  });

  it("A customer can buy 6 tickets and in the regular day and doesn't get a discount", () => {
    const order = new Order(1, CustomerType.REGULAR);
    let movie = new Movie("Leuke film");
    let movieScreening = new MovieScreening(
      new Date("2/6/2023 12:00"),
      2,
      movie
    );
    movie.addScreening(movieScreening);
    let ticket = new MovieTicket(movieScreening, true, 2, 15);
    let ticket2 = new MovieTicket(movieScreening, false, 2, 17);
    let ticket3 = new MovieTicket(movieScreening, false, 2, 19);
    let ticket4 = new MovieTicket(movieScreening, true, 2, 19);
    let ticket5 = new MovieTicket(movieScreening, false, 2, 19);
    let ticket6 = new MovieTicket(movieScreening, false, 2, 19);
    order.addSeatReservation(ticket);
    order.addSeatReservation(ticket2);
    order.addSeatReservation(ticket3);
    order.addSeatReservation(ticket4);
    order.addSeatReservation(ticket5);
    order.addSeatReservation(ticket6);
    expect(order.calculatePrice()).toBe(9);
  });
});
