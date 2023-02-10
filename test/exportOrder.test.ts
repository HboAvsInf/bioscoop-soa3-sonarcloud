import * as fs from "fs";
import { Order } from "../src/order";
import { Movie } from "../src/movie";
import { MovieScreening } from "../src/movieScreening";
import { MovieTicket } from "../src/movieTicket";
import { CustomerType } from "../src/enumTypes";
import { ExportToJSON } from "../src/ExportStrategy/exportToJSON";
import { ExportToText } from "../src/ExportStrategy/exportToText";

describe("OrderExport class tests", () => {
  beforeEach(() => {
    const order = new Order(1234, CustomerType.STUDENT);
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
    order.export(new ExportToJSON());
    order.export(new ExportToText());
  });

  it("Export order to JSON should make a JSON file", () => {
    let fileExists = fs.existsSync("./resources/json/order-1234.json");
    expect(fileExists).toBe(true);
  });

  it("Export order to text should make a .txt file", () => {
    let fileExists = fs.existsSync("./resources/text/order-1234.txt");
    expect(fileExists).toBe(true);
  });


  afterAll(() => {
        fs.unlink("./resources/json/order-1234.json", (err) => {
          if (err) throw err;
        });
        fs.unlink("./resources/text/order-1234.txt", (err) => {
          if (err) throw err;
      });
   } );
});
